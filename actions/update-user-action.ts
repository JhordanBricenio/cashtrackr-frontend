"use server";

import getToken from "@/src/auth/token";
import { ErrorMessageSchema, SuccesSchema, UpdateUser } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
    errors: string[];
    success: string;
  };

export async function updateUserAction(prevState:ActionStateType, formData:FormData) {

    const updateUser = UpdateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email')
    })

    if(!updateUser.success){
        return{
            errors: updateUser.error.errors.map((error) => error.message),
            success: ''
        }
    }

    const token = getToken();
    const url = `${process.env.API_URL}/auth/update-user`;
    const req= await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: updateUser.data.name,
            email: updateUser.data.email
        })
    }) 
    const json = await req.json();
    if(!req.ok){
        const error = ErrorMessageSchema.parse(json);
        return{
            errors: [error],
            success: ''
        }
    }
    revalidatePath('/admin/profile/settings');
    const success = SuccesSchema.parse(json);
    return {
        errors: [],
        success
    }
}