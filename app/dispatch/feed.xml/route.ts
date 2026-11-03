import { NextResponse } from 'next/server';
import { DISPATCH_ISSUES } from '@/content/dispatch';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://themechlab.com';

  const itemsXml = DISPATCH_ISSUES.map((issue) => {
    const itemUrl = `${siteUrl}/dispatch/${issue.issueNumber}`;
    const pubDate = new Date(issue.date).toUTCString();

    return `
    <item>
      <title><![CDATA[Issue ${issue.issueNumber}: ${issue.title}]]></title>
      <link>${itemUrl}</link>
      <guid>${itemUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${issue.summary}]]></description>
    </item>
    `.trim();
  }).join('\n');

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The MechLab Dispatch</title>
    <link>${siteUrl}/dispatch</link>
    <description>Notes from the design desk: Design for Manufacture, GD&amp;T fundamentals, and mechanical prototyping bulletins.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/dispatch/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(feedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

