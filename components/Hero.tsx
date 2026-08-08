import React from "react";
import Image from "next/image";
import heroImage from "../public/Image/hero_image.png";
import SectionsLayout from "./SectionsLayout";
import AnimatedText from "./framerMotion/AnimatedText";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

function PrincipalImage({ className }: { className?: string }) {
  return (
    <Image
      src={heroImage}
      alt="varios montones de monedas y una flecha que sube y baja"
      className={`${className} w-auto h-96 md:h-5/6 object-contain`}
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
      className="flex flex-col md:flex-row gap-8 justify-center items-center border-2 border-red-500"
    >
      <div className="md:w-1/2 h-full w-full md:order-1 order-2 px-4">
        <PrincipalImage />
      </div>
      <div className="flex flex-col gap-8 items-center justify-center w-full md:w-1/2 h-full order-1 md:order-2">
        <AnimatedText
          text="Educación y mentalidad financiera"
          className="!text-3xl sm:!text-4xl md:!text-4xl lg:!text-6xl"
        />

        <p className="text-lg sm:text-2xl text-center lg:text-4xl">
          Tus finanzas personales lo agradecerán
        </p>
        <div className="px-4 w-full flex items-center justify-center ">
          <Button
            variant="cta"
            onClick={handleClick}
            className="w-full md:w-96 md:py-4 max-w-xs h-auto py-2"
          >
            Agenda una asesoría financiera
          </Button>
        </div>
      </div>
    </SectionsLayout>
  );
}
