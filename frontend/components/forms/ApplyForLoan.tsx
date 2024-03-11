'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function ApplyForLoanForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = session?.user.email;

    const amount = formData.get('loanAmount');
    const collateralType = formData.get('collateralType');

    const response = await fetch(`http://localhost:5000/loans/apply`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        amount,
        collateral: collateralType,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: `Bearer ${session?.user.accessToken}`,
      },
    });

    if (response.ok) {
      router.push('/');
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='"max-w-sm mx-auto'>
      <span>Apply for a loan by providing collateral</span>
      <br />
      <input
        type="number"
        placeholder="Loand amount"
        id="loanAmount"
        name="loanAmount"
        className="p-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[10rem]"
      />
      <select id="collateralType" name="collateralType" className="mx-4">
        <option value="property">Property</option>
        <option value="vehicle">Vehicle</option>
        <option value="equity">Equity</option>
      </select>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        type="submit"
      >
        Apply
      </button>
    </form>
  );
}

export default ApplyForLoanForm;
