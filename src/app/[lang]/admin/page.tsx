import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";
import PageTransition from "@/components/PageTransition";
import { db } from "@/db/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import AdminLogin from "./AdminLogin";

export default async function Admin({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "authenticated";

  if (!isAdmin) {
    return (
      <PageTransition>
        <div className="max-w-md mx-auto py-24">
          <div className="glass-card rounded-2xl p-8 space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white">{dict.admin.login}</h2>
            <AdminLogin dict={dict.admin} />
          </div>
        </div>
      </PageTransition>
    );
  }

  const allMessages = await db.select().from(messages).orderBy(desc(messages.id));

  return (
    <PageTransition>
      <div className="space-y-8 py-12">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{dict.admin.title}</h2>
            <p className="text-gray-400">{dict.admin.subtitle}</p>
          </div>
          <form action={async () => {
            "use server";
            const cookieStore = await cookies();
            cookieStore.delete("admin_session");
          }}>
            <button type="submit" className="px-4 py-2 rounded-lg bg-red-900/50 hover:bg-red-800 text-red-200 text-sm font-semibold transition-colors">
              {dict.admin.logout}
            </button>
          </form>
        </div>

        <div className="glass-card rounded-2xl p-6 overflow-hidden">
          <h3 className="text-xl font-bold text-white mb-6">{dict.admin.messages} ({allMessages.length})</h3>
          
          <div className="space-y-4">
            {allMessages.length === 0 && (
              <div className="text-gray-500 text-sm text-center">Nincsenek üzenetek.</div>
            )}
            {allMessages.map((msg) => (
              <div key={msg.id} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 flex flex-col md:flex-row gap-4 justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{msg.name}</span>
                    <a href={`mailto:${msg.email}`} className="text-sm text-purple-400 hover:underline">{msg.email}</a>
                  </div>
                  <p className="text-gray-300 text-sm">{msg.message}</p>
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
