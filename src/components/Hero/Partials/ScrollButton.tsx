import Link from 'next/link';
import React from 'react';

export default function ScrollButton() {
  return (
    <Link
      // Only in the side-by-side hero (lg + landscape, see HeroCopy): in the
      // split layout the CTAs sit at the bottom edge and it would crowd them.
      className='scroll-arrow hidden lg:landscape:block'
      href='/#services'
      scroll={false}
      aria-label='Przejdź do sekcji usług'
    >
      <span />
      <span />
      <span />
    </Link>
  );
}
