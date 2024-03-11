'use client';
import SupplyLiquidityForm from '@/components/forms/SupplyLiquidityForm';
import ApplyForLoanForm from '@/components/forms/ApplyForLoan';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ConfirmationModal from '@/components/modals/Confirmation';
import { useRouter } from 'next/navigation';

export default function LoansPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loans, setLoans] = useState([]);
  const [isOpenModalWithdraw, setIsOpenModalWithdraw] = useState(false);
  const [selectedLoanId, setSelectedLoadId] = useState({});
  const [isOpenRepayModal, setIsOpenRepayModal] = useState(false);
  const [enteredRepayAmount, setEnteredRepayAmount] = useState('');

  useEffect(() => {
    if (session?.user.email) {
      getLoans().then((data) =>
        setLoans(
          data.loans.filter(
            (loan: { status: string }) => loan.status != 'withdrawn',
          ),
        ),
      );
    }
  }, [status, session]);

  const getLoans = async () => {
    const res = await fetch(
      `http://localhost:5000/users/user/${session?.user.email}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
    return res.json();
  };

  const onRepayLoanSubmit = async () => {
    const response = await fetch(
      `http://localhost:5000/loans/repay/${selectedLoanId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          email: session?.user.email,
          repayAmount: enteredRepayAmount,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
  };

  const onSubmitLoanWithdrawn = async () => {
    const response = await fetch(
      `http://localhost:5000/loans/${selectedLoanId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          email: session?.user.email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
  };

  const onChangeRepayAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredRepayAmount(e.target.value);
  };

  if (status !== 'authenticated') return null;
  return (
    <div className="p-10">
      <div className="flex flex-row justify-between mb-8">
        <SupplyLiquidityForm />
        <ApplyForLoanForm />
      </div>
      <h3>Loans</h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {loans && loans.length ? (
            loans.map((loanItem: any, i) => (
              <tr key={i} className="">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap"
                >
                  {loanItem.status}
                </th>
                <td className="px-6 py-4">${loanItem.amount}</td>
                <td className="px-6 py-4">{loanItem.type}</td>
                <td className="px-6 py-4">
                  {loanItem.type === 'borrow' && (
                    <button
                      onClick={() => {
                        setIsOpenRepayModal(true);
                        setSelectedLoadId(loanItem.id);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Repay
                    </button>
                  )}
                  {loanItem.type === 'lend' && (
                    <button
                      onClick={() => {
                        setIsOpenModalWithdraw(true);
                        setSelectedLoadId(loanItem.id);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Withdraw
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
      <ConfirmationModal
        title="Withdraw Lent Loan"
        isOpen={isOpenModalWithdraw}
        onClose={() => setIsOpenModalWithdraw(false)}
        submit={() => onSubmitLoanWithdrawn().then(() => router.push('/'))}
        message="Are you sure you want to withdraw this loan? This action cannot be undone."
      />
      <ConfirmationModal
        title="Repaying Loan"
        isOpen={isOpenRepayModal}
        onClose={() => setIsOpenRepayModal(false)}
        submit={() => onRepayLoanSubmit().then(() => router.push('/'))}
      >
        <input
          type="number"
          placeholder="amount to repay"
          id="repayAmount"
          name="repayAmount"
          value={enteredRepayAmount}
          className="p-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[10rem]"
          onChange={onChangeRepayAmount}
        />
      </ConfirmationModal>
    </div>
  );
}
