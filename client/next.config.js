require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  }
}
module.exports = nextConfig
