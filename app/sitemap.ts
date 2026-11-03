import type { MetadataRoute } from 'next';
import { SERVICES } from '@/content/services';
import { DISPATCH_ISSUES } from '@/content/dispatch';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://themechlab.com';
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/services`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/work`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/process`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/quote`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/dispatch`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/privacy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/thank-you`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const dispatchRoutes: MetadataRoute.Sitemap = DISPATCH_ISSUES.map((issue) => ({
    url: `${siteUrl}/dispatch/${issue.issueNumber}`,
    lastModified: issue.date,
    changeFrequency: 'never',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...dispatchRoutes];
}

