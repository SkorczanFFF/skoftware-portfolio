import Link from 'next/link';
import React from 'react';

import { sectionIdOf } from '@/components/layout/Header/sectionId';

interface DesktopProps {
  links: Array<{ href: string; label: string }>;
  activeSection: string;
}
export default function Desktop({
  links,
  activeSection,
}: DesktopProps): React.JSX.Element {
  return (
    <ul className='hidden h-full max-h-[40px] items-center justify-between space-x-10 px-6 lg:flex'>
      {links.map(({ href, label }) => {
        const isActive = sectionIdOf(href) === activeSection;
        return (
          <li key={`${href}${label}`}>
            <Link
              href={href}
              scroll={false}
              className={`relative text-sm uppercase tracking-widest duration-300 ${isActive ? 'text-real-white' : 'text-real-white/60'}`}
            >
              <span
                className='absolute right-[-1px] bottom-[-1px] text-primary-blue pointer-events-none'
                aria-hidden='true'
              >
                {label}
              </span>
              <span className='relative'>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
