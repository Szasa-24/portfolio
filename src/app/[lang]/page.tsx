import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import TiltImage from "@/components/TiltImage";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <PageTransition>
      <section className="min-h-[80vh] flex items-center justify-center pt-8 md:pt-0">
        <div className="grid md:grid-cols-12 gap-12 items-center w-full">
          <div className="md:col-span-7 space-y-8 text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              {dict.hero.badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              {dict.hero.greeting.replace('{name}', '')} 
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Hatalovics Sándor
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-gray-300">
              {dict.hero.title}
            </p>
            
            <p className="text-gray-400 max-w-xl leading-relaxed text-base md:text-lg">
              {dict.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link href={`/${lang}/projects`} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-center flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-1">
                {dict.hero.ctaProjects} <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href={`/${lang}/contact`} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 font-medium text-center border border-gray-800 transition-all hover:text-white">
                {dict.hero.ctaContact}
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-5 order-1 md:order-2 flex justify-center perspective-[1000px]">
            <TiltImage src="/profile.jpg" alt="Hatalovics Sándor" />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
