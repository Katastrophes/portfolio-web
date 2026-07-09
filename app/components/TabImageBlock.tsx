'use client'

import { useState } from 'react'
import styled from 'styled-components'
import LightboxImage from './LightboxImage'

const Wrapper = styled.div`
  margin: 2rem 0;
`

const TabList = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
`

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  background: ${({ $active }) => $active ? 'var(--color-border)' : 'none'};
  border: 1px solid ${({ $active }) => $active ? 'var(--color-border-tag)' : 'var(--color-border)'};
  color: ${({ $active }) => $active ? 'var(--color-text)' : 'var(--color-text-muted)'};
  border-radius: 6px;
  padding: 0.4rem 0.85rem;
  cursor: pointer;
  font-size: 0.82rem;
  font-family: inherit;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    color: var(--color-text);
    border-color: var(--color-border-tag);
  }
`

const ImageWrap = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
`

const Img = styled(LightboxImage)`
  width: 100%;
  display: block;
`

const Caption = styled.p`
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
`

interface Tab {
  label: string
  image: { url: string; alternativeText?: string } | null
}

interface Props {
  tabs: Tab[]
  caption?: string | null
}

export default function TabImageBlock({ tabs, caption }: Props) {
  const [active, setActive] = useState(0)

  if (!tabs?.length) return null

  const current = tabs[active]

  return (
    <Wrapper>
      {tabs.length > 1 && (
        <TabList>
          {tabs.map((tab, i) => (
            <Tab key={i} $active={i === active} onClick={() => setActive(i)}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
      )}
      {current.image && (
        <ImageWrap>
          <Img
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${current.image.url}`}
            alt={current.image.alternativeText || current.label}
          />
        </ImageWrap>
      )}
      {caption && <Caption>{caption}</Caption>}
    </Wrapper>
  )
}
