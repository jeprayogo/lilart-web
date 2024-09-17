/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'id'],
        defaultLocale: 'en',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flowbite.com',
                port: '',
                pathname: '/docs/images/**',
            },
        ],
    },
};

export default nextConfig;