import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata:Metadata = {
    title: "CashTrackr - Login",
    description: "Inicio de sesión en CashTrackr",
}

export default function LoginPage() {

    return (
        <>
            <h1 className=" font-black text-6xl text-purple-950">Iniciar sesión</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>
             <LoginForm />
             <nav className="mt-10 flex flex-col space-y-4">
                <Link className="text-center text-gray-50" href="/auth/register"> ¿No tienes cuenta? Crea una</Link>
                <Link className="text-center text-gray-50" href="/auth/forgot-password"> ¿Olvidaste tu contraseña? Restablecer </Link>
            </nav>
        </>
    )
}