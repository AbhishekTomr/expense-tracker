import ExpensesHeader from "@/components/budgets/ExpensesHeader";
const BudgetDetailsPage = async ({
  params,
}: {
  params: Promise<{ budgetId: string }>;
}) => {
  const { budgetId } = await params;
  return (
    <>
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <ExpensesHeader budgetId={+budgetId} />
    </>
  );
};

export default BudgetDetailsPage;
