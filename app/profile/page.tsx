'use client'

import { withAuth } from '../../components/withAuth'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Alert } from '../../components/Alert'

function ProfilePage() {
  const { data: session } = useSession()
  const [name, setName] = useState(session?.user?.name || '')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (response.ok) {
        setMessage('Profile updated successfully')
      } else {
        setMessage('Failed to update profile')
      }
    } catch (error) {
      setMessage('An error occurred')
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      {message && <Alert message={message} type={message.includes('successfully') ? 'success' : 'error'} />}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  )
}

export default withAuth(ProfilePage)