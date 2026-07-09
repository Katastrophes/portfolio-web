'use client'

import styled, { keyframes } from 'styled-components'
import { useState, useEffect, useRef } from 'react'

const WORDS = [
  { text: 'thoughtful experiences.', color: '#3EFAE7' },
  { text: 'scalable systems.', color: '#EA2EFF' },
  { text: 'impactful products.', color: '#FFD84D' },
  { text: 'intuitive solutions.', color: '#B8FF5A' },
]

const CARD_COLORS = ['#3d5c45', '#2d2d6b', '#1e6b7a', '#5c3d3d']


const exitUp = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-14px); }
`

const enterUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ── Layout ───────────────────────────────────────────────────────────────────

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

// ── Hero ─────────────────────────────────────────────────────────────────────

const Hero = styled.section`
  padding: 5rem 0 4.5rem;
  max-width: 100%;
`

const HeroGreeting = styled.p`
  font-size: 2.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.25rem;
`

const HeroHeading = styled.h1`
  font-size: 2.1rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--color-text);
`

const CyclerWrapper = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: bottom;
`

const CyclerWord = styled.span<{ $isEntering: boolean }>`
  display: inline-block;
  animation: ${({ $isEntering }) => ($isEntering ? enterUp : exitUp)} 0.35s ease forwards;
`

// ── Work ─────────────────────────────────────────────────────────────────────

const WorkSection = styled.section`
  padding-bottom: 6rem;
`

const SectionLabel = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--color-text);
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`


const StudyImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 16px;
`

const StudyRow = styled.a`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 4rem;
  padding: 3.5rem 0;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  cursor: pointer;
  &:last-child { border-bottom: none; }
  &:hover ${StudyImageOverlay} { opacity: 1; }
`

const StudyLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const StudyCompany = styled.p`
  font-size: 1.0rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
`

const StudyTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
`

const TagRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`

const Tag = styled.span`
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--color-border-tag);
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
`

const StudyDesc = styled.p`
  font-size: 1.0rem;
  line-height: 1.65;
  color: var(--color-text-muted);
`

const StudyImageArea = styled.div<{ $bg: string }>`
  position: relative;
  background-color: ${({ $bg }) => $bg};
  border-radius: 16px;
  overflow: hidden;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 8px;
  }
`

// ── Scroll Nav ───────────────────────────────────────────────────────────────

const ScrollNav = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  z-index: 100;
`

const ScrollDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => $active ? '12px' : '10px'};
  height: ${({ $active }) => $active ? '12px' : '10px'};
  border-radius: 50%;
  background: ${({ $active }) => $active ? 'var(--color-text)' : 'var(--color-text-subtle)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: center;

  &:hover { background: var(--color-text-secondary); }
`

// ── Component ────────────────────────────────────────────────────────────────

interface CaseStudy {
  id: number
  slug: string
  title: string
  company?: string
  description?: string
  cardColor?: string
  tags?: string[]
  heroImage?: { url: string }
}

export default function HomePage({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [index, setIndex] = useState(0)
  const [entering, setEntering] = useState(true)
  const [wordKey, setWordKey] = useState(0)
  const [activeStudy, setActiveStudy] = useState(0)
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const allStudies = caseStudies

  useEffect(() => {
    const interval = setInterval(() => {
      setEntering(false)
      setWordKey(k => k + 1)

      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length)
        setEntering(true)
        setWordKey(k => k + 1)
      }, 350)
    }, 2300)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStudy(i) },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [allStudies])

  const scrollToStudy = (i: number) => {
    rowRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const word = WORDS[index]

  return (
    <Container>
      <Nav>
        <Logo as="a" href="/">TR</Logo>
        <NavLinks>
          <a href="/" className="active">Work</a>
          <a href="/about">About</a>
          <a href="https://drive.google.com/file/d/1LueQGAvWZq5VMAwAb3n4B4-rYMOkKen-/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
        </NavLinks>
      </Nav>

      <Hero>
        <HeroGreeting>👋🏽 Hello,</HeroGreeting>
        <HeroHeading>
           I&apos;m Teron, a Chicago-based product designer with 7+ years of experience turning complex ideas into{' '}
          <CyclerWrapper>
            <CyclerWord key={wordKey} $isEntering={entering} style={{ color: word.color }}>
              {word.text}
            </CyclerWord>
          </CyclerWrapper>
        </HeroHeading>
      </Hero>

      <WorkSection>
        <SectionLabel>Selected work</SectionLabel>

        {allStudies.length > 1 && (
          <ScrollNav>
            {allStudies.map((_, i) => (
              <ScrollDot key={i} $active={i === activeStudy} onClick={() => scrollToStudy(i)} />
            ))}
          </ScrollNav>
        )}

        {allStudies.map((study, i) => {
          const bg = study.cardColor || CARD_COLORS[i % CARD_COLORS.length]
          const imageUrl = study.heroImage?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${study.heroImage.url}`
            : null

          return (
            <StudyRow key={study.id} href={`/portfolio/${study.slug}`} ref={el => { rowRefs.current[i] = el }}>
              <StudyLeft>
                <StudyCompany>{study.company}</StudyCompany>
                <StudyTitle>{study.title}</StudyTitle>
                <TagRow>
                  {study.tags?.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
                </TagRow>
                {study.description && <StudyDesc>{study.description}</StudyDesc>}
              </StudyLeft>

              <StudyImageArea $bg={bg}>
                <StudyImageOverlay>View Case Study</StudyImageOverlay>
                {imageUrl && <img src={imageUrl} alt={study.title} />}
              </StudyImageArea>
            </StudyRow>
          )
        })}
      </WorkSection>

    </Container>
  )
}
