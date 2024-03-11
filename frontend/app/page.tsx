'use client';
import Dashboard from '@/components/dashboard/dashboard';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  const { status } = useSession();

  return (
    <div className="p-8">
      <div className=" flex flex-col gap-8 items-center justify-center text-center">
        {status === 'authenticated' && <Dashboard />}
      </div>
    </div>
  );
};

export default HomePage;
