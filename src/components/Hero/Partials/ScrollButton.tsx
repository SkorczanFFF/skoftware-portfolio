import Link from 'next/link';
import React from 'react';

import { useLocale } from '@/locale/LocaleContext';

export default function ScrollButton() {
  const { t } = useLocale();
  return (
    <Link
      // Only in the side-by-side hero (lg + landscape, see Hero): in the
      // split layout the CTAs sit at the bottom edge and it would crowd them.
      className='scroll-arrow hidden lg:landscape:block'
      href='/#services'
      scroll={false}
      aria-label={t.scrollToServices}
    >
      <span />
      <span />
      <span />
    </Link>
  );
}
