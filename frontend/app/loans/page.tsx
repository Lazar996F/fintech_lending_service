'use client';
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
  const [isOpenSupplyForm, setIsOpenSupplyForm] = useState(false);
  const [enteredSupplyAmount, setEnteredSupplyAmount] = useState('');
  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);
  const [enteredApplyForm, setEnteredApplyForm] = useState({
    amount: 0,
    collateral: '',
  });

  useEffect(() => {
    if (session?.user.email) {
      getLoans().then((data) => setLoans(data));
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

    const resData = await res.json();

    return resData.loans.filter(
      (loan: { status: string }) => loan.status != 'withdrawn',
    );
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

  const onChangeSupplyAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSupplyAmount(e.target.value);
  };

  const onSupplySubmit = async () => {
    const email = session?.user.email;
    const response = await fetch(
      `http://localhost:5000/users/supply-liquidity`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          amount: enteredSupplyAmount,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );

    if (response.ok) {
      const data = await getLoans();
      setLoans(data);
      setIsOpenSupplyForm(false);
    }
  };

  const handleApplyFormChange = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    const formData = new FormData(event.currentTarget);
    const amount = formData.get('loanAmount');
    const collateralType = formData.get('collateralType');

    setEnteredApplyForm({
      amount: Number(amount),
      collateral: String(collateralType),
    });
  };

  const onApplyFormSubmit = async () => {
    const { amount, collateral } = enteredApplyForm;

    const response = await fetch(`http://localhost:5000/loans/apply`, {
      method: 'POST',
      body: JSON.stringify({
        email: session?.user.email,
        amount: amount,
        collateral: collateral,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: `Bearer ${session?.user.accessToken}`,
      },
    });

    if (response.ok) {
      const updatedLoans = await getLoans();
      setLoans(updatedLoans);
      setIsOpenApplyModal(false);
    }
  };

  if (status !== 'authenticated') return null;
  return (
    <div className="p-10">
      <div className="flex flex-row justify-around mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
          onClick={() => setIsOpenSupplyForm(true)}
        >
          Supply
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          type="submit"
          onClick={() => setIsOpenApplyModal(true)}
        >
          Apply
        </button>
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
      <ConfirmationModal
        isOpen={isOpenSupplyForm}
        onClose={() => setIsOpenSupplyForm(false)}
        submit={() => onSupplySubmit()}
        title="Supply the firm with liquidity."
      >
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={enteredSupplyAmount}
          onChange={onChangeSupplyAmount}
          required
          className="p-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[10rem]"
        />
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={isOpenApplyModal}
        onClose={() => setIsOpenApplyModal(false)}
        submit={() =>
          onApplyFormSubmit().then(() => setIsOpenApplyModal(false))
        }
        title="Apply for a loan by providing collateral"
      >
        <form
          className="flex flex-row items-center justify-evenly"
          onChange={handleApplyFormChange}
        >
          <input
            type="number"
            placeholder="Amount"
            id="loanAmount"
            name="loanAmount"
            className="p-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[10rem]"
          />
          <select id="collateralType" name="collateralType" className="mx-4">
            <option value="property">Property</option>
            <option value="vehicle">Vehicle</option>
            <option value="equity">Equity</option>
          </select>
        </form>
      </ConfirmationModal>
    </div>
  );
}
