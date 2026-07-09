import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";
import PageTransition from "@/components/PageTransition";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone } from "lucide-react";

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-12 py-12">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{dict.contact.title}</h2>
          <p className="text-gray-400">{dict.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 flex items-center gap-4 hover:border-purple-500/30 transition-colors">
              <div className="p-3 rounded-xl bg-purple-950/40 text-purple-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dict.contact.emailTitle}</h4>
                <a href="mailto:sandorhatalovics@gmail.com" className="text-base font-semibold text-white hover:text-purple-400 transition-colors">
                  sandorhatalovics@gmail.com
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 flex items-center gap-4 hover:border-purple-500/30 transition-colors">
              <div className="p-3 rounded-xl bg-purple-950/40 text-purple-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dict.contact.phoneTitle}</h4>
                <a href="tel:+36307982251" className="text-base font-semibold text-white hover:text-purple-400 transition-colors">
                  +36 30 798 2251
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 glass-card rounded-2xl p-8 shadow-xl shadow-purple-900/10">
            <ContactForm dict={dict.contact} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
