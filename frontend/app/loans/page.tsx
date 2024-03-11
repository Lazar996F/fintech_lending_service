'use client';
import SupplyLiquidityForm from '@/components/forms/SupplyLiquidityForm';
import ApplyForLoanForm from '@/components/forms/ApplyForLoan';
import RepayLoanForm from '@/components/forms/RepayLoanForm';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LoansPage() {
  const { data: session } = useSession();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    getLoans().then((data) => setLoans(data));
  }, []);

  const getLoans = async () => {
    const res = await fetch('http://localhost:5000/loans', {
      method: 'Get',
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    return res.json();
  };

  return (
    <div className="p-10">
      <div className="flex flex-row justify-between mb-8">
        <SupplyLiquidityForm />
        <ApplyForLoanForm />
        <RepayLoanForm />
      </div>
      <h3>Loans</h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loanItem: any, i) => (
            <tr key={i} className="">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap"
              >
                {loanItem.status}
              </th>
              <td className="px-6 py-4">{loanItem.type}</td>
              <td className="px-6 py-4">${loanItem.amount}</td>
              <td className="px-6 py-4">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Withdraw
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
