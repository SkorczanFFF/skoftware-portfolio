import type { CommonStrings } from './common';
import type { CvStrings } from './cv';
import type { LegalStrings } from './legal';
import type { MarketingStrings } from './marketing';

export type { Locale } from './common';
export * from './entries';

/**
 * The full user-facing string contract. Flat by design — composed from
 * per-area groups (common chrome, marketing sections, `/cv`, legal) so a
 * missing or misplaced key still breaks the PL/EN literals at typecheck.
 * This barrel replaces the former single `types.ts`; `@/locale/types`
 * resolves here, so no importer changed.
 */
export type Dictionary = CommonStrings &
  MarketingStrings &
  CvStrings &
  LegalStrings;
