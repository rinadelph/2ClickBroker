import React from 'react';
import { useAuth } from '@/hooks/use-auth';

const AccountPage: React.FC = () => {
  const { session } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      {session ? (
        <div>
          <p>Email: {session.user?.email}</p>
          {/* Add account settings */}
        </div>
      ) : (
        <p>Please sign in to view your account.</p>
      )}
    </div>
  );
};

export default AccountPage;