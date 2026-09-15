import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const contactOptions = [
  { title: "Compra directa", description: "Catalogá productos y gestioná tu pedido desde el storefront." },
  { title: "Asesoría técnica", description: "Recibí recomendaciones para elegir la pintura ideal según la superficie." },
  { title: "Cotización profesional", description: "Solicitá una propuesta según volumen, proyecto o ferretería." },
];

export default function ContactPage() {
  return (
    <main className="section-shell py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Contacto</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900">Hablemos de tu proyecto</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Nuestro equipo ayuda a constructores, propietarios, ferreterías y profesionales a elegir materiales con la mejor relación entre rendimiento y presupuesto.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={buildWhatsAppUrl("Hola, quiero asesoría para un proyecto de pinturas y materiales.")}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-emerald-500 px-5 py-3 text-center font-semibold text-white"
            >
              Enviar WhatsApp
            </a>
            <Link
              href="/collections"
              className="block rounded-full border border-zinc-300 bg-white px-5 py-3 text-center font-semibold text-zinc-900"
            >
              Ver productos
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {contactOptions.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Servicio</p>
              <h2 className="mt-3 text-2xl font-bold">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
