import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { Team, Billing, billings, teams } from '@/lib/db/schema';
import { db } from '@/lib/db/drizzle';
import { eq, and } from 'drizzle-orm';
import {
  getUser,
} from '@/lib/db/queries';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

async function getActiveBilling(organizationId: number): Promise<Billing | null> {
  const billing = await db
    .select()
    .from(billings)
    .where(
      and(
        eq(billings.organizationId, organizationId),
        eq(billings.isActive, true)
      )
    )
    .limit(1);
  
  return billing[0] || null;
}

export async function createCheckoutSession({
  organization,
  priceId,
}: {
  organization: { id: number };
  priceId: string;
}) {
  const user = await getUser();

  if (!organization || !user) {
    redirect(`/sign-up?redirect=checkout&priceId=${priceId}`);
  }

  const activeBilling = await getActiveBilling(organization.id);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/pricing`,
    customer: activeBilling?.customerId || undefined,
    client_reference_id: user.id.toString(),
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
    },
  });

  redirect(session.url!);
}

export async function createCustomerPortalSession(organization: { id: number }) {
  const activeBilling = await getActiveBilling(organization.id);

  if (!activeBilling?.customerId || !activeBilling?.productId) {
    redirect('/pricing');
  }

  let configuration: Stripe.BillingPortal.Configuration;
  const configurations = await stripe.billingPortal.configurations.list();

  if (configurations.data.length > 0) {
    configuration = configurations.data[0];
  } else {
    const product = await stripe.products.retrieve(activeBilling.productId);
    if (!product.active) {
      throw new Error("Organization's product is not active in Stripe");
    }

    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
    });
    if (prices.data.length === 0) {
      throw new Error("No active prices found for the organization's product");
    }

    configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Manage your subscription',
      },
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price', 'quantity', 'promotion_code'],
          proration_behavior: 'create_prorations',
          products: [
            {
              product: product.id,
              prices: prices.data.map((price) => price.id),
            },
          ],
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
          cancellation_reason: {
            enabled: true,
            options: [
              'too_expensive',
              'missing_features',
              'switched_service',
              'unused',
              'other',
            ],
          },
        },
      },
    });
  }

  return stripe.billingPortal.sessions.create({
    customer: activeBilling.customerId,
    return_url: `${process.env.BASE_URL}/dashboard`,
    configuration: configuration.id,
  });
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  // Find active billing by customerId
  const billing = await db
    .select({
      id: billings.id,
      organizationId: billings.organizationId,
      teamId: teams.id,
    })
    .from(billings)
    .innerJoin(teams, eq(teams.organizationId, billings.organizationId))
    .where(
      and(
        eq(billings.customerId, customerId),
        eq(billings.isActive, true)
      )
    )
    .limit(1);

  if (!billing[0]) {
    console.error('Active billing not found for Stripe customer:', customerId);
    return;
  }

  if (status === 'active' || status === 'trialing') {
    const plan = subscription.items.data[0]?.price;
    const productId = plan?.product as string;

    // Update billing record
    await db
      .update(billings)
      .set({
        subscriptionId,
        productId,
        updatedAt: new Date(),
      })
      .where(eq(billings.id, billing[0].id));

    // Update team subscription status
    await db
      .update(teams)
      .set({
        planName: (plan?.product as Stripe.Product).name,
        subscriptionStatus: status,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, billing[0].teamId));

  } else if (status === 'canceled' || status === 'unpaid') {
    // Deactivate billing record
    await db
      .update(billings)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(billings.id, billing[0].id));

    // Update team subscription status
    await db
      .update(teams)
      .set({
        planName: null,
        subscriptionStatus: status,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, billing[0].teamId));
  }
}

export async function getStripePrices() {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    type: 'recurring',
  });

  return prices.data.map((price) => ({
    id: price.id,
    productId: typeof price.product === 'string' ? price.product : price.product.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    trialPeriodDays: price.recurring?.trial_period_days,
  }));
}

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  });

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId: typeof product.default_price === 'string'
      ? product.default_price
      : product.default_price?.id,
  }));
}
