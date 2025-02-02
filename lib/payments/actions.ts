'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession, createCustomerPortalSession } from './stripe';
import { withOrganization } from '@/lib/auth/middleware';

export const checkoutAction = withOrganization<FormData>(async (formData, organization) => {
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({ organization, priceId });
});

export const customerPortalAction = withOrganization(async (_, organization) => {
  const portalSession = await createCustomerPortalSession(organization);
  redirect(portalSession.url);
});
