import createNextIntlPlugin from "next-intl/plugin"

import "./env.mjs"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default withNextIntl(nextConfig)
