//Apply for a loan by providing collateral, such as property, vehicles, or equity

function ApplyForLoanForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Apply for loan');
    //
  };

  return (
    <form onSubmit={handleSubmit} className='"max-w-sm mx-auto'>
      <span>Apply for a loan by providing collateral</span>
      <br />
      <input type="number" id="loanAmount" name="loanAmount" />
      <select id="collateralType" name="collateralType">
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
