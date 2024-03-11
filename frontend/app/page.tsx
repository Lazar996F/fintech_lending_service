'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SupplyLiquidityForm from '@/components/forms/SupplyLiquidityForm';
import ApplyForLoanForm from '@/components/forms/ApplyForLoan';
import RepayLoanForm from '@/components/forms/RepayLoanForm';
import Dashboard from '@/components/dashboard/dashboard';

const HomePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();

  // const getUserData = async () => {
  //   const res = await fetch("http://localhost:5000/users", {
  //     method: "Get",
  //     headers: {
  //       authorization: `Bearer ${session?.user.accessToken}`,
  //     },
  //   });

  //   const response = await res.json();
  //   setPosts(response);
  // };

  return (
    <div className="p-8">
      <div className=" flex flex-col gap-8 items-center justify-center text-center">
        <Dashboard />
        <SupplyLiquidityForm />
        <ApplyForLoanForm />
        <RepayLoanForm />
        <div>Check their current earned fees</div>
        <span>$3333</span>
        <div>View outstanding debt</div>
        <span>$22</span>
      </div>
    </div>
  );
};

export default HomePage;
