export type Locale = 'en' | 'pl';

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

/**
 * A domain the business delivers in. Replaces the employer-by-employer
 * `ExperienceEntry` listing on the landing page: same underlying facts,
 * framed as capability rather than job history.
 */
export type IndustryEntry = {
  icon: string;
  title: string;
  description: string;
  /** Concrete things shipped in this domain — short noun phrases. */
  proof: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Dictionary = {
  seoTitle: string;
  seoSiteName: string;
  seoDescription: string;

  notFoundTitle: string;
  notFoundBack: string;

  navHome: string;
  navIndustries: string;
  navPortfolio: string;
  navContact: string;
  navResume: string;
  toggleMenu: string;
  navMenuLabel: string;

  heroEyebrow: string;
  heroH1Line1: string;
  heroH1Line2: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroTrust: string[];
  heroErrorFallback: string;

  footerCopyright: string;
  footerResume: string;
  footerResumeOnline: string;
  footerResumeDownload: string;
  footerHeading: string;
  footerNarrative: string;
  footerDirectLabel: string;
  footerNetworkLabel: string;
  footerInvoiceNote: string;

  navServices: string;
  servicesSectionTitle: string;
  /**
   * Always-shown note that pricing is individual, paired with each service's
   * optional `priceFrom` range (DEC-06: range *and* individual quote).
   */
  servicesPricingNote: string;
  /** Label for the section-level CTA under the services grid → /#contact. */
  servicesCtaLabel: string;
  services: ServiceEntry[];

  techStripLead: string;

  industriesSectionTitle: string;
  industriesLead: string;
  industries: IndustryEntry[];

  whyMeSectionTitle: string;
  whyMeHeading: string;
  whyMeBody: string;
  whyMePoints: string[];

  processSectionTitle: string;
  processSteps: ProcessStep[];

  faqSectionTitle: string;
  faqItems: FaqItem[];

  experiences: ExperienceEntry[];

  portfolioTitle: string;
  portfolioRepo: string;
  portfolioLiveDemo: string;
  projects: ProjectEntry[];

  contactPhone: string;
  contactEmail: string;
  contactCompanyInfo: string;
  contactLocation: string;
  contactInvoiceInfo: string;

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

  cookieTitle: string;
  cookieDescription: string;
  cookieAcceptAll: string;
  cookieRejectAll: string;
  cookieSavePreferences: string;
  cookieSettings: string;
  cookieNecessaryTitle: string;
  cookieNecessaryDescription: string;
  cookieAnalyticsTitle: string;
  cookieAnalyticsDescription: string;
  cookiePolicyTitle: string;
  cookiePolicyIntro: string;
  cookiePolicyWhatAreCookiesTitle: string;
  cookiePolicyWhatAreCookies: string;
  cookiePolicyControllerTitle: string;
  cookiePolicyController: string;
  cookiePolicyCookiesWeUseTitle: string;
  cookiePolicyCookiesWeUseIntro: string;
  cookiePolicyTableName: string;
  cookiePolicyTableProvider: string;
  cookiePolicyTablePurpose: string;
  cookiePolicyTableCategory: string;
  cookiePolicyTableType: string;
  cookiePolicyTableDuration: string;
  cookiePolicyCookieCC: string;
  cookiePolicyCookieCCPurpose: string;
  cookiePolicyCookieVercelAnalytics: string;
  cookiePolicyCookieVercelAnalyticsPurpose: string;
  cookiePolicyCookieVercelSpeed: string;
  cookiePolicyCookieVercelSpeedPurpose: string;
  cookiePolicyLegalBasisTitle: string;
  cookiePolicyLegalBasis: string;
  cookiePolicyManageTitle: string;
  cookiePolicyManage: string;
  cookiePolicyManageBrowser: string;
  cookiePolicyResetButton: string;
  cookiePolicyThirdPartyTitle: string;
  cookiePolicyThirdParty: string;
  cookiePolicyRightsTitle: string;
  cookiePolicyRightsIntro: string;
  cookiePolicyRightAccess: string;
  cookiePolicyRightRectification: string;
  cookiePolicyRightErasure: string;
  cookiePolicyRightRestriction: string;
  cookiePolicyRightPortability: string;
  cookiePolicyRightObject: string;
  cookiePolicyRightWithdraw: string;
  cookiePolicyRightComplaint: string;
  cookiePolicyRightsOutro: string;
  cookiePolicyTransfersTitle: string;
  cookiePolicyTransfers: string;
  cookiePolicyChangesTitle: string;
  cookiePolicyChanges: string;
  cookiePolicyLastUpdated: string;
  cookiePolicyBackHome: string;
};
