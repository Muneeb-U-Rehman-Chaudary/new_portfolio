export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://muneeb-portfolio.vercel.app/sitemap.xml',
    host: 'https://muneeb-portfolio.vercel.app',
  };
}
