import React from 'react';

import { GithubIcon, GlobalIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';
import type { ProjectEntry } from '@/locale/types';

interface PortfolioProjectItemProps {
  project: ProjectEntry;
  isLast?: boolean;
  short?: boolean;
}

function ProjectLinks({ project }: { project: ProjectEntry }) {
  const { t } = useLocale();
  if (!project.git && !project.live) return null;

  return (
    <div className='flex gap-5'>
      {project.git && (
        <a
          href={project.git}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${t.portfolioRepo} (opens in new tab)`}
          className='flex items-center gap-2 text-orange-dark transition-colors duration-150 hover:text-white'
        >
          <GithubIcon className='text-xl' aria-hidden='true' />
          <span className='text-sm'>{t.portfolioRepo}</span>
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${project.liveLabel ?? t.portfolioLiveDemo} (opens in new tab)`}
          className='flex items-center gap-2 text-orange-dark transition-colors duration-150 hover:text-white'
        >
          <GlobalIcon className='text-xl' aria-hidden='true' />
          <span className='text-sm'>
            {project.liveLabel ?? t.portfolioLiveDemo}
          </span>
        </a>
      )}
    </div>
  );
}

export default function PortfolioProjectItem({
  project,
  isLast,
  short,
}: PortfolioProjectItemProps): React.JSX.Element {
  const titleSize = short
    ? 'text-xl md:text-2xl lg:text-3xl'
    : 'text-2xl md:text-3xl lg:text-4xl';

  return (
    <div
      className={`w-full md:max-w-[calc(var(--panel-w)-250px)] flex flex-col ${isLast ? 'pb-[80px] md:pb-0' : ''}`}
    >
      {/* Title — above image on desktop (order-1), below on mobile (order-2) */}
      {project.git ? (
        <a
          href={project.git}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${project.title} (opens in new tab)`}
          className='project-title order-2 md:order-1 mt-4 md:mt-0 px-1 md:px-0'
        >
          <h3
            className={`font-unica gradient bg-linear-to-r from-raspberry to-orange-dark px-4 py-1 ${titleSize} font-normal transition-colors duration-150 hover:text-primary-blue block md:inline-block mb-3 md:mb-0`}
          >
            {project.title}
          </h3>
        </a>
      ) : (
        <div className='project-title order-2 md:order-1 mt-4 md:mt-0 px-1 md:px-0'>
          <h3
            className={`font-unica gradient bg-linear-to-r from-raspberry to-orange-dark px-4 py-1 ${titleSize} font-normal block md:inline-block mb-3 md:mb-0`}
          >
            {project.title}
          </h3>
        </div>
      )}

      {/* Image with desktop-only hover swap + description overlay */}
      <div className='order-1 md:order-2 relative overflow-hidden border-2 border-orange group'>
        <img
          src={project.pic}
          alt={`Screenshot of ${project.title}`}
          loading='lazy'
          className={`block w-full md:max-h-[55vh] md:object-contain ${project.pic2 ? 'md:transition-opacity md:duration-500 md:group-hover:opacity-0' : ''}`}
        />
        {project.pic2 && (
          <img
            src={project.pic2}
            alt={`Screenshot of ${project.title} — alternate view`}
            loading='lazy'
            className='hidden md:block absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100'
          />
        )}
        <div className='project-overlay absolute inset-x-0 bottom-0 bg-primary-blue/60 to-transparent p-2 opacity-0 hidden md:block backdrop-blur-[5px]'>
          <p className='text-sm font-extralight leading-4.5 text-white/90 text-justify'>
            {project.description}
          </p>
        </div>
      </div>

      {/* Meta: technos + links — row on desktop (GSAP animated), column on mobile */}
      <div className='project-meta order-3 mt-2 flex flex-col px-1 md:flex-row md:items-center md:justify-between md:px-0 md:opacity-0'>
        <p className='mb-2 md:mb-0 text-sm tracking-wide text-gray-400'>
          {project.technos}
        </p>
        <p className='mb-4 text-sm font-extralight leading-relaxed md:hidden'>
          {project.description}
        </p>
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}
