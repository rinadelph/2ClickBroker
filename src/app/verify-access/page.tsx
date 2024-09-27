import { useSession } from 'next-auth/react';

export default function VerifyAccessPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to access this page.</div>;
  }

  return <div>Access verified. Welcome, {session.user?.name}!</div>;
}