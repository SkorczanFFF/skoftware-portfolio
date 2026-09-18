import type {
  FaqItem,
  ProcessStep,
  ProjectEntry,
  ServiceEntry,
} from './entries';

/**
 * Landing-page sections: hero, services, tech strip, why-me, process, FAQ
 * and the portfolio grid.
 */
export type MarketingStrings = {
  heroEyebrow: string;
  heroH1Line1: string;
  heroH1Line2: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroTrust: string[];
  heroErrorFallback: string;
  // transitional: read by the old Hero until the new one lands, removed with it
  heroGreeting: string;
  heroName: string;
  heroHeadline: string;

  servicesSectionTitle: string;
  /** Pricing is individual — every card shows this instead of a figure. */
  servicesPricingNote: string;
  /** Label for the section-level CTA under the services grid → /#contact. */
  servicesCtaLabel: string;
  services: ServiceEntry[];

  techStripLead: string;

  whyMeSectionTitle: string;
  whyMeHeading: string;
  whyMeBody: string;
  whyMePoints: string[];

  processSectionTitle: string;
  processSteps: ProcessStep[];

  faqSectionTitle: string;
  faqItems: FaqItem[];

  portfolioTitle: string;
  portfolioRepo: string;
  portfolioLiveDemo: string;
  projects: ProjectEntry[];
};
