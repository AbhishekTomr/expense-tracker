"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import _ from "lodash";
import LoadingWrapper from "@/components/wrappers/LoadingWrapper";
import { getAllBugets } from "@/actions/expense";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { user } = useUser();
  const [budgets, setBugets] = useState<any[] | null>(null);

  useEffect(() => {
    getAllBugets(user?.primaryEmailAddress?.emailAddress as string).then(
      (budgets) => {
        setBugets(budgets);
      }
    );
  }, [user]);

  return (
    <div className="h-full">
      <LoadingWrapper isLoading={budgets === null}>
        {budgets?.length ? (
          <>Budgets Page</>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-[18px] font-semibold text-primary text-center">
            <Lock className="my-5 size-10 font-bold" />
            <h2>
              You have not created any budget yet !!
              <br /> Please go to budgets to create a budget and get started
            </h2>
            <Button asChild className="my-5 w-[150px] p-5">
              <Link href={"/budgets"}>Create a budget</Link>
            </Button>
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
};

export default DashboardPage;
