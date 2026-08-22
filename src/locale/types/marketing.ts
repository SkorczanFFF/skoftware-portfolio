import type {
  FaqItem,
  IndustryEntry,
  ProcessStep,
  ProjectEntry,
  ServiceEntry,
} from './entries';

/**
 * Landing-page sections: hero, services, tech strip, industries, why-me,
 * process, FAQ and the portfolio grid.
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

  portfolioTitle: string;
  portfolioRepo: string;
  portfolioLiveDemo: string;
  projects: ProjectEntry[];
};
