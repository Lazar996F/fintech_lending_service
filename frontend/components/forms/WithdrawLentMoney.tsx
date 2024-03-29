function WithdrawLentMoney() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Iznos koji korisnik želi da pozajmi:');
    // Withdraw lent money REQUEST
    // u listi pozajmica mocice da klikne withdraw lent money
};

  return (
    <form onSubmit={handleSubmit} className='"max-w-sm mx-auto'>
        <span>Initiate the process to withdraw lent money</span>
        <br/>
        <input
          type="number"
          placeholder='Amount'
          required
          className='p-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[10rem]'
        />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" type="submit">Supply</button>
    </form>
  );
}

export default WithdrawLentMoney;
