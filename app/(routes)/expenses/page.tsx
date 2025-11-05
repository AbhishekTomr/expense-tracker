import ExpensesHeader from "@/components/budgets/ExpensesHeader";

function ExpensesPage() {
  const budgetId = null;
  return (
    <>
      <h2 className="text-2xl font-bold">All Expenses</h2>
      <ExpensesHeader budgetId={budgetId} />
    </>
  );
}

export default ExpensesPage;
