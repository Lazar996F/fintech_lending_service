'use client';
import Dashboard from '@/components/dashboard/dashboard';

const HomePage = () => {
  return (
    <div className="p-8">
      <div className=" flex flex-col gap-8 items-center justify-center text-center">
        <Dashboard />
      </div>
    </div>
  );
};

export default HomePage;
