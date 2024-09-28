'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert } from './Alert'
import { validateEmail, validatePassword, validateName } from '../utils/validation'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (nameError || emailError || passwordError) {
      setError(nameError || emailError || passwordError || 'Invalid input')
      return
    }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    if (response.ok) {
      setSuccess('Account created successfully. Redirecting to sign in...')
      setTimeout(() => router.push('/signin'), 2000)
    } else {
      const data = await response.json()
      setError(data.error || 'An error occurred during sign up')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}