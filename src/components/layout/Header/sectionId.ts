/** `/#services` → `services`, `/cv` → `cv` — the id the active-section tracker uses. */
export const sectionIdOf = (href: string) =>
  href.startsWith('/#') ? href.slice(2) : href.slice(1);
