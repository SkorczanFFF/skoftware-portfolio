/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'gsap'],
  reactStrictMode: true,

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
