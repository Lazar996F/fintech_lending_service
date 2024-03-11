import React, { useState } from 'react';

const RepayLoanForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');

  const handleRepayLoan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implementacija logike za vraćanje kredita
    console.log('Repay loan', amount);
  };

  return (
    <form onSubmit={handleRepayLoan}>
      <span>Repay loan</span>
      <br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        placeholder="Repay amount"
        className="p-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[10rem]"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        type="submit"
      >
        Repay loan
      </button>
    </form>
  );
};

export default RepayLoanForm;
