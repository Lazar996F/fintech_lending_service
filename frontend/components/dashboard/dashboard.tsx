'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getCurrencyFormat } from '@/config/helper-methods';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.user.email) {
      getUserDetails()
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [session, status]);

  const getUserDetails = async () => {
    return fetch(`http://localhost:5000/users/user/${session?.user.email}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
  };

  return (
    <>
      {session ? (
        <>
          <div className="flex flex-row w-full justify-between px-16">
            <div className="flex flex-col text-left">
              <span className="font-semibold">Balance</span>
              <span className="text-black font-sans font-normal text-[2.7rem]">
                {getCurrencyFormat(userData?.financialDetails?.balance)}
              </span>
            </div>
            <div className="flex flex-col text-right gap-8">
              <div>
                <span className="text-[1.4rem]">Current earned fees</span>
                <h3 className="text-[2rem]">
                  {getCurrencyFormat(
                    userData?.financialDetails?.totalEarnedFees,
                  )}
                </h3>
              </div>
              <div>
                <span className="text-[1.4rem]">Outstanding debt</span>
                <h3 className="text-[2rem]">
                  {getCurrencyFormat(
                    userData?.financialDetails?.outstandingDebt,
                  )}
                </h3>
              </div>
            </div>
          </div>
          <Link
            href="/loans"
            className="hover:underline text-[2.7rem] text-blue-800 font-semibold"
          >
            Loans &#8594;
          </Link>
        </>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Dashboard;
