'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  cursor: zoom-out;
`

const ExpandedImg = styled.img`
  max-width: min(90vw, 1200px);
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
`

const CloseBtn = styled.button`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover { background: rgba(255, 255, 255, 0.2); }
`

interface Props {
  src: string
  alt?: string
  style?: React.CSSProperties
  className?: string
}

export default function LightboxImage({ src, alt, style, className }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <img
        src={src}
        alt={alt || ''}
        style={{ ...style, cursor: 'zoom-in' }}
        className={className}
        onClick={() => setOpen(true)}
      />
      {open && (
        <Overlay onClick={() => setOpen(false)}>
          <CloseBtn onClick={e => { e.stopPropagation(); setOpen(false) }}>✕</CloseBtn>
          <ExpandedImg src={src} alt={alt || ''} onClick={e => e.stopPropagation()} />
        </Overlay>
      )}
    </>
  )
}
