export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required'
  if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid'
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters long'
  return null
}

export function validateName(name: string): string | null {
  if (!name) return 'Name is required'
  if (name.length < 2) return 'Name must be at least 2 characters long'
  return null
}