"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Locale, i18n } from "@/i18n/config";
import { useState, useTransition } from "react";
import { Globe, Menu, X } from "lucide-react";

export default function Navigation({ lang, dict }: { lang: string, dict: Record<string, string> }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${lang}`, '');
    const newPath = `/${newLocale}${currentPath === '' ? '' : currentPath}`;
    startTransition(() => {
      router.push(newPath);
    });
  };

  const links = [
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/projects`, label: dict.projects },
    { href: `/${lang}/about`, label: dict.about },
    { href: `/${lang}/guestbook`, label: dict.guestbook },
    { href: `/${lang}/contact`, label: dict.contact },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-4 z-50 mx-auto w-[95%] max-w-5xl rounded-2xl bg-[#030712]/70 backdrop-blur-xl border border-gray-800/50 shadow-2xl shadow-purple-900/10"
    >
      <div className="px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-wider">
          HATALYX
        </Link>


        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          {links.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative px-2 py-1 transition-colors hover:text-white ${isActive ? "text-white" : ""}`}
              >
                {isActive && (
                  <motion.span 
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-md bg-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">

          <div className="relative group">
            <button className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 border border-gray-800/50 text-gray-400 hover:text-white transition-all text-xs font-semibold uppercase">
              <Globe className="w-3.5 h-3.5" /> {lang}
            </button>
            <div className="absolute right-0 top-full mt-2 w-24 bg-gray-900 border border-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
              {i18n.locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLanguage(locale)}
                  disabled={isPending}
                  className={`px-4 py-2 text-xs font-medium text-left hover:bg-gray-800 transition-colors ${lang === locale ? 'text-purple-400 bg-gray-800/50' : 'text-gray-400'}`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
          </div>


          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>


      {isMobileMenuOpen && (
        <motion.nav 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-gray-800/50 px-4 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-medium ${pathname === link.href ? "text-purple-400" : "text-gray-400"}`}
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
