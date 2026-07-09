import CaseStudyLayout from '../../components/CaseStudyLayout'
import SliderComponent from '../../components/SliderComponent'
import TabImageBlock from '../../components/TabImageBlock'
import LightboxImage from '../../components/LightboxImage'

async function getCaseStudy(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/case-studies?filters[slug][$eq]=${slug}&populate[heroImage]=true&populate[content][on][blocks.text-block][populate]=*&populate[content][on][blocks.image-block][populate]=*&populate[content][on][blocks.multi-image-block][populate][tabs][populate]=*`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  const json = await res.json()
  return json.data?.[0] || null
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function renderInline(children: any[]) {
  return children?.map((child: any, i: number) => {
    let node: React.ReactNode = child.text
    if (child.bold)      node = <strong key={i}>{node}</strong>
    if (child.italic)    node = <em key={i}>{node}</em>
    if (child.underline) node = <u key={i}>{node}</u>
    if (child.code)      node = <code key={i}>{node}</code>
    if (!child.bold && !child.italic && !child.underline && !child.code) return <span key={i}>{child.text}</span>
    return node
  })
}

function renderRichText(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) return null

  return blocks.map((block, i) => {
    if (block.type === 'heading') {
      const Tag = `h${block.level}` as any
      const plainText = block.children?.map((c: any) => c.text).join('') || ''
      const id = block.level === 2 ? slugify(plainText) : undefined
      const headingStyles: Record<number, React.CSSProperties> = {
        2: { fontSize: '1.35rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '0.75rem', color: '#fff' },
        3: { fontSize: '1.1rem',  fontWeight: 600, marginTop: '2rem',   marginBottom: '0.6rem',  color: '#fff' },
        4: { fontSize: '0.92rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem',  color: '#fff' },
        5: { fontSize: '0.85rem', fontWeight: 500, marginTop: '1.25rem', marginBottom: '0.4rem', color: 'var(--color-text-secondary)' },
        6: { fontSize: '0.78rem', fontWeight: 500, marginTop: '1rem',   marginBottom: '0.35rem', color: 'var(--color-text-muted)' },
      }
      const style = headingStyles[block.level] ?? headingStyles[3]
      return <Tag key={i} id={id} style={style}>{renderInline(block.children)}</Tag>
    }

    if (block.type === 'paragraph') {
      return <p key={i} style={{ marginBottom: '1rem', lineHeight: '1.7', fontSize: '0.95rem' }}>{renderInline(block.children)}</p>
    }

    if (block.type === 'list') {
      const Tag = block.format === 'ordered' ? 'ol' : 'ul'
      return (
        <Tag key={i} style={{ marginBottom: '1rem', marginLeft: '1.5rem', lineHeight: '1.7', fontSize: '0.95rem' }}>
          {block.children?.map((item: any, j: number) => (
            <li key={j}>{renderInline(item.children)}</li>
          ))}
        </Tag>
      )
    }

    return null
  })
}

function renderBlocks(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) return null

  return blocks.map((block, i) => {
    if (block.__component === 'blocks.text-block') {
      return <div key={i}>{renderRichText(block.content)}</div>
    }

    if (block.__component === 'blocks.image-block') {
      if (!block.image?.url) return null
      const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${block.image.url}`
      return (
        <figure key={i} style={{ margin: '2rem 0' }}>
          <LightboxImage src={imageUrl} alt={block.caption || ''} style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
          {block.caption && (
            <figcaption style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    if (block.__component === 'blocks.slider-block') {
      return <SliderComponent key={i} slides={block.slides} />
    }

    if (block.__component === 'blocks.multi-image-block') {
      return <TabImageBlock key={i} tabs={block.tabs || []} caption={block.caption} />
    }

    return null
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getCaseStudy(slug)

  if (!study) {
    return <div style={{ padding: '2rem' }}>Case study not found</div>
  }

  const blocks = study.content || []
  const heroImageUrl = study.heroImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${study.heroImage.url}` : null

  const anchors = blocks
    .filter((b: any) => b.__component === 'blocks.text-block')
    .flatMap((b: any) => b.content || [])
    .filter((b: any) => b.type === 'heading' && b.level === 2)
    .map((b: any) => {
      const text = b.children?.map((c: any) => c.text).join('') || ''
      return { id: slugify(text), label: text }
    })

  return (
    <CaseStudyLayout
      title={study.title}
      company={study.company}
      role={study.role}
      cardColor={study.cardColor}
      heroImageUrl={heroImageUrl}
      anchors={anchors}
    >
      {renderBlocks(blocks)}
    </CaseStudyLayout>
  )
}
