'use client';

import { withAuth } from '@/components/withAuth';

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}

export default withAuth(DashboardPage);