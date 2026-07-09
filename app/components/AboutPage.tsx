'use client'

import styled from 'styled-components'

// ── Layout ───────────────────────────────────────────────────────────────────

const Page = styled.div`
  min-height: 100vh;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
`

// ── Nav ──────────────────────────────────────────────────────────────────────

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 0;
`

const Logo = styled.div`
  font-family: 'DM Serif Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  font-size: 0.88rem;
  color: var(--color-text-secondary);

  a {
    transition: color 0.15s;
    &:hover { color: var(--color-text); }
  }

  a.active { color: var(--color-text); }
`

// ── Content ──────────────────────────────────────────────────────────────────

const Content = styled.div`
  max-width: 640px;
  margin: 5rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const PhotoWrap = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
  background: var(--color-border);
  flex-shrink: 0;
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const Name = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.4rem;
`

const Role = styled.p`
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
`

const Bio = styled.div`
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  text-align: left;

  p { margin-bottom: 1rem; }
  p:last-child { margin-bottom: 0; }
`

const LinkedInLink = styled.a`
  margin-top: 2.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.25rem;
  border: 1px solid var(--color-border-tag);
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: color 0.15s, border-color 0.15s, background 0.15s;

  &:hover {
    color: var(--color-text);
    border-color: var(--color-text-secondary);
    background: var(--color-border);
  }
`

// ── LinkedIn SVG ──────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  photoUrl?: string | null
  bio?: any[]
  linkedinUrl?: string | null
}

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g

function parseInline(text: string) {
  const parts: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  MARKDOWN_LINK.lastIndex = 0
  while ((match = MARKDOWN_LINK.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--color-text)', textDecoration: 'underline' }}>
        {match[1]}
      </a>
    )
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderBio(bio: any) {
  if (!bio) return null

  if (typeof bio === 'string') {
    return bio.split('\n').filter(Boolean).map((line, i) => (
      <p key={i}>{parseInline(line)}</p>
    ))
  }

  if (Array.isArray(bio)) {
    return bio.map((block: any, i: number) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map((c: any) => c.text).join('') || ''
        return <p key={i}>{parseInline(text)}</p>
      }
      return null
    })
  }

  return null
}

export default function AboutPage({ photoUrl, bio, linkedinUrl }: Props) {
  return (
    <Page>
      <Container>
        <Nav>
          <Logo as="a" href="/">TR</Logo>
          <NavLinks>
            <a href="/">Work</a>
            <a href="/about" className="active">About</a>
            <a href="https://drive.google.com/file/d/1LueQGAvWZq5VMAwAb3n4B4-rYMOkKen-/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
          </NavLinks>
        </Nav>

        <Content>
          {photoUrl && (
            <PhotoWrap>
              <Photo src={photoUrl} alt="Teron Russell" />
            </PhotoWrap>
          )}

          <Name>Teron Russell</Name>
          <Role>Product Designer · Chicago, IL</Role>

          {bio?.length > 0 && <Bio>{renderBio(bio)}</Bio>}

          {linkedinUrl && (
            <LinkedInLink href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              Connect on LinkedIn
            </LinkedInLink>
          )}
        </Content>
      </Container>
    </Page>
  )
}
