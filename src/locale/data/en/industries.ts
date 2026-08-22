import type { IndustryEntry } from '@/locale/types';

export const industries: IndustryEntry[] = [
  {
    icon: 'Users',
    title: 'Healthcare, congresses & events',
    description:
      'Systems that have to work on the day of the event — because there is no second run.',
    proof: [
      'attendee zones',
      'VoD platform',
      'attendance scanning on Zebra terminals and kiosks',
      'live voting with real-time results',
      'virtual exhibitor booths',
      'on-site IT support',
    ],
  },
  {
    icon: 'Link',
    title: 'Web3 & blockchain',
    description:
      'Smart-contract integrations — where a mistake costs real money.',
    proof: [
      'NFT marketplace',
      'L1 ↔ L2 bridging (ImmutableX)',
      'on-chain auction system',
      'account-to-account transfers',
    ],
  },
  {
    icon: 'Document',
    title: 'AI & document processing',
    description:
      'Language models wired into a product — locally on your hardware or in the cloud.',
    proof: [
      'OCR pipelines for scans and documents',
      'local LLMs with CUDA acceleration',
      'text, table and image extraction to Markdown, HTML or JSON',
    ],
  },
];
