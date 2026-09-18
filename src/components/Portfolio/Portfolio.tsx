import React, { useEffect, useRef } from 'react';

import { ScrollTrigger } from '@/lib/gsap';
import { computePanelWidth, isShortViewport } from '@/lib/portfolioPanelWidth';
import { usePortfolioScroll } from '@/hooks/usePortfolioScroll';
import { useViewportSize } from '@/hooks/useViewportSize';

import { useLocale } from '@/locale/LocaleContext';

import PortfolioProjectItem from './Partials/PortfolioProjectItem';

export default function Portfolio(): React.JSX.Element {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { width: vw, height: vh } = useViewportSize();
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
      aria-label='Portfolio projects'
      className='font-grotesk bg-primary-blue relative w-full overflow-hidden md:h-screen'
      style={{ ['--panel-w' as string]: `${panelW}px` }}
    >
      <div className='arrow-down white absolute -top-[2px] left-0 right-0 mx-auto'></div>
      <h2 className='font-grotesk z-10 py-2 text-xl font-normal leading-3 tracking-[10px] text-white xl:absolute xl:origin-top-left xl:rotate-90 xl:left-[95px] xl:top-[60px] xl:p-4 w-full backdrop-blur-[10px] lg:mt-[80px] text-center xl:text-left xl:mt-0 md:-mb-[100px] mt-[100px] pb-2'>
        {t.portfolioTitle}
      </h2>

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
