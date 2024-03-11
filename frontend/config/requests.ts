export interface Loan {
  id: number;
  amount: number;
  type: 'lend' | 'borrow';
  status: 'active' | 'pending' | 'completed' | 'withdrawn';
}

interface ResponseData {
  loans: Loan[];
}

export const getLoans = async ({
  accessToken,
  userEmail,
}: {
  accessToken: string;
  userEmail: string;
}): Promise<Loan[]> => {
  const res = await fetch(`http://localhost:5000/users/user/${userEmail}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const resData: ResponseData = await res.json();

  return resData.loans.filter((loan: Loan) => loan.status !== 'withdrawn');
};
