import ForgotPasswordForm from "@/components/auth/ForgotPassword";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CashTrackr - Forgot Password",
    description: "Forgot password page",
}

export default function ForgotPasswordPage() {

    return (
        <>
            <h1 className=" font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>

            <ForgotPasswordForm />

            <nav className="mt-10 flex flex-col space-y-4">
                <Link className="text-center text-gray-50" href="/auth/login"> ¿Ya tienes una cuenta? Inicia sesión</Link>
                <Link className="text-center text-gray-50" href="/auth/register"> ¿No tienes cuenta? Crea una</Link>
            </nav>
        </>
    )
}