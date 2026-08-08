import React from "react";
import { MoonIcon } from "./icons/moonIcon";
import { SunIcon } from "./icons/sunIcon";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { trackEvent } from "@/lib/analytics";
import { homeSectionHref } from "@/lib/navigation";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: homeSectionHref("servicios"), label: "Servicios" },
  { href: homeSectionHref("aboutMe"), label: "Acerca de mí" },
  { href: "/blog", label: "Blog", trackLabel: "mobile_menu" as const },
];

export default function MenuMobile({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [mode, setMode] = useThemeSwitcher();

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-14 bottom-0 left-0 right-0 z-40 border-t border-primary/20 bg-light text-primary dark:border-primaryDark/20 dark:bg-dark dark:text-primaryDark"
        >
          <nav className="flex h-full flex-col px-6 py-8">
            <ul className="flex flex-col gap-6">
              {navLinks.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.trackLabel) {
                        trackEvent({
                          action: "blog_nav_click",
                          category: "blog",
                          label: item.trackLabel,
                        });
                      }
                      close();
                    }}
                    className="block w-full text-center text-xl font-semibold tracking-wide transition-transform active:scale-95"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col items-center gap-6 border-t border-primary/15 pt-6 dark:border-primaryDark/15">
              <div className="flex items-center justify-center gap-5">
                <a
                  href="https://www.instagram.com/camilo_finanzas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 transition-transform hover:scale-110 active:scale-95"
                  onClick={() =>
                    trackEvent({
                      action: "contact_instagram",
                      category: "contact",
                      label: "mobile_menu",
                    })
                  }
                >
                  <FaInstagram className="h-7 w-7" />
                </a>
                <a
                  href="https://wa.me/message/TVZTX5F2HKCMK1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 transition-transform hover:scale-110 active:scale-95"
                  onClick={() =>
                    trackEvent({
                      action: "contact_whatsapp",
                      category: "contact",
                      label: "mobile_menu",
                    })
                  }
                >
                  <FaWhatsapp className="h-7 w-7" />
                </a>
                <a
                  href="mailto:asesorfinanciero@camilomeza.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 transition-transform hover:scale-110 active:scale-95"
                  onClick={() =>
                    trackEvent({
                      action: "contact_email",
                      category: "contact",
                      label: "mobile_menu",
                    })
                  }
                >
                  <HiOutlineMail className="h-8 w-8" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                className={`flex items-center justify-center rounded-full p-2 transition-transform active:scale-95 ${
                  mode === "light"
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                }`}
                aria-label={
                  mode === "light" ? "Activar modo oscuro" : "Activar modo claro"
                }
              >
                {mode === "light" ? (
                  <SunIcon className="fill-dark" />
                ) : (
                  <MoonIcon className="fill-dark" />
                )}
              </button>
            </div>
          </nav>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
