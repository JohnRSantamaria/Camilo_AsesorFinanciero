import React from "react";
import Link from "next/link";
import XButton from "./xButton";
import Logo from "@/public/Image/svg/logo2";

export default function MobileNabBarMenu() {
  return (
    <header className="sm:hidden sticky top-0 z-50 shrink-0 w-full border-b border-primary/25 bg-light shadow-sm text-primary dark:border-primaryDark/25 dark:bg-dark dark:shadow-none dark:text-primaryDark">
      <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-primaryDark"
        >
          <Logo className="h-9 w-9 shrink-0" />
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-lg font-bold tracking-tight">
              Camilo Meza
            </span>
            <span className="block text-xs font-medium tracking-wide text-primary/75 dark:text-primaryDark/80">
              Asesor financiero
            </span>
          </div>
        </Link>
        <XButton />
      </div>
    </header>
  );
}
