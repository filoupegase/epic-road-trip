// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    trailingSlash: true,
    productionBrowserSourceMaps: true,
    compiler: {
        styledComponents: true,
    }
}

module.exports = nextConfig
