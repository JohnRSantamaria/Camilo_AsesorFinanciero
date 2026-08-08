import React from "react";
import AnimatedText from "./framerMotion/AnimatedText";
import Image from "next/image";
import me from "@/public/Image/financial_advisor.jpg";
import SectionsLayout from "./SectionsLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AboutMe() {
  return (
    <SectionsLayout id="aboutMe">
      <AnimatedText text="Acerca de mí" className="shrink-0" />
      <div className="flex flex-1 min-h-0 flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex shrink-0 items-center justify-center">
          <Image
            src={me}
            alt="Un hombre con camiza y corbata sosteniendo un portafolio de inversiones"
            className="object-cover rounded-lg shadow-md w-auto h-[28rem] md:h-[32rem] lg:h-[40rem] md:max-w-full"
          />
        </div>
        <div className="flex flex-1 min-h-0 w-full flex-col items-center gap-4 py-2 lg:justify-center max-w-4xl">
          <section className="flex flex-1 min-h-0 flex-col gap-2 items-center justify-center">
            <h3 className="landing-heading text-start w-full">Mis estudios</h3>
            <span className="landing-body">
              Soy profesional en economía con maestría en economía de las
              políticas públicas, estudios en derivados financieros, finanzas
              personales, creación de presupuesto, control de gastos y finca
              raíz. Enfoqué mis estudios independientes en educación y finanzas
              personales.
            </span>
            <h3 className="landing-heading text-start w-full">
              Mi Experiencia
            </h3>
            <span className="landing-body">
              Tengo experiencia como analista de crédito empresarial en
              entidades del sector bancario, en análisis y procesamiento de
              datos en entidades del sector público y en asesoría financiera
              para personas, parejas y hogares.
            </span>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="landing-heading text-start w-full mt-8">
                Descarga mi hoja de vida
              </h3>
              <Button
                variant="cta"
                size="cta"
                asChild
                className="w-full max-w-xs md:w-96"
              >
                <Link
                  href="/cv/HV_Camilo_Meza.pdf"
                  target={"_blank"}
                  download={true}
                  className="inline-flex items-center gap-2"
                >
                  <Download className="size-5 shrink-0" aria-hidden />
                  Click para descargar
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </SectionsLayout>
  );
}
