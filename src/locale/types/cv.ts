import type { ExperienceEntry } from './entries';

/**
 * `/cv` page strings. Kept on purpose though the Experience/Skills home
 * sections were removed in the pivot — the resume page still renders these.
 */
export type CvStrings = {
  experiences: ExperienceEntry[];

  resumeHeaderAbout: string;
  resumeHeaderContact: string;
  resumeHeaderLanguagesTitle: string;
  resumeLanguageEnglish: string;
  resumeLanguageRussian: string;
  resumeLanguagePolish: string;
  resumeHeaderLinks: string;
  resumeHeaderHobbies: string;
  resumeHeaderExperience: string;
  resumeHeaderEducation: string;
  resumeHeaderSelectedProjects: string;
  resumeHeaderSkills: string;
  resumeHeaderDownload: string;
  resumeAboutMe: string;
  resumeEducation: {
    university: string;
    field: string;
    degree: string;
    dates: string;
  };
  resumePageTitle: string;
  resumeAltPhoto: string;
  resumeRodo: string;
  resumeRepo: string;
  resumeDemo: string;
  resumeHobbies: string[];
};
