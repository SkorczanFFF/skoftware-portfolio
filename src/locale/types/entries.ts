export type ExperienceEntry = {
  company: string;
  position: string;
  resumeDate: string;
  resumeType?: string;
  stack: string[];
  duties: string[];
};

export type ProjectEntry = {
  id: number;
  pic: string;
  /** Optional second image shown on hover (desktop). */
  pic2?: string;
  title: string;
  technos: string;
  description: string;
  live: string;
  git: string;
  /** Overrides `portfolioLiveDemo` for the live link label (e.g. Chrome Web Store). */
  liveLabel?: string;
  /** Whether to display this project in the resume. */
  inResume?: boolean;
  /** Whether to hide this project from the portfolio section. */
  resumeOnly?: boolean;
};

export type ServiceEntry = {
  /** Stable id, identical in PL and EN. */
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  /** 3 "what you get" bullets. */
  deliverables: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  q: string;
  a: string;
};
