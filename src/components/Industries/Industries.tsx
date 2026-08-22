import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { DocumentIcon, LinkIcon, UsersIcon } from '@/lib/shared/Icons';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';
import type { IndustryEntry } from '@/locale/types';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

const industryIconMap: Record<string, IconType> = {
  Users: UsersIcon,
  Link: LinkIcon,
  Document: DocumentIcon,
};

// Full class strings — Tailwind scans source text, so these cannot be built
// by interpolation.
const ACCENTS = [
  {
    number: 'text-raspberry/20',
    icon: 'text-raspberry',
    rule: 'bg-raspberry',
    separator: 'text-raspberry/30',
  },
  {
    number: 'text-orange/20',
    icon: 'text-orange',
    rule: 'bg-orange',
    separator: 'text-orange/30',
  },
] as const;

function IndustryRow({
  industry,
  index,
}: {
  industry: IndustryEntry;
  index: number;
}) {
  const Icon = industryIconMap[industry.icon];
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <article className='industry-row group border-primary-blue/10 grid grid-cols-1 gap-x-8 gap-y-4 border-t py-9 last:border-b md:grid-cols-[100px_1fr] md:py-12'>
      <div className='flex items-center gap-4 md:flex-col md:items-start md:gap-4'>
        <span
          className={`font-unica text-5xl leading-none tracking-tighter md:text-6xl ${accent.number}`}
          aria-hidden='true'
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {Icon && (
          <Icon
            className={`text-3xl ${accent.icon} md:text-4xl`}
            aria-hidden='true'
          />
        )}
      </div>

      <div>
        <span
          className={`mb-4 block h-[2px] w-10 ${accent.rule} transition-all duration-300 group-hover:w-20`}
          aria-hidden='true'
        />

        <h3 className='font-unica text-primary-blue text-2xl uppercase leading-tight tracking-tight md:text-3xl'>
          {industry.title}
        </h3>

        <p className='text-primary-blue/70 mt-3 max-w-[680px] text-[15px] font-light leading-relaxed md:text-[17px]'>
          {industry.description}
        </p>

        {/* A capability tape, not tags — these are phrases, and boxing each one
            makes a ragged grid out of uneven strings. */}
        <ul className='text-primary-blue/45 mt-5 flex max-w-[760px] flex-wrap items-center gap-x-2 gap-y-1 text-[12px] md:text-[13px]'>
          {industry.proof.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && (
                <li aria-hidden='true' className={accent.separator}>
                  ·
                </li>
              )}
              <li>{item}</li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Industries(): React.JSX.Element {
  const { t } = useLocale();
  const listRef = useRef<HTMLDivElement>(null);

  useScrollTriggers(() => {
    if (!listRef.current) return [];

    const rows = gsap.utils.toArray<Element>('.industry-row', listRef.current);
    if (!rows.length) return [];

    gsap.set(rows, { opacity: 0, x: -24 });

    const tween = gsap.to(rows, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return [tween.scrollTrigger];
  }, []);

  return (
    <section
      id='industries'
      className='font-grotesk relative w-full overflow-hidden bg-white pb-[100px] pt-[80px] md:pb-[130px] md:pt-[120px] [contain:paint]'
    >
      <div className='arrow-down raspberry absolute -top-[2px] left-0 right-0 mx-auto'></div>
      <h2 className='font-grotesk text-primary-blue text-center text-xl font-normal leading-3 tracking-[10px] xl:absolute xl:left-[80px] xl:top-[60px] xl:origin-top-left xl:rotate-90 xl:py-0'>
        {t.industriesSectionTitle}
      </h2>

      <div className='mx-auto w-full max-w-[1100px] px-6 md:px-10'>
        <p className='text-deep-blue/60 mb-10 mt-10 max-w-[620px] text-[15px] leading-relaxed md:mb-14 md:text-[17px] xl:mt-0'>
          {t.industriesLead}
        </p>

        <div ref={listRef}>
          {t.industries.map((industry, i) => (
            <IndustryRow key={industry.title} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
