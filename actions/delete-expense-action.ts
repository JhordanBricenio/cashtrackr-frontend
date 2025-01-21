"use server";

import getToken from "@/src/auth/token";
import { Budget, ErrorMessageSchema, SuccesSchema } from "@/src/schemas";

import { Expense } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseIdType = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};
export default async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpenseIdType,
  prevState: ActionStateType
) {
  console.log("Deleting expense");

  const token = getToken();
  const url = `${process.env.API_URL}/budget/${budgetId}/expenses/${expenseId}`;
  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  if (!req.ok) {
    const error = ErrorMessageSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  revalidatePath(`/admin/budget/${budgetId}`);
  const success = SuccesSchema.parse(json);
  return {
    errors: [],
    success,
  };
}
