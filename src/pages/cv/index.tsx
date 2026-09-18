import Head from 'next/head';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import {
  CallIcon,
  CarIcon,
  ChipIcon,
  CompassIcon,
  GithubIcon,
  GlobalIcon,
  GuitarIcon,
  LanguageIcon,
  LinkedinIcon,
  MailIcon,
  MusicIcon,
  PdfIcon,
  VercelIcon,
} from '@/lib/shared/Icons';
import { resumeTechList, techIconMap } from '@/lib/shared/techMap';
import {
  COMPANY_FOUNDER,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  SOCIALS,
} from '@/lib/site';

import BottomBar from '@/components/layout/BottomBar';

import { useLocale } from '@/locale/LocaleContext';

export default function CV(): React.JSX.Element {
  const { locale, t } = useLocale();
  const pdfHref = `/Maciej Skorus - CV [${locale.toUpperCase()}].pdf`;

  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const update = () => {
      const w = wrapperRef.current?.offsetWidth ?? 794;
      setScale(Math.min(1, w / 794));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (searchParams.get('download') === '1') {
      const link = document.createElement('a');
      link.href = pdfHref;
      link.download = '';
      link.click();
    }
  }, [searchParams, pdfHref]);

  return (
    <>
      <Head>
        <title>{t.resumePageTitle}</title>
        {/* Kept out of the index on purpose: a services site should not rank
            on its owner's CV. Still crawlable so the links are followed. */}
        <meta name='robots' content='noindex, follow' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: COMPANY_FOUNDER,
              url: `${SITE_URL}/cv`,
              email: CONTACT_EMAIL,
              telephone: CONTACT_PHONE,
              worksFor: { '@id': `${SITE_URL}/#organization` },
              sameAs: SOCIALS.map((s) => s.href),
            }),
          }}
        />
      </Head>
      <section className='font-grotesk pt-[60px] flex flex-col items-center justify-start md:justify-between bg-linear-to-b from-[#1A1A28] to-[#3a1323] min-h-screen'>
        <div className='flex justify-end h-auto flex-row items-stretch w-full max-w-[794px] px-2 md:px-0'>
          <a
            href={pdfHref}
            download
            className='hover:bg-orange bg-raspberry my-6 flex items-center px-2 py-1 text-sm tracking-wider text-white duration-150 cursor-pointer'
          >
            {t.resumeHeaderDownload}
            <PdfIcon className='ml-1 text-lg' />
          </a>
        </div>
        <div className='w-full md:w-auto md:m-10 md:mt-0 px-2 md:px-0'>
          <div
            ref={wrapperRef}
            className='mx-auto overflow-hidden'
            style={{
              maxWidth: 794,
              height: 1123 * scale,
            }}
          >
            <div
              className='overflow-hidden flex h-[1123px] w-[794px] justify-center bg-primary-blue flex-row origin-top-left'
              style={{ transform: `scale(${scale})` }}
            >
              {/* Left side */}
              <div className='bg-transparent h-full w-[226px] border-r-[16px] border-raspberry'>
                <Image
                  src='/cv.png'
                  alt={t.resumeAltPhoto}
                  width={206}
                  height={206}
                />
                {/* <div className="bg-raspberry h-[8px] w-full"></div> */}
                <div className='flex flex-col justify-between'>
                  {[
                    ['creative', 'MACIEJ'],
                    ['fullstack', 'SKORUS'],
                    ['developer'],
                  ].map((lines, i) => (
                    <div key={i}>
                      {lines.map((text, j) => (
                        <p
                          key={text}
                          className={`text-2xl tracking-wide ${j % 2 === 0 ? 'pr-2 text-right font-unica font-light text-white' : 'pl-2 text-left font-[500] bg-raspberry text-primary-blue'}`}
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div className='mt-1 flex flex-col gap-3 text-[11px]'>
                  {/* Contact */}
                  <div>
                    <p className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderContact}
                    </p>
                    <div className='px-2 pt-1 text-white/80 flex flex-col gap-[2px]'>
                      <a
                        href={`mailto:${t.contactEmail}`}
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <MailIcon className='text-[10px] shrink-0' />
                        {t.contactEmail}
                      </a>
                      <a
                        href={`tel:${t.contactPhone.replace(/\s/g, '')}`}
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <CallIcon className='text-[10px] shrink-0' />
                        {t.contactPhone}
                      </a>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <p className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderEducation}
                    </p>
                    <div className='pl-2 pt-1 text-white/80'>
                      <p className='font-semibold text-white'>
                        {t.resumeEducation.university}
                      </p>
                      <p>{t.resumeEducation.field}</p>
                      <p className='text-orange brightness-150'>
                        {t.resumeEducation.degree}
                      </p>
                      <p className='text-orange brightness-150'>
                        {t.resumeEducation.dates}
                      </p>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <p className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderLanguagesTitle}
                    </p>
                    <div className='px-2 pt-1 text-white/80'>
                      <p>{t.resumeLanguageEnglish}</p>
                      <p>{t.resumeLanguageRussian}</p>
                      <p>{t.resumeLanguagePolish}</p>
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <p className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderLinks}
                    </p>
                    <div className='px-2 pt-1 text-white/80 flex flex-col gap-[2px]'>
                      <a
                        href='https://github.com/SkorczanFFF'
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <GithubIcon className='text-[10px] shrink-0' />
                        github.com/SkorczanFFF
                      </a>
                      <a
                        href='https://www.linkedin.com/in/mskorus/'
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <LinkedinIcon className='text-[10px] shrink-0' />
                        linkedin.com/in/mskorus
                      </a>
                      <a
                        href={
                          process.env.NEXT_PUBLIC_SITE_URL ||
                          'https://skoftware.pl/'
                        }
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center gap-1 hover:text-white -mt-[2px]'
                      >
                        <VercelIcon className='text-[10px] shrink-0' />
                        {(
                          process.env.NEXT_PUBLIC_SITE_URL ||
                          'https://skoftware.pl'
                        ).replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderSkills}
                    </p>
                    <div className='px-2 pt-2 flex flex-col gap-[6px]'>
                      {Array.from(
                        { length: Math.ceil(resumeTechList.length / 3) },
                        (_, row) => (
                          <div key={row} className='flex gap-[6px]'>
                            {resumeTechList
                              .slice(row * 3, row * 3 + 3)
                              .map((tech) => {
                                const Icon = techIconMap[tech];
                                return (
                                  <div
                                    key={tech}
                                    className='flex items-center gap-[4px] text-[9px] text-white/70'
                                  >
                                    {Icon && (
                                      <Icon className='text-[11px] text-white/90' />
                                    )}
                                    <span>{tech}</span>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div>
                    <p className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderHobbies}
                    </p>
                    <div className='px-2 pt-2 flex gap-2'>
                      {(
                        [
                          GuitarIcon,
                          CarIcon,
                          MusicIcon,
                          CompassIcon,
                          ChipIcon,
                          LanguageIcon,
                        ] as const
                      ).map((Icon, i) => (
                        <div key={i} className='flex flex-col items-center'>
                          <Icon className='text-[24px] text-white/90' />
                          <span
                            className='mt-1 font-[400] text-[9px] text-white/70'
                            style={{ writingMode: 'vertical-rl' }}
                          >
                            {t.resumeHobbies[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Main content */}
              <div className='bg-white h-full w-[594px] flex flex-col justify-between'>
                <div className='px-4 pt-4'>
                  {/* About */}
                  <h3 className='text-[13px] font-bold uppercase tracking-[3px] text-primary-blue border-b border-primary-blue/20 pb-1 mb-2 font-unica'>
                    {t.resumeHeaderAbout}
                  </h3>
                  <p className='text-[9px] leading-[12px] text-primary-blue/80 mb-4 text-justify'>
                    {t.resumeAboutMe}
                  </p>

                  {/* Experience */}
                  <h3 className='text-[13px] font-bold uppercase tracking-[3px] text-primary-blue border-b border-primary-blue/20 pb-1 mb-3'>
                    {t.resumeHeaderExperience}
                  </h3>
                  <div className='flex flex-col gap-4'>
                    {t.experiences.map((exp) => (
                      <div key={exp.company}>
                        <div className='flex items-baseline justify-between'>
                          <p className='text-[12px] font-bold text-primary-blue'>
                            {exp.company}
                          </p>
                          <p className='text-[9px] text-primary-blue/60'>
                            {exp.resumeDate}
                          </p>
                        </div>
                        <div className='flex items-baseline justify-between'>
                          <p className='text-[10px] italic text-raspberry'>
                            {exp.position}
                          </p>
                          {exp.resumeType && (
                            <p className='text-[9px] text-primary-blue/50'>
                              {exp.resumeType}
                            </p>
                          )}
                        </div>
                        <p className='text-[9px] text-primary-blue/50 mt-[2px]'>
                          {exp.stack.join(' • ')}
                        </p>
                        <ul className='mt-1 flex flex-col gap-[2px]'>
                          {exp.duties.map((duty, i) => (
                            <li
                              key={i}
                              className='text-[9px] leading-[11px] text-primary-blue/80 pl-2 relative before:content-["•"] before:absolute before:left-0 before:text-raspberry text-justify'
                            >
                              {duty}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Selected Projects */}
                  <h3 className='text-[13px] font-bold uppercase tracking-[3px] text-primary-blue border-b border-primary-blue/20 pb-1 mb-3 mt-5'>
                    {t.resumeHeaderSelectedProjects}
                  </h3>
                  <div className='flex flex-col gap-2'>
                    {t.projects
                      .filter((p) => p.inResume)
                      .map((project) => (
                        <div key={project.id}>
                          <div className='flex items-baseline justify-between'>
                            <p className='text-[11px] font-bold text-primary-blue'>
                              {project.title}
                            </p>
                            <p className='text-[9px] text-primary-blue/50'>
                              {project.technos}
                            </p>
                          </div>
                          <p className='text-[9px] leading-[11px] text-primary-blue/80 mt-[2px] text-justify'>
                            {project.description}
                          </p>
                          {(project.git || project.live) && (
                            <div className='mt-[2px] flex gap-3 text-[8px] text-raspberry'>
                              {project.git && (
                                <a
                                  href={project.git}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='flex items-center gap-[2px] hover:text-primary-blue'
                                >
                                  <GithubIcon className='text-[8px]' />
                                  {t.resumeRepo}
                                </a>
                              )}
                              {project.live && (
                                <a
                                  href={project.live}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='flex items-center gap-[2px] hover:text-primary-blue'
                                >
                                  <GlobalIcon className='text-[8px]' />
                                  {project.liveLabel || t.resumeDemo}
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <p className='px-2 pb-2 text-[8.7px] leading-[8px] text-primary-blue/40 text-justify'>
                  {t.resumeRodo}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mt-auto md:mt-0'>
          <BottomBar />
        </div>
      </section>
    </>
  );
}
