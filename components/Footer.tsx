import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Logo from "../public/Image/svg/logo2";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { openCookiePreferences } from "@/lib/consent";

interface CardContactProps {
  icon: React.ReactNode;
  title: string;
  url: string;
  target?: string;
  onClick?: () => void;
}

function CardContact({
  icon,
  title,
  url,
  target = "_blank",
  onClick,
}: CardContactProps) {
  return (
    <Link
      href={url}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 capitalize transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 dark:hover:bg-primaryDark/10 dark:focus-visible:ring-primaryDark"
    >
      {icon}
      <span className="text-sm font-medium md:text-base">{title}</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/20 bg-stone-200 text-primary dark:border-primaryDark/20 dark:bg-zinc-800 dark:text-primaryDark">
      <section className="mx-auto grid max-w-screen-2xl gap-8 px-4 py-8 md:grid-cols-3 md:items-center md:gap-6 md:py-10">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Logo className="h-14 w-14 sm:h-16 sm:w-16" />
          <div className="text-center leading-tight md:text-start">
            <p className="landing-heading">Camilo Meza</p>
            <p className="text-sm font-medium tracking-wide text-primary/75 dark:text-primaryDark/80">
              Asesor financiero
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/70 dark:text-primaryDark/70">
            Contacto
          </p>
          <CardContact
            icon={<HiOutlineMail className="h-5 w-5 shrink-0" />}
            title="Email"
            url="mailto:asesorfinanciero@camilomeza.com"
            onClick={() =>
              trackEvent({
                action: "contact_email",
                category: "contact",
                label: "footer",
              })
            }
          />
          <CardContact
            icon={<FaWhatsapp className="h-5 w-5 shrink-0" />}
            title="WhatsApp"
            url="https://wa.me/message/TVZTX5F2HKCMK1"
            onClick={() =>
              trackEvent({
                action: "contact_whatsapp",
                category: "contact",
                label: "footer",
              })
            }
          />
          <CardContact
            icon={<FaInstagram className="h-5 w-5 shrink-0" />}
            title="Instagram"
            url="https://www.instagram.com/camilo_finanzas/"
            onClick={() =>
              trackEvent({
                action: "contact_instagram",
                category: "contact",
                label: "footer",
              })
            }
          />
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/70 dark:text-primaryDark/70">
            Legal
          </p>
          <Link
            href="/privacidad"
            className="rounded-lg px-2 py-1.5 text-sm font-medium underline-offset-2 transition-colors hover:bg-primary/10 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-primaryDark/10 dark:focus-visible:ring-primaryDark"
          >
            Privacidad y cookies
          </Link>
          <button
            type="button"
            className="rounded-lg px-2 py-1.5 text-sm font-medium underline-offset-2 transition-colors hover:bg-primary/10 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-primaryDark/10 dark:focus-visible:ring-primaryDark"
            onClick={() => openCookiePreferences()}
          >
            Preferencias de cookies
          </button>
        </div>
      </section>

      <div className="border-t border-primary/15 px-4 py-3 dark:border-primaryDark/15">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-center gap-1 text-sm text-primary/70 dark:text-primaryDark/70">
          <span>Build with</span>
          <span className="px-0.5 text-base text-red-500" aria-hidden>
            &#9825;
          </span>
          <span>by</span>
          <Link
            href="https://www.linkedin.com/in/john-santamaria-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-2 hover:opacity-80 dark:text-primaryDark"
          >
            JohnS
          </Link>
        </div>
      </div>
    </footer>
  );
}
