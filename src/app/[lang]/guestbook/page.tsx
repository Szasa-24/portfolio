import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";
import PageTransition from "@/components/PageTransition";
import GuestbookForm from "@/components/GuestbookForm";
import { getGuestbookComments } from "@/app/actions";
import { MessageSquare } from "lucide-react";

export default async function Guestbook({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const comments = await getGuestbookComments();

  return (
    <PageTransition>
      <div className="space-y-12 py-12">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{dict.guestbook.title}</h2>
          <p className="text-gray-400">{dict.guestbook.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-8 shadow-xl shadow-purple-900/10">
              <GuestbookForm dict={dict.guestbook} />
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-purple-400" /> 
              {dict.guestbook.previousComments} ({comments.length})
            </h3>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.length === 0 ? (
                <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 text-center text-gray-500 text-sm">
                  {dict.guestbook.noComments}
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-base">{comment.name}</span>
                      <span className="text-xs font-medium text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString(lang, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{comment.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
