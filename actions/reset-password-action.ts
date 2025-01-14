"use server";

import { ErrorMessageSchema, ResetPasswordSchema, SuccesSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function resetPassword(
  token: string,
  prevState: ActionStateType,
  formData: FormData
) {
  console.log(token);

  const resetPasswordInput = {
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput);
  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/reset-password/${token}`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: resetPassword.data.password,
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
