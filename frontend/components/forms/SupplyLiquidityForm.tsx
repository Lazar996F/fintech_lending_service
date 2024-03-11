'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function SupplyLiquidityForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = session?.user.email;

    const amount = formData.get('amount');
    const response = await fetch(
      `http://localhost:5000/users/supply-liquidity`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          amount,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

    if (response.ok) {
      router.push('/');
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='"max-w-sm mx-auto'>
      <span>Supply the firm with liquidity</span>
      <br />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        required
        className="p-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[10rem]"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        type="submit"
      >
        Supply
      </button>
    </form>
  );
}

export default SupplyLiquidityForm;
