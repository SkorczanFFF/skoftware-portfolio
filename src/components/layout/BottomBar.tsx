import Link from 'next/link';

import { CookieIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';

const CURRENT_YEAR = new Date().getFullYear();

export default function BottomBar() {
  const { t } = useLocale();

  return (
    <div className='gradient flex w-full items-center justify-between px-2 py-1 max-xsm:flex-col max-xsm:items-start max-xsm:gap-1'>
      <p className='text-[10px] uppercase tracking-widest text-white/70'>
        {t.footerCopyright.replace('{year}', String(CURRENT_YEAR))}
      </p>
      <Link
        href='/cookies'
        className='flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/70 transition-colors duration-200 hover:text-white max-xsm:self-end'
      >
        <CookieIcon className='text-xs' aria-hidden='true' />
        {t.cookiePolicyTitle}
      </Link>
    </div>
  );
}
