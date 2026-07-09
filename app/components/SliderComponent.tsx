'use client'

import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
`

const SlideImg = styled.img`
  width: 100%;
  display: block;
`

const SlideCaption = styled.p`
  padding: 0.6rem 1rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  border-top: 1px solid var(--color-border);
`

const NavBtn = styled.button`
  background: none;
  border: 1px solid var(--color-border-tag);
  color: var(--color-text);
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: 0.82rem;
  font-family: inherit;
  transition: background 0.15s;

  &:hover { background: var(--color-border); }
  &:disabled { opacity: 0.3; cursor: default; }
`

const Counter = styled.span`
  font-size: 0.8rem;
  color: var(--color-text-muted);
`

interface Slide {
  image: { url: string }
  caption?: string
}

export default function SliderComponent({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0)

  if (!slides?.length) return null

  const slide = slides[current]

  return (
    <Wrapper>
      <SlideImg
        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.image.url}`}
        alt={slide.caption || `Slide ${current + 1}`}
      />
      {slide.caption && <SlideCaption>{slide.caption}</SlideCaption>}
      {slides.length > 1 && (
        <Controls>
          <NavBtn onClick={() => setCurrent(c => c - 1)} disabled={current === 0}>← Prev</NavBtn>
          <Counter>{current + 1} / {slides.length}</Counter>
          <NavBtn onClick={() => setCurrent(c => c + 1)} disabled={current === slides.length - 1}>Next →</NavBtn>
        </Controls>
      )}
    </Wrapper>
  )
}
