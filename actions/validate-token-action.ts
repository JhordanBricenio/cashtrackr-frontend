"use server";

import { ErrorMessageSchema, SuccesSchema, TokenSchema } from "@/src/schemas";


export async function validateToken(token: string) {
  const resetPasswordToken = TokenSchema.safeParse(token);
  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/validate-token`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: resetPasswordToken.data,
    }),
  });

  const json = await req.json();
  if(!req.ok){
    const error = ErrorMessageSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccesSchema.parse(json);
  return {
    errors: [],
    success
  };
}
