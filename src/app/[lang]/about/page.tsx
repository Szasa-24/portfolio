import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";
import PageTransition from "@/components/PageTransition";
import { BookOpen, Calendar, Code2, Database, Globe, Layers, Terminal, FileCode2, GitFork } from "lucide-react";

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const skills = [
    { name: "Next.js 15 (App Router)", category: "Frontend", icon: Globe },
    { name: "React 19", category: "Frontend", icon: Code2 },
    { name: "TypeScript", category: "Frontend", icon: Terminal },
    { name: "TailwindCSS v4", category: "Frontend", icon: Layers },
    { name: "Node.js", category: "Backend", icon: FileCode2 },
    { name: "PostgreSQL", category: "Database", icon: Database },
    { name: "Drizzle ORM", category: "Database", icon: Database },
    { name: "Firebase", category: "Backend", icon: Layers },
    { name: "Vercel Blob", category: "Backend", icon: Globe },
    { name: "Git & GitHub", category: "DevOps", icon: GitFork },
    { name: "Python", category: "Languages", icon: Terminal },
    { name: "C++", category: "Languages", icon: Terminal },
  ];

  return (
    <PageTransition>
      <div className="space-y-24 py-12">

        <section className="space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{dict.about.studiesTitle}</h2>
            <p className="text-gray-400">{dict.about.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 hover:-translate-y-2 transition-all duration-300 border border-purple-500/10 hover:border-purple-500/30 shadow-xl shadow-black/50">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-xl bg-purple-950/40 text-purple-400">
                  <BookOpen className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/40 text-purple-300 border border-purple-500/20">
                  <Calendar className="w-4 h-4" /> 2025 -- {dict.about.now}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{dict.about.university1}</h3>
                <p className="text-purple-400 font-semibold">{dict.about.major1}</p>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {dict.about.desc1}
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 hover:-translate-y-2 transition-all duration-300 border border-purple-500/10 hover:border-purple-500/30 shadow-xl shadow-black/50">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-xl bg-purple-950/40 text-purple-400">
                  <BookOpen className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/40 text-purple-300 border border-purple-500/20">
                  <Calendar className="w-4 h-4" /> 2025 -- {dict.about.now}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{dict.about.university2}</h3>
                <p className="text-purple-400 font-semibold">{dict.about.major2}</p>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {dict.about.desc2}
              </p>
            </div>
          </div>
        </section>


        <section className="space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{dict.about.skillsTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800/50 hover:border-purple-500/40 hover:bg-gray-800/60 transition-all flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-purple-950/30 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{skill.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
