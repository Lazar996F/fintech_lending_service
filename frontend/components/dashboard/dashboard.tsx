'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  console.log({ session });
  return (
    <>
      {session ? (
        <div className="flex flex-col gap-16">
          <Link href="/loans" className="hover:underline text-lg">
            Loans &#8594;
          </Link>
          <div className="">
            <h3>Balance: {session?.user.financialDetails.balance}</h3>
            <h3>
              Current earned fees:{' '}
              {session?.user.financialDetails.totalEarnedFees}
            </h3>
            <h3>
              Outstanding debt: {session?.user.financialDetails.outstandingDebt}
            </h3>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Dashboard;
