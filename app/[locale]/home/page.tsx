import { Button } from "@/components/ui/button";
import { ArrowRight, CircleIcon, HandCoins, Rocket, Target, Twitter, Facebook, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { 
  TransparentCard, 
  TransparentCardHeader, 
  TransparentCardTitle, 
  TransparentCardDescription 
} from "@/components/ui/transparent-card";
import { TestimonyCard } from "@/components/ui/testimony-card";
import { TestimonyAccordion } from "@/components/ui/testimony-accordion";

function Footer() {
  const t = useTranslations("common");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info - First column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <CircleIcon className="h-6 w-6 text-orange-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                {t("brand")}
              </span>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-400 hover:text-gray-500"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-400 hover:text-gray-500"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-400 hover:text-gray-500"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Empty columns for spacing */}
          <div></div>
          <div></div>

          {/* Navigation Links - Last column, aligned right */}
          <div className="space-y-4 md:text-right">
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Company</h3>
            <div className="flex flex-col space-y-2 items-start md:items-end">
              <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                About Us
              </Link>
              <Link href="/blog" className="text-base text-gray-500 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/pricing" className="text-base text-gray-500 hover:text-gray-900">
                {t("pricing")}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            © {currentYear} {t("brand")}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl font-medium text-gray-900 tracking-tight sm:text-5xl md:text-6xl text-center">
                {t("title")}
              </h1>
              <p className="mt-16 text-2xl leading-8 text-gray-600 sm:mt-16 text-center font-thin">
                {t("description")}
              </p>
              <div className="mt-16 flex justify-center">
                <Button
                  size="2xl"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                >
                  {t("getStarted")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <TransparentCard key={index}>
                <TransparentCardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white mb-5">
                    {index === 1 ? (
                      <Rocket className="h-6 w-6" />
                    ) : index === 2 ? (
                      <Target className="h-6 w-6" />
                    ) : (
                      <HandCoins className="h-6 w-6" />
                    )}
                  </div>
                  <TransparentCardTitle>
                    {t(`benefits${index}.title`)}
                  </TransparentCardTitle>
                  <TransparentCardDescription>
                    {t(`benefits${index}.description`)}
                  </TransparentCardDescription>
                </TransparentCardHeader>
              </TransparentCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {t("ready.title")}
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                {t("ready.description")}
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a
                href="https://github.com/leerob/next-saas-starter"
                target="_blank"
              >
                <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                  {t("ready.button")}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* AI Agents Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center">{t("meetYourTeam.title")}</h2>
          <p className="mt-3 px-0 sm:px-32 text-lg text-center text-gray-500">{t("meetYourTeam.description")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: 'Content Agent', desc: 'AI-driven content creation' },
              { name: 'Ads Agent', desc: 'Automated ad campaign management' },
              { name: 'Media Buying Agent', desc: 'Smart ad purchasing optimization' },
              { name: 'Strategy Agent', desc: 'Marketing strategy planning' },
              { name: 'Research Agent', desc: 'Market & competitor analysis' },
              { name: 'Analytics Agent', desc: 'Performance tracking & insights' }
            ].map((agent, index) => (
              <TransparentCard key={index}>
                <TransparentCardHeader>
                  <TransparentCardTitle>{agent.name}</TransparentCardTitle>
                  <TransparentCardDescription>{agent.desc}</TransparentCardDescription>
                </TransparentCardHeader>
              </TransparentCard>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-gray-100 py-16 px-8">
        <h2 className="text-3xl font-semibold text-center">Why Choose GrowGPT?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          {[
            { title: 'Effortless Marketing', desc: 'AI-powered automation for social media and ads.' },
            { title: 'Smarter Targeting', desc: 'AI-driven insights to maximize reach and conversions.' },
            { title: 'Cost-Effective Growth', desc: 'Affordable AI-driven marketing without the need for agencies.' }
          ].map((benefit, index) => (
            <TransparentCard key={index}>
              <TransparentCardHeader>
                <TransparentCardTitle>{benefit.title}</TransparentCardTitle>
                <TransparentCardDescription>{benefit.desc}</TransparentCardDescription>
              </TransparentCardHeader>
            </TransparentCard>
          ))}
        </div>
      </section>

      {/* Testimonials & Trust Signals */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">{t("testimonials.title")}</h2>
          <TestimonyAccordion
            testimonials={[
              { 
                company: 'Company 1',
                name: 'John D.',
                role: 'Marketing Director',
                feedback: 'GrowGPT has revolutionized how we market our products! Its effortless and effective.',
                image: '/testimonials/john.jpg'
              },
              { 
                company: 'Company 2',
                name: 'Sarah M.', 
                feedback: 'An absolute game-changer! The AI agents save us so much time and improve results.' 
              },
              { 
                company: 'Company 3',
                name: 'Mike R.', 
                feedback: 'The AI-driven insights have transformed our marketing strategy completely.' 
              }
            ]}
          />
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-semibold">Start Growing Your Business Today</h2>
        <p className="mt-2">Sign up now and let AI take your marketing to the next level.</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200">Get Started for Free</button>
      </section>
      <Footer />
    </main>
  );
}
