import BudgetList from "@/components/budgets/BudgetList";

function BudgetPage() {
  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold">My Budgets</h1>
      <BudgetList />
    </div>
  );
}

export default BudgetPage;
