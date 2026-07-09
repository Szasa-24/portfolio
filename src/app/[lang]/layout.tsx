import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { Locale, i18n } from "@/i18n/config";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Hatalovics Sándor | Portfolio",
  description: "Full-Stack Webfejlesztő & Gazdaságinformatikus hallgató portfóliója",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.className} bg-[#030712] text-gray-100 antialiased selection:bg-purple-500/30 selection:text-purple-200`}>
        <div className="relative min-h-screen flex flex-col">
          <div className="aura-bg aura-purple pointer-events-none fixed"></div>
          <div className="aura-bg aura-blue pointer-events-none fixed"></div>

          <Navigation lang={locale} dict={dict.navigation} />
          
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 relative z-10">
            {children}
          </main>

          <footer className="border-t border-gray-900 bg-[#030712]/50 py-8 text-center text-xs text-gray-500 relative z-10 mt-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} Hatalovics Sándor. {dict.contact?.footerRights || "Minden jog fenntartva."}</p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/Szasa-24" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href="mailto:sandorhatalovics@gmail.com" className="hover:text-white transition-colors">Email</a>
                <a href="tel:+36307982251" className="hover:text-white transition-colors">Tel</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
