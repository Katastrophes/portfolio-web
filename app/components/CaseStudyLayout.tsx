'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'

// ── Page wrapper (covers dot pattern) ────────────────────────────────────────

const Page = styled.div`
  background-color: var(--color-bg);
  min-height: 100vh;
`

// ── Nav ──────────────────────────────────────────────────────────────────────

const NavBar = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.75rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`

// ── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = styled.div<{ $color: string }>`
  width: 100%;
  background: radial-gradient(ellipse 90% 90% at 50% 50%, ${({ $color }) => $color}cc 0%, transparent 70%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
`

const HeroImg = styled.img`
  width: 82%;
  max-width: 1060px;
  max-height: 60vh;
  object-fit: contain;
  object-position: bottom;
  border-radius: 16px;
  display: block;
`

// ── Body ─────────────────────────────────────────────────────────────────────

const Body = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2.5rem 0;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 4rem;
  align-items: start;
`

const Sidebar = styled.nav`
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const SidebarLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`

const AnchorLink = styled.a`
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  padding: 0.3rem 0.75rem;
  border-left: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
  &:hover {
    color: var(--color-text);
    border-left-color: var(--color-text-secondary);
  }
`

const Article = styled.article`
  color: var(--color-text-secondary);
  padding-bottom: 8rem;

  & > *:first-child,
  & > div:first-child > *:first-child {
    margin-top: 0 !important;
  }
`

// ── Back to top ───────────────────────────────────────────────────────────────

const BackToTop = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  background: var(--color-bg);
  border: 1px solid var(--color-border-tag);
  color: var(--color-text-secondary);
  font-size: 0.82rem;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 0.01em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 100;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: ${({ $visible }) => $visible ? 'auto' : 'none'};
  transition: opacity 0.2s ease, background 0.15s, color 0.15s;

  &:hover {
    background: var(--color-border);
    color: var(--color-text);
  }
`

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = styled.footer`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.78rem;
  color: var(--color-text-subtle);
`

// ── Component ─────────────────────────────────────────────────────────────────

interface Anchor {
  id: string
  label: string
}

interface Props {
  title: string
  company?: string
  role?: string
  cardColor?: string
  heroImageUrl?: string | null
  anchors: Anchor[]
  children: React.ReactNode
}

const DEFAULT_COLOR = '#3d5c45'

export default function CaseStudyLayout({ title, cardColor, heroImageUrl, anchors, children }: Props) {
  const color = cardColor || DEFAULT_COLOR
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Page>
      <NavBar>
        <Logo as="a" href="/">TR</Logo>
        <NavLinks>
          <a href="/">Work</a>
          <a href="/about">About</a>
          <a href="https://drive.google.com/file/d/1LueQGAvWZq5VMAwAb3n4B4-rYMOkKen-/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
        </NavLinks>
      </NavBar>

      {heroImageUrl && (
        <HeroSection $color={color}>
          <HeroImg src={heroImageUrl} alt={title} />
        </HeroSection>
      )}

      <Body>
        {anchors.length > 0 && (
          <Sidebar>
            <SidebarLabel>On this page</SidebarLabel>
            {anchors.map(({ id, label }) => (
              <AnchorLink key={id} href={`#${id}`}>{label}</AnchorLink>
            ))}
          </Sidebar>
        )}

        <Article>{children}</Article>
      </Body>

      <Footer>© 2026 Teron Russell</Footer>
      <BackToTop $visible={showTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Back to top</BackToTop>
    </Page>
  )
}
