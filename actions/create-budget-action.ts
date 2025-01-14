"use server";

import getToken from "@/src/auth/token";
import { DraftBudgetSchema, ErrorMessageSchema, SuccesSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createBudget(
  prevState: ActionStateType,
  formData: FormData
) {
  console.log("Creating budget");

  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();

  const url = `${process.env.API_URL}/budget`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  });

  const res = await req.json();
  if(!req.ok){
    const error = ErrorMessageSchema.parse(res);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccesSchema.parse(res);
  return {
    errors: [],
    success
  };
}
