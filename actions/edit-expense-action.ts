"use server";

import getToken from "@/src/auth/token";
import {
  Budget,
  DraftExpenseSchema,
  ErrorMessageSchema,
  Expense,
  SuccesSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseIdType = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};
export default async function editExpenseAction(
  { budgetId, expenseId }: BudgetAndExpenseIdType,
  prevState: ActionStateType,
  formData: FormData
) {
  const expense = DraftExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!expense.success) {
    return {
      errors: expense.error.errors.map((error) => error.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budget/${budgetId}/expenses/${expenseId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
    }),
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
