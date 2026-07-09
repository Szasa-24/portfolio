import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";
import PageTransition from "@/components/PageTransition";
import { ChevronRight, ExternalLink } from "lucide-react";

export default async function Projects({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <PageTransition>
      <div className="space-y-12 py-12">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{dict.projects.title}</h2>
          <p className="text-gray-400">{dict.projects.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-md bg-purple-950/40 border border-purple-500/30 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  {dict.projects.fullStack}
                </span>
                <div className="flex items-center gap-3">
                  <a href="https://github.com/Szasa-24/franklin-photo" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-900/60 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a href="https://franklin-photo.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-900/60 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">Franklin Photo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {dict.projects.franklinDesc}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Firebase", "Vercel Blob"].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-md text-xs font-medium bg-gray-900 border border-gray-800 text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800/50 mt-8 flex items-center justify-between">
              <a href="https://franklin-photo.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5">
                {dict.projects.viewSite} <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-md bg-purple-950/40 border border-purple-500/30 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  {dict.projects.agency}
                </span>
                <div className="flex items-center gap-3">
                  <a href="https://github.com/Szasa-24/hatalyx-studio-web" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-900/60 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">Hatalyx Studio Web</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {dict.projects.hatalyxDesc}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "i18n"].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-md text-xs font-medium bg-gray-900 border border-gray-800 text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800/50 mt-8">
              <a href="https://github.com/Szasa-24/hatalyx-studio-web" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5">
                {dict.projects.viewSource} <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
