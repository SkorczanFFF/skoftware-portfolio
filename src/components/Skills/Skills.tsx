import React, { useMemo, useRef } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { techCategoryGroups, techIconMap } from '@/lib/shared/techMap';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';

type TechEntry = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
};

const techCategories: Record<string, TechEntry[]> = Object.fromEntries(
  Object.entries(techCategoryGroups).map(([category, labels]) => [
    category,
    labels
      .filter((label) => label in techIconMap)
      .map((label) => ({ Icon: techIconMap[label], label })),
  ]),
);

function TechIcon({ tech }: { tech: TechEntry }) {
  return (
    <div
      className='tech-icon group text-deep-blue hover:text-raspberry flex w-[75px] flex-col items-center gap-3 duration-150 hover:drop-shadow-[0_-2px_2px_#80183466] md:w-[100px] [perspective:200px]'
      style={{ willChange: 'opacity' }}
    >
      <tech.Icon className='text-4xl sm:text-5xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)]' />
      <span className='text-center text-xs'>{tech.label}</span>
    </div>
  );
}

function animateCategory(
  refs: React.RefObject<HTMLDivElement | null>[],
  triggerRef: React.RefObject<HTMLDivElement | null>,
  options?: { useFromTo?: boolean; staggerFrom?: 'start' | 'end' },
) {
  const allIcons = refs.flatMap((r) =>
    r.current ? gsap.utils.toArray<Element>('.tech-icon', r.current) : [],
  );
  if (!allIcons.length || !triggerRef.current) return undefined;

  const anim = options?.useFromTo
    ? gsap.fromTo(
        allIcons,
        { opacity: 0, scale: 1.4 },
        {
          opacity: 1,
          scale: 1,
          stagger: { each: 0.1, from: options.staggerFrom ?? 'start' },
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    : gsap.to(allIcons, {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

  return anim.scrollTrigger ?? undefined;
}

const allTechs: TechEntry[] = Object.values(techCategories).flat();

export default function Skills(): React.JSX.Element {
  const { t } = useLocale();
  const categoryLabels = useMemo(
    () =>
      ({
        frontend: t.techCategoryFrontend,
        backend: t.techCategoryBackend,
        database: t.techCategoryDatabase,
        design: t.techCategoryDesign,
        tools: t.techCategoryTools,
      }) as Record<string, string>,
    [t],
  );
  const sectionRef = useRef<HTMLElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useScrollTriggers(() => {
    if (sectionRef.current) {
      gsap.set(gsap.utils.toArray('.tech-icon', sectionRef.current), {
        opacity: 1,
        scale: 1,
      });
    }

    if (window.innerWidth <= BREAKPOINTS.xl) {
      return [];
    }

    const triggers = [
      animateCategory([frontendRef], frontendRef),
      animateCategory([backendRef, databaseRef], backendRef, {
        useFromTo: true,
        staggerFrom: 'end',
      }),
      animateCategory([designRef, toolsRef], designRef, { useFromTo: true }),
    ];

    return triggers.filter((t): t is ScrollTrigger => t != null);
  }, []);

  return (
    <section
      ref={sectionRef}
      id='skills'
      aria-label='Skills'
      className='font-grotesk relative flex h-full w-full flex-col items-center justify-between border-b bg-white lg:pb-[160px] pb-[100px] lg:pt-[160px]'
    >
      <div className='hidden xl:flex xl:w-full xl:max-w-[1200px] xl:flex-col xl:gap-8'>
        <div className='flex w-full flex-col' ref={frontendRef}>
          <h3 className='mb-4 w-full rounded-[3px] bg-deep-blue px-2 text-md font-semibold capitalize text-white'>
            {categoryLabels.frontend}
          </h3>
          <div className='flex w-full justify-between'>
            {techCategories.frontend.map((tech) => (
              <TechIcon key={tech.label} tech={tech} />
            ))}
          </div>
        </div>

        <div className='flex w-full gap-6 xl:flex-row'>
          <div className='max-w-2/3 flex w-full flex-col' ref={backendRef}>
            <h3 className='mb-4 w-full rounded-[3px] bg-deep-blue px-2 text-md font-semibold capitalize text-white'>
              {categoryLabels.backend}
            </h3>
            <div className='flex w-full gap-[12px]'>
              {techCategories.backend.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>

          <div className='flex w-1/3 flex-col' ref={databaseRef}>
            <h3 className='mb-4 w-full rounded-[3px] bg-deep-blue px-2 text-right text-md font-semibold capitalize text-white'>
              {categoryLabels.database}
            </h3>
            <div className='flex w-full gap-[10px]'>
              {techCategories.database.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>
        </div>

        <div className='flex w-full gap-10 xl:flex-row'>
          <div className='flex flex-col' ref={designRef}>
            <h3 className='mb-4 w-full rounded-[3px] bg-deep-blue px-2 text-md font-semibold capitalize text-white'>
              {categoryLabels.design}
            </h3>
            <div className='flex w-full gap-[20px]'>
              {techCategories.design.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>

          <div className='flex flex-col' ref={toolsRef}>
            <h3 className='mb-4 w-full rounded-[3px] bg-deep-blue px-2 text-right text-md font-semibold capitalize text-white'>
              {categoryLabels.tools}
            </h3>
            <div className='flex w-full gap-[20px]'>
              {techCategories.tools.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4x8 grid (below xl) */}
      <div className='my-10 w-full max-w-[400px] md:max-w-[600px] xl:hidden'>
        <div className='mx-auto grid grid-cols-4 justify-items-center gap-y-6 md:gap-y-12'>
          {allTechs.map((tech) => (
            <TechIcon key={tech.label} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
