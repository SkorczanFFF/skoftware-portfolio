import { useRouter } from 'next/router';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { en } from '@/locale/en';
import { pl } from '@/locale/pl';
import type { Dictionary, Locale } from '@/locale/types';

const dictionaries: Record<Locale, Dictionary> = { en, pl };

/** Must match `defaultLocale` in next.config.js. */
export const DEFAULT_LOCALE: Locale = 'pl';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: dictionaries[DEFAULT_LOCALE],
});

function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'pl';
}

/**
 * Reads the active locale from the router rather than from browser storage,
 * so the server renders the right language on the first byte. Switching a
 * locale is a navigation — the URL is the source of truth.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = isLocale(router?.locale) ? router.locale : DEFAULT_LOCALE;

  const setLocale = useCallback(
    (next: Locale) => {
      if (!router || next === locale) return;
      router.push(
        { pathname: router.pathname, query: router.query },
        router.asPath,
        { locale: next, scroll: false },
      );
    },
    [router, locale],
  );

  // `_document` sets `lang` on the server; client-side locale switches are
  // soft navigations that never re-render <html>, so keep it in sync here.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
