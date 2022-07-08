/** @type {import('next').NextConfig} */

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_USER, DB_PASS, DB_HOST, DB_NAME
  },
  images: {
    domains: ['/public/userDefault.png'],
  }
}

// module.exports = nextConfig
module.exports = {
  devIndicators: {
    buildActivity: false
  }
}
