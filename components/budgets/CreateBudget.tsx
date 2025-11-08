"use client";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import EmojiPicker from "../common/EmojiPicker";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { IBudget, IBudgetItem } from "@/lib";
import _ from "lodash";
import { useUser } from "@clerk/nextjs";
import { createBudget } from "@/actions/expense";
import { toast } from "sonner";

const initialBudgetVal = {
  "budget-name": "",
  "budget-amount": "",
  emoji: "🙂",
  createdBy: "",
};
function CreateBudget({
  isOpen,
  setIsOpen,
  editBudget,
  saveEditBudget,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editBudget: IBudgetItem | null;
  saveEditBudget: (budget: IBudgetItem) => void;
}) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budget, setBudget] = useState<IBudget>(initialBudgetVal);

  useEffect(() => {
    if (editBudget) {
      setBudget({
        "budget-name": editBudget["budget-name"],
        "budget-amount": editBudget["budget-amount"],
        emoji: editBudget.emoji,
        createdBy: editBudget.createdBy,
      });
    }
  }, [editBudget]);

  const onChangeHandler = useCallback(
    (id: string, value: string) => {
      const currentUserEmail = user?.primaryEmailAddress?.emailAddress || "";
      setBudget((oldValue) => ({
        ...oldValue,
        [`${id}`]: value,
        createdBy: currentUserEmail,
      }));
    },
    [user]
  );

  const disableSubmit = useMemo(() => {
    return (
      _.isEmpty(budget["budget-name"]) ||
      _.isEmpty(budget["budget-amount"]) ||
      _.isEmpty(budget["emoji"]) ||
      _.isEmpty(budget.createdBy)
    );
  }, [budget]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (editBudget) {
        const newBudget = { ...editBudget, ...budget };
        console.log("new Budget", newBudget);
        await saveEditBudget(newBudget);
      } else {
        await createBudget(budget);
      }
      toast("Budget created successfully!!");
      setBudget(initialBudgetVal);
    } catch {
      toast.warning("Error creating budget!!");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen((oldState) => !oldState);
      }}
    >
      <DialogTrigger asChild>
        <div className="bg-slate-100 p-10 rounded-md items-center flex justify-center flex-col border-2 border-dashed cursor-pointer hover:shadow-sm">
          <h2 className="text-3xl">+</h2>
          <h2>Create new budget</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">Create new budget</DialogTitle>

          <EmojiPicker emoji={budget.emoji} onChangeHandler={onChangeHandler} />
          <form action={handleSubmit} id="create-budget" className="mt-9">
            <div className="my-1 flex flex-col gap-2">
              <Label className="">Budget Name</Label>
              <Input
                id="budget-name"
                name="bugdet-name"
                className=""
                placeholder="eg. Home Decor"
                value={budget["budget-name"]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  onChangeHandler("budget-name", value);
                }}
              />
            </div>
            <div className="my-1 flex flex-col gap-2">
              <Label className="">Budget Amount</Label>
              <Input
                id="budget-amount"
                name="bugdet-amount"
                className=""
                placeholder="eg. 5000"
                type="number"
                value={budget["budget-amount"]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  onChangeHandler("budget-amount", value);
                }}
              />
            </div>
            <Button
              form="create-budget"
              type="submit"
              disabled={disableSubmit || isLoading}
              className="w-full mt-5"
            >
              {isLoading ? "Adding Budget...." : "Create Budget"}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBudget;
