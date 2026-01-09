

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent Google from indexing pages that don't have public content
      disallow: ['/cart', '/checkout', '/admin', '/private'],
    },
    sitemap: 'https://www.genzverse.shop/sitemap.xml',
  }
}