import type { MetadataRoute } from 'next'

const BASE_URL = 'https://teronrussell.com'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/case-studies?fields[0]=slug&fields[1]=updatedAt&fields[2]=isLocked&sort=order:asc`,
      { cache: 'no-store' }
    )

    if (res.ok) {
      const json = await res.json()
      const studies = (json.data || []).filter((s: any) => !s.isLocked)

      const studyRoutes: MetadataRoute.Sitemap = studies.map((study: any) => ({
        url: `${BASE_URL}/portfolio/${study.slug}`,
        lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      }))

      return [...staticRoutes, ...studyRoutes]
    }
  } catch (e) {
    // fall through to static routes only
  }

  return staticRoutes
}
