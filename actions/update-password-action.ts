"use server";

import getToken from "@/src/auth/token";
import { ErrorMessageSchema, SuccesSchema, UpdatePassword } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
  };

export async function updatePasswordAction(prevState:ActionStateType, formData:FormData) {
    console.log('update password action');

    const updatePassword= UpdatePassword.safeParse({
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    })

    if(!updatePassword.success){
        return{
            errors: updatePassword.error.errors.map((error) => error.message),
            success: ''
        }
    }

    const token= getToken();
    const url = `${process.env.API_URL}/auth/update-password`;
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            current_password: updatePassword.data.current_password,
            password: updatePassword.data.password
        })
    });

    const json = await req.json();
    if(!req.ok){
        const error = ErrorMessageSchema.parse(json);
        return{
            errors: [error],
            success: ''
        }
    }

    const success = SuccesSchema.parse(json);
    return{
        errors:[],
        success
    }
}