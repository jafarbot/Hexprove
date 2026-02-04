/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // Brand misspelling redirects - capture common search variations
      {
        source: '/hex-proof',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hexproof',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hex-prove',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hexpoof',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
