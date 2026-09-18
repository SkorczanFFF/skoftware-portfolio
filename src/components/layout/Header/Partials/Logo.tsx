import Link from 'next/link';

import { useLocale } from '@/locale/LocaleContext';

export default function Logo() {
  const { t } = useLocale();
  return (
    <Link
      href='/'
      className='font-unica font-bold select-none relative'
      aria-label={t.backToHome}
    >
      <span className='text-2xl relative'>
        <span
          className='absolute right-[-1px] bottom-[-3px] text-white pointer-events-none'
          aria-hidden='true'
        >
          SKOFTware
        </span>
        <span className='relative'>
          <span className='text-orange'>SKO</span>
          <span className='text-raspberry'>FT</span>
          <span className='text-primary-blue'>ware</span>
        </span>
      </span>
    </Link>
  );
}
