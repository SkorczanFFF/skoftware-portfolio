import Link from 'next/link';
import React from 'react';

export default function ScrollButton() {
  return (
    <Link
      className='scroll-arrow'
      href='/#experience'
      scroll={false}
      aria-label='Scroll down to experience section'
    >
      <span />
      <span />
      <span />
    </Link>
  );
}
