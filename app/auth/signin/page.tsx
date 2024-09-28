'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/'

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('signinEmail') as string
    const password = formData.get('signinPassword') as string

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push(callbackUrl)
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // ... (keep the rest of the component code)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        {/* ... (keep the existing JSX) */}
      </div>
    </div>
  )
}