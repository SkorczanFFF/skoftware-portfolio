import React, { useRef } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  CubeIcon,
  GlobeIcon,
  PhoneIcon,
  ReactIcon,
  SparklesIcon,
  WrenchIcon,
} from '@/lib/shared/Icons';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';
import { useTilt } from '@/hooks/useTilt';

import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

import { useLocale } from '@/locale/LocaleContext';
import type { ServiceEntry } from '@/locale/types';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

const serviceIconMap: Record<string, IconType> = {
  Globe: GlobeIcon,
  React: ReactIcon,
  Sparkles: SparklesIcon,
  Cube: CubeIcon,
  Phone: PhoneIcon,
  Wrench: WrenchIcon,
};

function ServiceCard({
  service,
  index,
  prefersReducedMotion,
  pricingNote,
}: {
  service: ServiceEntry;
  index: number;
  prefersReducedMotion: boolean;
  pricingNote: string;
}) {
  const Icon = serviceIconMap[service.icon];
  const isOdd = index % 2 === 1;
  const { cardRef, onMouseMove, onMouseEnter, onMouseLeave } =
    useTilt(prefersReducedMotion);

  return (
    <div style={{ perspective: 600 }}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`card-inner group relative flex h-full flex-col bg-primary-blue shadow-[0_4px_16px_-8px_rgba(0,0,0,0.35)] transition-shadow duration-500 will-change-transform ${isOdd ? 'hover:shadow-[0_30px_60px_-18px_rgba(153,34,16,0.45)]' : 'hover:shadow-[0_30px_60px_-18px_rgba(128,24,52,0.45)]'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`h-[3px] w-full ${isOdd ? 'bg-orange' : 'bg-raspberry'}`}
        />

        <div
          className='relative flex flex-1 flex-col gap-3 p-6 sm:p-7'
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span
            className={`pointer-events-none absolute -right-1 -top-3 select-none font-unica text-[5.5rem] leading-none font-extralight tracking-wider sm:text-[7rem] ${isOdd ? 'text-orange/[0.04]' : 'text-raspberry/[0.04]'}`}
            style={{ transform: 'translateZ(10px)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3
            className='text-[20px] font-semibold text-white uppercase tracking-[0px] transition-[letter-spacing] duration-300 group-hover:tracking-[1px]'
            style={{ transform: 'translateZ(40px)' }}
          >
            {service.title}
          </h3>

          <p
            className={`text-[13px] -mt-4 font-medium tracking-wide brightness-150 ${isOdd ? 'text-orange' : 'text-raspberry'}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {service.tagline}
          </p>

          <p
            className='text-[14px] leading-relaxed text-white/80'
            style={{ transform: 'translateZ(20px)' }}
          >
            {service.description}
          </p>

          <ul
            className='flex flex-col gap-1.5 text-[13px] text-white/70'
            style={{ transform: 'translateZ(15px)' }}
          >
            {service.deliverables.map((item) => (
              <li key={item} className='flex items-start gap-2'>
                <span
                  aria-hidden='true'
                  className={`mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full ${isOdd ? 'bg-orange' : 'bg-raspberry'}`}
                />
                {item}
              </li>
            ))}
          </ul>

          <p
            className={`mt-auto pt-2 text-[11px] font-medium uppercase tracking-[0.15em] ${isOdd ? 'text-orange/80' : 'text-raspberry/80'}`}
            style={{ transform: 'translateZ(15px)' }}
          >
            {pricingNote}
          </p>
        </div>

        {Icon && (
          <div
            className='pointer-events-none absolute -bottom-0 -right-0 h-[150px] w-[150px]'
            aria-hidden='true'
            style={{ transform: 'translateZ(5px)' }}
          >
            <Icon
              className={`h-full w-full ${isOdd ? 'text-orange/[0.25]' : 'text-raspberry/[0.25]'}`}
            />
          </div>
        )}

        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${isOdd ? 'bg-gradient-to-b from-orange/[0.03] to-transparent' : 'bg-gradient-to-b from-raspberry/[0.03] to-transparent'}`}
        />
      </div>
    </div>
  );
}

export default function Services(): React.JSX.Element {
  const { t } = useLocale();
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollTriggers(() => {
    if (!gridRef.current) return [];

    const cards = gsap.utils.toArray<Element>('.service-card', gridRef.current);
    if (!cards.length) return [];

    const isDesktop3Col = window.innerWidth >= BREAKPOINTS.xl;
    const triggers: ScrollTrigger[] = [];

    // Reduced motion: opacity-only reveal, no 3D.
    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 0 });
      triggers.push(
        ...ScrollTrigger.batch(cards, {
          start: 'top 85%',
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              duration: 0.5,
              stagger: 0.06,
              overwrite: true,
            }),
          onLeaveBack: (batch) => gsap.set(batch, { opacity: 0 }),
        }),
      );
      return triggers;
    }

    // Entrance: cards start tipped back and scaled down, then rise flat into
    // place. ScrollTrigger.batch staggers each row as it enters, so the same
    // motion reads on 1/2/3 columns.
    gsap.set(cards, {
      opacity: 0,
      y: 28,
      rotationX: -12,
      scale: 0.94,
      transformPerspective: 800,
      transformOrigin: '50% 100%',
    });

    triggers.push(
      ...ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            y: 28,
            rotationX: -12,
            scale: 0.94,
            duration: 0.4,
            ease: 'power2.in',
            overwrite: true,
          }),
      }),
    );

    // Touch fallback for hover — cards lift (scale + shadow + glow + title
    // spacing) as they pass through the viewport, mirroring the desktop hover.
    if (!isDesktop3Col) {
      const BASE_SHADOW = '0 4px 16px -8px rgba(0,0,0,0.35)';
      const LIFT_SHADOW = '0 24px 50px -18px rgba(0,0,0,0.45)';

      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>('.card-inner');
        const title = card.querySelector<HTMLElement>('h3');
        const glow = card.querySelector<HTMLElement>(
          '.card-inner > .pointer-events-none:last-child',
        );

        const activate = () => {
          if (inner)
            gsap.to(inner, {
              scale: 1.04,
              boxShadow: LIFT_SHADOW,
              duration: 0.35,
              ease: 'power2.out',
            });
          if (title)
            gsap.to(title, {
              letterSpacing: '1px',
              duration: 0.3,
              ease: 'power2.out',
            });
          if (glow)
            gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        };
        const deactivate = () => {
          if (inner)
            gsap.to(inner, {
              scale: 1,
              boxShadow: BASE_SHADOW,
              duration: 0.35,
              ease: 'power2.out',
            });
          if (title)
            gsap.to(title, {
              letterSpacing: '0px',
              duration: 0.3,
              ease: 'power2.out',
            });
          if (glow)
            gsap.to(glow, { opacity: 0, duration: 0.4, ease: 'power2.out' });
        };

        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: activate,
            onLeave: deactivate,
            onEnterBack: activate,
            onLeaveBack: deactivate,
          }),
        );
      });
    }

    return triggers;
  }, [prefersReducedMotion]);

  return (
    <Section
      id='services'
      tone='white'
      className='flex min-h-[50vh] flex-col items-center justify-center pb-[80px] pt-[100px] md:pt-[160px] lg:pb-[120px]'
    >
      <SectionTitle tone='dark' className='pt-2'>
        {t.servicesSectionTitle}
      </SectionTitle>

      <div
        ref={gridRef}
        className='service-grid mx-auto grid max-w-[1200px] gap-[60px] md:gap-y-0 grid-cols-1 md:gap-x-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-12'
      >
        {t.services.map((service, i) => (
          <div
            key={service.slug}
            className={`service-card mx-auto w-full max-w-[370px] ${i % 2 === 1 ? 'md:mt-[60px]' : ''} ${i % 3 === 1 ? 'xl:mt-[24px]' : 'xl:mt-0'}`}
          >
            <ServiceCard
              service={service}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
              pricingNote={t.servicesPricingNote}
            />
          </div>
        ))}
      </div>

      <Button href='/#contact' className='mt-14'>
        {t.servicesCtaLabel}
      </Button>
    </Section>
  );
}
