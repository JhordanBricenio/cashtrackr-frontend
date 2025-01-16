"use server"

import getToken from "@/src/auth/token";
import { Budget, ErrorMessageSchema, PasswordValidateSchema, SuccesSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";


type ActionStateType = {
    errors: string[],
    success:string
  };
  
export async function deleteBudget(budgetId:Budget['id'],  prevState: ActionStateType, formData: FormData) {

    const currentPassword= PasswordValidateSchema.safeParse(formData.get('password'))
    if(!currentPassword.success){
        return{
            errors: currentPassword.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    //Comprobar password
    const token= getToken ()
    const checkPasswordUrl= `${process.env.API_URL}/auth/check-password`; 
    const checkPasswordReq= await fetch(checkPasswordUrl, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            password: currentPassword.data
        })
    })

    const checkPasswordJson= await checkPasswordReq.json()
    if(!checkPasswordReq.ok){
        const error= ErrorMessageSchema.parse(checkPasswordJson)
        return{
            errors: [error],
            success: ''
        }
    }

    //Eliminar presupuesto
    const deleteBudgetUrl= `${process.env.API_URL}/budget/${budgetId}`
    const deleteBudgetReq= await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const deleteBudgetJson= await deleteBudgetReq.json()

    if(!deleteBudgetReq.ok){
        const error= ErrorMessageSchema.parse(deleteBudgetJson)
        return{
            errors: [error],
            success: ''
        }
    }

    revalidatePath('/admin')
    const success= SuccesSchema.parse(deleteBudgetJson)

    return{
        errors: [],
        success
    }
    
}