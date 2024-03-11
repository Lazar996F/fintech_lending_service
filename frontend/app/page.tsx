'use client';
import Dashboard from '@/components/dashboard/dashboard';
import { signIn, useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/LoadingSpinner';

const HomePage = () => {
  const { status } = useSession();

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div className="p-8 text-center">
      {status !== 'authenticated' && (
        <>
          <h2 className="text-[1.8rem] text-gray-600 mt-8">
            Welcome to our fintech lending service!
            <br /> We offer innovative solutions for lending and borrowing money
            securely and conveniently.
          </h2>
          <button
            className="mt-12 px-2 h-[40px] inline-flex items-center font-semibold text-[2.7rem] rounded-lg border border-transparent text-blue-600  hover:text-blue-800 hover:font-bold hover:shadow-md"
            onClick={() => signIn()}
          >
            Sign Up
          </button>
        </>
      )}
      <div className=" flex flex-col gap-8 items-center justify-center text-center">
        {status === 'authenticated' && <Dashboard />}
      </div>
    </div>
  );
};

export default HomePage;
