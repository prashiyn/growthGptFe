import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => 
{
  let locale = await requestLocale;
  return {
  
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
    now: new Date(),
    defaultTranslationValues: {
      LOCALE: locale
    }
  }
})