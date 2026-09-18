import React, { useEffect, useRef } from 'react';

import { ScrollTrigger } from '@/lib/gsap';
import { computePanelWidth, isShortViewport } from '@/lib/portfolioPanelWidth';
import { usePortfolioScroll } from '@/hooks/usePortfolioScroll';
import { useViewport } from '@/hooks/useViewport';

import SectionArrow from '@/components/ui/SectionArrow';
import SectionTitle from '@/components/ui/SectionTitle';

import { useLocale } from '@/locale/LocaleContext';

import PortfolioProjectItem from './Partials/PortfolioProjectItem';

export default function Portfolio(): React.JSX.Element {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { width: vw, height: vh } = useViewport();
  const panelW = computePanelWidth(vh, vw);
  const short = isShortViewport(vh);

  usePortfolioScroll(sectionRef, trackRef);

  // After the panel width changes, the layout reflows; recompute the pinned
  // horizontal scroll end so it stays in sync with the new track width.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [panelW]);

  return (
    <section
      ref={sectionRef}
      id='portfolio'
      aria-label={t.portfolioLabel}
      className='font-grotesk bg-primary-blue relative w-full overflow-hidden md:h-screen'
      style={{ ['--panel-w' as string]: `${panelW}px` }}
    >
      <SectionArrow color='white' />
      {/* Floats over the pinned track: blurred backdrop, pushed clear of the
          first panel on small screens, left-aligned once rotated. */}
      <SectionTitle
        tone='light'
        layout='bare'
        className='z-10 mt-[100px] w-full py-2 pb-2 text-center backdrop-blur-[10px] md:-mb-[100px] lg:mt-[80px] xl:left-[95px] xl:top-[60px] xl:mt-0 xl:p-4 xl:text-left'
      >
        {t.portfolioTitle}
      </SectionTitle>

      <div
        ref={trackRef}
        role='list'
        className='flex h-auto w-full flex-col text-white will-change-transform md:h-full md:flex-row md:flex-nowrap'
      >
        {t.projects
          .filter((p) => !p.resumeOnly)
          .map((project, index, arr) => (
            <div
              key={project.id}
              role='listitem'
              className={`project-panel mobile-fade flex w-full shrink-0 items-center justify-center px-5 py-10 md:w-[var(--panel-w)] md:px-[125px] md:py-0 ${index === 0 ? 'md:ml-[calc(50vw-(var(--panel-w)/2))]' : ''}`}
            >
              <PortfolioProjectItem
                project={project}
                isLast={index === arr.length - 1}
                short={short}
              />
            </div>
          ))}

        {/* Spacer — ensures last panel can scroll to center */}
        <div className='hidden shrink-0 md:block md:w-[calc(50vw-(var(--panel-w)/2))]' />
      </div>
    </section>
  );
}
