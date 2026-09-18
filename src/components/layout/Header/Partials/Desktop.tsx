import Link from 'next/link';
import React from 'react';
export interface LinkItem {
  href: string;
  label: string;
}

interface DesktopProps {
  links: LinkItem[];
  activeSection: string;
}
export default function Desktop({
  links,
  activeSection,
}: DesktopProps): React.JSX.Element {
  return (
    <>
      <ul className=' hidden h-full max-h-[40px] items-center justify-between space-x-10 px-6 lg:flex '>
        {links.map(({ href, label }) => {
          const linkId = href.startsWith('/#') ? href.slice(2) : href.slice(1);
          const isActive = linkId === activeSection;
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
    </>
  );
}
