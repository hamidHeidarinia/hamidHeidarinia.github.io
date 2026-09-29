import { ui, defaultLocale, type Locale } from "./ui";

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in ui) return lang as Locale;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
    return (ui as any)[locale]?.[key] ?? (ui as any)[defaultLocale]?.[key] ?? key;
  };
}
