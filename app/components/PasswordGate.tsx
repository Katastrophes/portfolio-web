'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const Page = styled.div`
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
`

const Nav = styled.nav`
  max-width: 1200px;
  width: 100%;
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
  color: #fff;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.6);

  a {
    transition: color 0.15s;
    &:hover { color: #fff; }
  }
`

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  background: #e2e2e2;
  border-radius: 24px;
  padding: 2.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0d0d0d;
  margin-bottom: 0.15rem;
`

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 1rem;
`

const InputWrap = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 3rem 0.9rem 1.25rem;
  background: #fff;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #0d0d0d;
  outline: none;

  &::placeholder { color: #aaa; }
`

const EyeBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover { color: #333; }
`

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: #0d0d0d;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
  margin-top: 0.25rem;

  &:hover { opacity: 0.8; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`

const Error = styled.p`
  font-size: 0.82rem;
  color: #c0392b;
`

const ContactSection = styled.div`
  margin-top: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid #ccc;
`

const ContactText = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 0.25rem;
`

const ContactLink = styled.a`
  font-size: 0.95rem;
  color: #0d0d0d;
  text-decoration: underline;
  font-weight: 500;

  &:hover { opacity: 0.65; }
`

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

interface Props {
  slug: string
  title: string
}

export default function PasswordGate({ slug, title }: Props) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, password }),
    })

    if (res.ok) {
      router.refresh()
    } else {
      setError('Incorrect password. Try again.')
      setLoading(false)
    }
  }

  return (
    <Page>
      <Nav>
        <Logo as="a" href="/">TR</Logo>
        <NavLinks>
          <a href="/">Work</a>
          <a href="/about">About</a>
          <a href="https://drive.google.com/file/d/1LueQGAvWZq5VMAwAb3n4B4-rYMOkKen-/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
        </NavLinks>
      </Nav>
      <Center>
      <Card>
        <Title>Locked Content</Title>
        <Subtitle>Enter the password available on my resume.</Subtitle>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <InputWrap>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <EyeBtn type="button" onClick={() => setShowPassword(v => !v)} aria-label="Toggle password visibility">
              <EyeIcon open={showPassword} />
            </EyeBtn>
          </InputWrap>

          {error && <Error>{error}</Error>}

          <SubmitBtn type="submit" disabled={loading || !password}>
            {loading ? 'Checking…' : 'Unlock'}
          </SubmitBtn>
        </form>

        {linkedinUrl && (
          <ContactSection>
            <ContactText>Need access? Contact me through the following:</ContactText>
            <ContactLink href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</ContactLink>
          </ContactSection>
        )}
      </Card>
      </Center>
    </Page>
  )
}
