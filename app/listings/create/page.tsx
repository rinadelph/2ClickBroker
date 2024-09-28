'use client'

import { withAuth } from '../../../components/withAuth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert } from '../../../components/Alert'

function CreateListingPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/listings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price: parseFloat(price), location }),
      })
      if (response.ok) {
        setMessage('Listing created successfully')
        setTimeout(() => router.push('/dashboard'), 2000)
      } else {
        setMessage('Failed to create listing')
      }
    } catch (error) {
      setMessage('An error occurred')
    }
  }

  return (
    <div>
      <h1>Create Listing</h1>
      {message && <Alert message={message} type={message.includes('successfully') ? 'success' : 'error'} />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  )
}

export default withAuth(CreateListingPage)