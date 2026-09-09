import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { CookieIcon, WrenchIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';

/* ── Cookie helpers ── */

const COOKIE_NAME = 'cookie_consent';
export const COOKIE_DAYS = 182;

type ConsentState = { necessary: true; analytics: boolean };

function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function setConsent(consent: ConsentState) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 86400000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))};expires=${expires};path=/;SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('cc:onChange'));
}

/** Check if analytics is allowed. */
export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics ?? false;
}

/** Open the consent modal from anywhere. */
let openModalFn: (() => void) | null = null;
export function showCookiePreferences() {
  openModalFn?.();
}

/* ── Component ── */

export default function CookieConsentBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Show on first visit (no consent cookie yet), or when triggered externally
  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      setVisible(true);
    } else {
      setAnalytics(consent.analytics);
    }
  }, []);

  // Register the external open function
  const open = useCallback(() => {
    const consent = getConsent();
    setAnalytics(consent?.analytics ?? false);
    setVisible(true);
  }, []);

  useEffect(() => {
    openModalFn = open;
    return () => {
      openModalFn = null;
    };
  }, [open]);

  const save = useCallback((analyticsValue: boolean) => {
    setConsent({ necessary: true, analytics: analyticsValue });
    setAnalytics(analyticsValue);
    setVisible(false);
  }, []);

  const acceptAll = useCallback(() => save(true), [save]);
  const rejectAll = useCallback(() => save(false), [save]);
  const savePreferences = useCallback(() => save(analytics), [save, analytics]);

  if (!visible) return null;

  return (
    <div className='fixed bottom-4 right-4 ml-4 z-9998 md:bottom-6 md:right-6'>
      <div className='rounded-[3px] p-[4px] backdrop-blur-[10px]'>
        <div className='font-grotesk relative w-full max-w-[520px] overflow-hidden rounded-[3px] border-2 border-raspberry/20 bg-primary-blue text-white'>
          {/* Cookie watermark */}
          <div
            className='pointer-events-none absolute -top-4 -right-4 h-[300px] w-[300px]'
            aria-hidden='true'
          >
            <CookieIcon className='h-full w-full text-deep-blue' />
          </div>

          {/* Content */}
          <div className='relative z-10 p-4'>
            {/* Header */}
            <div className='mb-3 flex items-center gap-3'>
              <CookieIcon className='shrink-0 text-2xl text-raspberry' aria-hidden='true' />
              <h2 className='text-lg font-semibold tracking-wide'>
                {t.cookieTitle}
              </h2>
            </div>

            {/* Description */}
            <p className='mb-5 text-sm leading-relaxed text-white/70'>
              {t.cookieDescription}{' '}
              <Link
                href='/cookies'
                className='text-orange underline transition-colors hover:text-orange-dark brightness-150'
                onClick={() => setVisible(false)}
              >
                {t.cookiePolicyTitle}
              </Link>
              .
            </p>

            {/* Settings dropdown */}
            <div className='mb-4'>
              <button
                type='button'
                onClick={() => setSettingsOpen((v) => !v)}
                className='flex w-full items-center justify-between rounded-[3px] border-2 border-raspberry/50 bg-primary-blue/60 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-raspberry/20 backdrop-blur-[3px]'
              >
                <span className='flex items-center gap-2'>
                  <WrenchIcon className='text-base text-raspberry' aria-hidden='true' />
                  {t.cookieSettings}
                </span>
                <span className={`text-xs transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${settingsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className='overflow-hidden'>
                  <div className='mt-2 space-y-2'>
                    {/* Necessary — always on */}
                    <div className='flex items-center justify-between rounded-[3px] bg-primary-blue/80 px-4 py-3 backdrop-blur-[3px]'>
                      <div>
                        <p className='text-sm font-medium'>
                          {t.cookieNecessaryTitle}
                        </p>
                        <p className='mt-0.5 text-xs text-white/50'>
                          {t.cookieNecessaryDescription}
                        </p>
                      </div>
                      <Toggle checked disabled aria-label={t.cookieNecessaryTitle} />
                    </div>

                    {/* Analytics — toggleable */}
                    <div className='flex items-center justify-between rounded-[3px] bg-primary-blue/80 px-4 py-3 backdrop-blur-[3px]'>
                      <div>
                        <p className='text-sm font-medium'>
                          {t.cookieAnalyticsTitle}
                        </p>
                        <p className='mt-0.5 text-xs text-white/50'>
                          {t.cookieAnalyticsDescription}
                        </p>
                      </div>
                      <Toggle
                        checked={analytics}
                        onChange={() => setAnalytics((v) => !v)}
                        aria-label={t.cookieAnalyticsTitle}
                      />
                    </div>

                    {/* Save preferences */}
                    <button
                      type='button'
                      onClick={savePreferences}
                      className='w-full rounded-[3px] border-2 border-raspberry/60 bg-transparent px-4 py-2 text-sm font-medium text-white uppercase transition-colors duration-200 hover:bg-raspberry/20 hover:text-white'
                    >
                      {t.cookieSavePreferences}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className='flex flex-wrap gap-2'>
              <button
                type='button'
                onClick={acceptAll}
                className='flex-1 rounded-[3px] bg-raspberry px-4 py-1 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-dark'
              >
                {t.cookieAcceptAll}
              </button>
              <button
                type='button'
                onClick={rejectAll}
                className='flex-1 rounded-[3px] border-2 border-raspberry bg-transparent px-4 py-1 text-sm font-medium text-white transition-colors duration-200 hover:bg-raspberry/20 backdrop-blur-[4px]'
              >
                {t.cookieRejectAll}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Toggle switch ── */

function Toggle({
  checked,
  disabled,
  onChange,
  'aria-label': ariaLabel,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
  'aria-label'?: string;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onChange}
      className={`relative ml-4 flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${checked
        ? disabled
          ? 'bg-orange opacity-80'
          : 'bg-raspberry cursor-pointer'
        : 'bg-primary-blue/50 cursor-pointer'
        } ${disabled ? 'cursor-default' : ''}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-xs transition-transform duration-200 ${checked ? 'translate-x-[22px]' : 'translate-x-1'
          }`}
      />
    </button>
  );
}
