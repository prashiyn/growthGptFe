import "../globals.css";
import * as React from "react";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { UserProvider } from "@/lib/auth";
import { getUser } from "@/lib/db/queries";
import { Providers } from "@/components/providers";
import { useMessages, useLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from '@/config/site';

const manrope = Manrope({ subsets: ["latin"] });

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params before using
  params = await params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ),
  };
}

export const viewport: Viewport = {
  maximumScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  let userPromise = getUser();
  const messages = useMessages();

  return (
    <html
      lang={locale}
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <UserProvider userPromise={userPromise}>
          <Providers messages={messages} locale={locale}>
            {children}
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
