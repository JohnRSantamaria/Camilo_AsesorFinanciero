import React from "react";
import Image from "next/image";
import heroImage from "../public/Image/hero_image.png";
import SectionsLayout from "./SectionsLayout";
import AnimatedText from "./framerMotion/AnimatedText";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { CalendarCheck } from "lucide-react";

function PrincipalImage({ className }: { className?: string }) {
  return (
    <Image
      src={heroImage}
      alt="varios montones de monedas y una flecha que sube y baja"
      className={`${className ?? ""} w-auto max-w-full max-h-full h-auto object-contain`}
      priority={true}
    />
  );
}

export default function Hero() {
  const router = useRouter();
  const handleClick = () => {
    trackEvent({
      action: "cta_agenda",
      category: "conversion",
      label: "hero",
    });
    router.push("https://mpago.li/1UDp3NJ");
  };

  return (
    <SectionsLayout
      id="/"
      viewport="fill"
      className="overflow-hidden lg:flex-row lg:items-center justify-center items-start gap-4"
    >
      <div className="lg:w-1/2 h-full min-h-0 w-full lg:order-1 order-2 px-4 flex items-center justify-center">
        <PrincipalImage />
      </div>
      <div className="flex flex-col gap-8 items-center justify-evenly w-full lg:w-1/2 h-full min-h-0 order-1 lg:order-2">
        <AnimatedText text="Educación y mentalidad financiera" />

        <div className="px-4 w-full flex items-center justify-center">
          <Button
            variant="cta"
            size="cta"
            onClick={handleClick}
            className="w-full max-w-xs md:w-96"
          >
            <CalendarCheck className="size-5 shrink-0" aria-hidden />
            Agenda una asesoría financiera
          </Button>
        </div>
        <p className="landing-hero-lead text-center">
          Tus finanzas personales lo agradecerán
        </p>
      </div>
    </SectionsLayout>
  );
}
