import { resumeTechList, techIconMap } from '@/lib/shared/techMap';

describe('techMap data integrity', () => {
  describe('techIconMap', () => {
    it('has at least 20 entries', () => {
      expect(Object.keys(techIconMap).length).toBeGreaterThanOrEqual(20);
    });

    it('every value is a function (React component)', () => {
      for (const [_label, icon] of Object.entries(techIconMap)) {
        expect(typeof icon).toBe('function');
      }
    });
  });

  describe('resumeTechList', () => {
    it('has at least 20 entries', () => {
      expect(resumeTechList.length).toBeGreaterThanOrEqual(20);
    });

    it('every label exists in techIconMap', () => {
      const missing = resumeTechList.filter((label) => !(label in techIconMap));
      expect(missing).toEqual([]);
    });

    it('has no duplicates', () => {
      const unique = new Set(resumeTechList);
      expect(unique.size).toBe(resumeTechList.length);
    });
  });
});
