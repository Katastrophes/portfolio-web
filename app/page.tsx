import HomePage from './components/HomePage'

export default async function Home() {
  let caseStudies = []

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/case-studies?populate=*&sort=order:asc`, {
  cache: 'no-store',
})

    if (res.ok) {
      const json = await res.json()
      caseStudies = json.data || []
    }
  } catch (error) {
    console.error('Error fetching case studies:', error)
  }

  return <HomePage caseStudies={caseStudies} />
}
