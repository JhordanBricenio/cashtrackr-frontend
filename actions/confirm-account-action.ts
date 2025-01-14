"use server";

import { SuccesSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function confirmAccount(
  token: string,
  prevState: ActionStateType
) {
  const confirmToken = TokenSchema.safeParse(token);
  if (!confirmToken.success) {
    const errors = confirmToken.error.errors.map((error) => error.message);
    return {
      errors,
      success: prevState.success,
    };
  }

  const url = `${process.env.API_URL}/auth/confirm-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: confirmToken.data,
    }),
  });

  const json = await req.json();
  if (!req.ok) {
    const error = SuccesSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  return {
    errors: [],
    success: "Cuenta confirmada",
  };
}
