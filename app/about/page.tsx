import AboutPage from '../components/AboutPage'

export default async function About() {
  let data = null

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about?populate=*`, {
  cache: 'no-store',
})
    if (res.ok) {
      const json = await res.json()
      data = json.data || null
    }
  } catch (error) {
    console.error('Error fetching about data:', error)
  }

  const photoUrl = data?.photo?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${data.photo.url}` : null

  return (
    <AboutPage
      photoUrl={photoUrl}
      bio={data?.bio}
      linkedinUrl={data?.linkedinUrl}
    />
  )
}
