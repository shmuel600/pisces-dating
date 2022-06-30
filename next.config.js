/** @type {import('next').NextConfig} */

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_USER, DB_PASS, DB_HOST, DB_NAME
  }
}

module.exports = nextConfig
