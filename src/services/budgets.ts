import { notFound } from "next/navigation";
import { cache } from "react";
import { BudgetAPIResponseSchema } from "../schemas";
import getToken from "../auth/token";

export const getBudget = cache(async (budgetId: string) => {

    const token= getToken()
    const url = `${process.env.API_URL}/budget/${budgetId}`;
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    const json = await req.json();
    if(!req.ok) {
        notFound()
    }
    const budget= BudgetAPIResponseSchema.parse(json)
    return budget;
})
