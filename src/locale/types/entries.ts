export type ExperienceEntry = {
  company: string;
  position: string;
  date: string;
  resumeDate: string;
  resumeType?: string;
  stack: string[];
  icon: string;
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
  /**
   * Routing key for `/uslugi/[slug]`. Identical string in PL and EN — Next
   * shares the pathname across locales, so an English slug here would break
   * `/en/uslugi/...` (DEC-04).
   */
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  /** 3 "what you get" bullets — benefit phrasing derived from `description`. */
  deliverables: string[];
  /**
   * Localized "od X zł" / "from X" entry price (DEC-06). Optional: when unset
   * the card shows only `servicesPricingNote`. Real figures are gated on C1 —
   * left unset until Maciej supplies them, never invented.
   */
  priceFrom?: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  q: string;
  a: string;
};
