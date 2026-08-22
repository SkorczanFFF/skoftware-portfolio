import type { IndustryEntry } from '@/locale/types';

export const industries: IndustryEntry[] = [
  {
    icon: 'Users',
    title: 'Medycyna, kongresy i eventy',
    description:
      'Systemy, które muszą zadziałać w dniu wydarzenia — bo drugiej szansy nie ma.',
    proof: [
      'strefy uczestnika',
      'platforma VoD',
      'rejestracja obecności na kolektorach Zebra i kioskach',
      'głosowanie live z wynikami na żywo',
      'wirtualne stoiska wystawców',
      'wsparcie IT na miejscu',
    ],
  },
  {
    icon: 'Link',
    title: 'Web3 i blockchain',
    description:
      'Integracje ze smart kontraktami — tam, gdzie błąd kosztuje realne pieniądze.',
    proof: [
      'marketplace NFT',
      'mostkowanie L1 ↔ L2 (ImmutableX)',
      'system aukcji on-chain',
      'transfery między kontami',
    ],
  },
  {
    icon: 'Document',
    title: 'AI i przetwarzanie dokumentów',
    description:
      'Modele językowe wpięte w produkt — lokalnie na Twoim sprzęcie albo w chmurze.',
    proof: [
      'pipeline’y OCR dla skanów i dokumentów',
      'lokalne modele LLM z akceleracją CUDA',
      'ekstrakcja tekstu, tabel i obrazów do Markdown, HTML lub JSON',
    ],
  },
];
