import React from 'react';

import { GithubIcon, GlobalIcon } from '@/lib/shared/Icons';

import ExternalLink from '@/components/ui/ExternalLink';

import { useLocale } from '@/locale/LocaleContext';
import type { ProjectEntry } from '@/locale/types';

interface PortfolioProjectItemProps {
  project: ProjectEntry;
  isLast?: boolean;
  short?: boolean;
}

const LINK_CLASS =
  'flex items-center gap-2 text-orange-dark transition-colors duration-150 hover:text-white';

function ProjectLinks({ project }: { project: ProjectEntry }) {
  const { t } = useLocale();
  if (!project.git && !project.live) return null;

  return (
    <div className='flex gap-5'>
      {project.git && (
        <ExternalLink
          href={project.git}
          label={t.portfolioRepo}
          className={LINK_CLASS}
        >
          <GithubIcon className='text-xl' aria-hidden='true' />
          <span className='text-sm'>{t.portfolioRepo}</span>
        </ExternalLink>
      )}
      {project.live && (
        <ExternalLink
          href={project.live}
          label={project.liveLabel ?? t.portfolioLiveDemo}
          className={LINK_CLASS}
        >
          <GlobalIcon className='text-xl' aria-hidden='true' />
          <span className='text-sm'>
            {project.liveLabel ?? t.portfolioLiveDemo}
          </span>
        </ExternalLink>
      )}
    </div>
  );
}

export default function PortfolioProjectItem({
  project,
  isLast,
  short,
}: PortfolioProjectItemProps): React.JSX.Element {
  const { t } = useLocale();
  const titleSize = short
    ? 'text-xl md:text-2xl lg:text-3xl'
    : 'text-2xl md:text-3xl lg:text-4xl';

  // Title above the image on desktop, below it on mobile (see `order-*`).
  const title = (
    <h3
      className={`font-unica gradient bg-linear-to-r from-raspberry to-orange-dark px-4 py-1 ${titleSize} font-normal block md:inline-block mb-3 md:mb-0 ${project.git ? 'transition-colors duration-150 hover:text-primary-blue' : ''}`}
    >
      {project.title}
    </h3>
  );
  const titleClass =
    'project-title order-2 md:order-1 mt-4 md:mt-0 px-1 md:px-0';

  return (
    <div
      className={`w-full md:max-w-[calc(var(--panel-w)-250px)] flex flex-col ${isLast ? 'pb-[80px] md:pb-0' : ''}`}
    >
      {project.git ? (
        <ExternalLink
          href={project.git}
          label={project.title}
          className={titleClass}
        >
          {title}
        </ExternalLink>
      ) : (
        <div className={titleClass}>{title}</div>
      )}

      {/* Desktop only: second shot on hover, description overlay slides in. */}
      <div className='order-1 md:order-2 relative overflow-hidden border-2 border-orange group'>
        <img
          src={project.pic}
          alt={t.screenshotOf.replace('{title}', project.title)}
          loading='lazy'
          className={`block w-full md:max-h-[55vh] md:object-contain ${project.pic2 ? 'md:transition-opacity md:duration-500 md:group-hover:opacity-0' : ''}`}
        />
        {project.pic2 && (
          <img
            src={project.pic2}
            alt={t.screenshotAltView.replace('{title}', project.title)}
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
