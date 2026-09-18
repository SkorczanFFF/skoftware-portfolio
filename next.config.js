/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'gsap'],
  reactStrictMode: true,

  // Locale lives in the URL: `/` serves PL, `/en/*` serves EN. Detection is
  // off on purpose — predictable URLs for crawlers, no surprise redirects.
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    localeDetection: false,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/i,
      type: 'asset/source',
    });

    return config;
  },

  turbopack: {},
};

module.exports = nextConfig;
