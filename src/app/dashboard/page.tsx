import React from 'react';
import { useAuth } from '@/hooks/use-auth';

const DashboardPage: React.FC = () => {
  const { session } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          {/* Add dashboard content */}
        </div>
      ) : (
        <p>Please sign in to view your dashboard.</p>
      )}
    </div>
  );
};

export default DashboardPage;