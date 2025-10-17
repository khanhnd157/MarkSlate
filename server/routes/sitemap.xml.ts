import { serverSupabaseClient } from '#supabase/server'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  // Fetch all published SEO pages
  const { data: seoPages } = await supabase
    .from('seo_pages')
    .select('slug, type, updated_at')
    .eq('published', true)
    .order('updated_at', { ascending: false })

  // Build sitemap URLs
  const urls = [
    {
      loc: 'https://slate.ink/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '1.0'
    }
  ]

  // Add SEO pages
  if (seoPages) {
    for (const page of seoPages) {
      urls.push({
        loc: `https://slate.ink/${page.type}/${page.slug}`,
        lastmod: new Date(page.updated_at).toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: page.type === 'create' ? '0.9' : '0.8'
      })
    }
  }

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Set proper headers
  event.node.res.setHeader('Content-Type', 'application/xml')
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600') // Cache for 1 hour

  return sitemap
})
