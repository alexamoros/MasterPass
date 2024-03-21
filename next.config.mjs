import createNextIntlPlugin from "next-intl/plugin"

import "./env.mjs"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This wildcard allows all domains
      },
    ],
  },
}

export default withNextIntl(nextConfig)
