import type { A11yStrings } from './a11y';
import type { CommonStrings } from './common';
import type { CvStrings } from './cv';
import type { LegalStrings } from './legal';
import type { MarketingStrings } from './marketing';

export type { Locale } from './common';
export * from './entries';

/**
 * The full user-facing string contract. Flat by design — composed from
 * per-area groups so a missing or misplaced key breaks the PL/EN literals
 * at typecheck.
 */
export type Dictionary = CommonStrings &
  MarketingStrings &
  CvStrings &
  LegalStrings &
  A11yStrings;
