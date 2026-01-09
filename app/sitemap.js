import { products } from '@/data/products';

export default function sitemap() {
  const baseUrl = 'https://www.genzverse.shop';

  // 1. Static Pages with Explicit Priorities
  // We give the Homepage (1.0) and Collections (0.9) the highest priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  // 2. Product Pages with Smart Logic
  // - "isNew" items get 'daily' crawl frequency so Google indexes them fast.
  // - "isLimited" items get higher priority (0.9) to show up in search before they sell out.
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: product.isNew ? 'daily' : 'weekly',
    priority: product.isLimited ? 0.9 : 0.8,
  }));

  return [...staticPages, ...productUrls];
}