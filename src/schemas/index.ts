import { z } from "zod";
export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El email no puede estar vacío" })
      .email({ message: "El email no es válido" }),
    name: z.string().min(1, { message: "El nombre no puede estar vacío" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const SuccesSchema = z.string();
export const ErrorMessageSchema = z.string();

export const TokenSchema = z
  .string({ message: "El token no es válido" })
  .length(6, { message: "El token debe tener 6 caracteres" });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email no es válido" })
    .email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string()   
          .min(1, {message: 'El Email es Obligatorio'})
          .email( {message: 'Email no válido'}),
})
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})

export const ResetPasswordSchema = z.object({
  password: z.string()
          .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Los Passwords no son iguales",
  path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
  name: z.string()
          .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
  amount: z.coerce.
          number({message: 'Cantidad no válida'})
          .min(1, {message: 'Cantidad no válida'}),
})

export const PasswordValidateSchema = z.string().min(1, {message: 'Password no válido'});

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})
export const ErrorResposeSchema = z.object({
  error: z.string()
})
export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema);

export type User = z.infer<typeof UserSchema>; 

export type Budget= z.infer<typeof BudgetAPIResponseSchema>;