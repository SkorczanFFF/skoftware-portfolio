export type Locale = 'en' | 'pl';

/**
 * Site chrome present on every page: SEO metadata, 404, navigation, footer
 * and the contact block.
 */
export type CommonStrings = {
  seoTitle: string;
  seoSiteName: string;
  seoDescription: string;

  notFoundTitle: string;
  notFoundBack: string;

  navHome: string;
  navPortfolio: string;
  navContact: string;
  navResume: string;
  toggleMenu: string;
  navMenuLabel: string;
  navServices: string;

  footerCopyright: string;
  footerResume: string;
  footerResumeOnline: string;
  footerResumeDownload: string;
  footerHeading: string;
  footerNarrative: string;
  footerDirectLabel: string;
  footerNetworkLabel: string;
  footerInvoiceNote: string;

  contactPhone: string;
  contactEmail: string;
  contactCompanyInfo: string;
  contactLocation: string;
  contactInvoiceInfo: string;
};
