import Logo from "@/components/ui/Logo";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <header className="bg-purple-950 py-5">
        <div className="max-w-3xl mx-auto flex flex-col lg:flex-row items-center">
          <Logo />
          <nav className=" flex flex-col lg:flex-row lg:justify-end gap-5 w-full">
            <Link href='/auth/login' className=" font-bold text-white hover:text-amber-500 uppercase text-sm text-center">
              Iniciar sesión
            </Link>
            <Link href='/auth/register' className=" font-bold text-white hover:text-amber-500 uppercase text-sm text-center">
              Registrarme
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-5 space-y-5 mt-20">
        <h1 className="font-black text-4xl lg:text-6xl text-purple-950">Administrador de gastos</h1>
        <p className="text-3xl font-bold">controla tus <span className="text-amber-500">finanzas</span></p>
        <p className="text-lg">Domina tus finanzas con nuestro Administrador de Gastos. Simplifica la gestión de 
          tus ingresos y egresos, y toma el control de tu dinero.
          </p>

        <h2 className="font-black text-4xl text-purple-950">
          Ventajas de usar nuestro Administrador de Gastos
        </h2>

        <ol className="grid grid-cols-1 gap-5 items-start">
          <li className=" p-5 shadow-lg text-lg">
            <h3 className="font-bold text-2xl text-purple-950">Organiza tus gastos</h3>
            <p>Registra tus gastos de forma sencilla y rápida. Categoriza tus gastos y visualiza en qué estás gastando tu dinero.</p>
          </li>
        </ol>

        <ol className="grid grid-cols-1 gap-5 items-start">
          <li className=" p-5 shadow-lg text-lg">
            <h3 className="font-bold text-2xl text-purple-950">Presupuestación inteligente</h3>
            <p>
              Crea presupuestos personalizados y recibe alertas cuando estés por exceder tus límites de gastos.
            </p>
          </li>
        </ol>

        <ol className="grid grid-cols-1 gap-5 items-start">
          <li className=" p-5 shadow-lg text-lg">
            <h3 className="font-bold text-2xl text-purple-950">Reportes detallados</h3>
            <p>
              Visualiza tus gastos en gráficos y tablas. Analiza tus gastos y toma decisiones informadas.
            </p>
          </li>
        </ol>


      </main>



    </>

  );
}
