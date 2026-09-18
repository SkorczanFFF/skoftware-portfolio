import type { ExperienceEntry } from './entries';

/** `/cv` page strings. */
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
