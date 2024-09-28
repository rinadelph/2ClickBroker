'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { FaGoogle, FaGithub } from 'react-icons/fa'

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

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('signupEmail') as string
    const password = formData.get('signupPassword') as string

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        // Automatically sign in the user after successful registration
        await signIn('credentials', {
          redirect: false,
          email,
          password,
        })
        router.push('/dashboard')
      } else {
        const data = await response.json()
        setError(data.message || 'An error occurred during registration')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Welcome to 2ClickBroker
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          Your gateway to seamless real estate management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                  <Label htmlFor="signinEmail">Email address</Label>
                  <Input id="signinEmail" name="signinEmail" type="email" autoComplete="email" required />
                </div>
                <div>
                  <Label htmlFor="signinPassword">Password</Label>
                  <Input id="signinPassword" name="signinPassword" type="password" autoComplete="current-password" required />
                </div>
                <div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" type="text" autoComplete="name" required />
                </div>
                <div>
                  <Label htmlFor="signupEmail">Email address</Label>
                  <Input id="signupEmail" name="signupEmail" type="email" autoComplete="email" required />
                </div>
                <div>
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input id="signupPassword" name="signupPassword" type="password" autoComplete="new-password" required />
                </div>
                <div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Sign up"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => signIn('google')}
                className="w-full flex items-center justify-center"
              >
                <FaGoogle className="mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => signIn('github')}
                className="w-full flex items-center justify-center"
              >
                <FaGithub className="mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}