/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["mane-haghighi-bucket.storage.c2.liara.space", "www.google.com"],
  },
};

export default nextConfig;
