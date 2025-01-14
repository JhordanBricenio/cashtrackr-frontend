import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CashTrackr - Registro",
    description: "Crea una cuenta y controla tus finanzas",
}

export default function RegisterPage() {

    return (
        <>
            <h1 className=" font-black text-6xl text-purple-950">Crea una cuenta</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>

            <RegisterForm />

            <nav className="mt-10 flex flex-col space-y-4">
                <Link className="text-center text-gray-50" href="/auth/login"> ¿Ya tienes una cuenta? Inicia sesión</Link>
                <Link className="text-center text-gray-50" href="/auth/forgot-password"> ¿Olvidaste tu contraseña? Restablecer </Link>
            </nav>
        </>
    )
}