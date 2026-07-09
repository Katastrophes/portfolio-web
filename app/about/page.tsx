import AboutPage from '../components/AboutPage'

export default async function About() {
  let data = null

  try {
    const res = await fetch('http://localhost:1337/api/about?populate=*', {
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      data = json.data || null
    }
  } catch (error) {
    console.error('Error fetching about data:', error)
  }

  const photoUrl = data?.photo?.url ? `http://localhost:1337${data.photo.url}` : null

  return (
    <AboutPage
      photoUrl={photoUrl}
      bio={data?.bio}
      linkedinUrl={data?.linkedinUrl}
    />
  )
}
