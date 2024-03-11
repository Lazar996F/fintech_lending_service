'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

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
        <div className="flex flex-col gap-16">
          <Link href="/loans" className="hover:underline text-lg">
            Loans &#8594;
          </Link>
          <div className="">
            <h3>Balance: {userData?.financialDetails?.balance}</h3>
            <h3>
              Current earned fees: {userData?.financialDetails?.totalEarnedFees}
            </h3>
            <h3>
              Outstanding debt: {userData?.financialDetails?.outstandingDebt}
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
