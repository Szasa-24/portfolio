"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/app/actions";
import { Loader2 } from "lucide-react";

const initialState = {
  success: false,
  error: "",
  message: "",
};

export default function ContactForm({ dict }: { dict: any }) {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.success && state.message && (
        <div className="p-4 rounded-xl bg-green-950/50 border border-green-500/50 text-green-400 text-sm font-semibold">
          {state.message}
        </div>
      )}

      {!state.success && state.error && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/50 text-red-400 text-sm font-semibold">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-gray-400 ml-1">{dict.formName}</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-gray-400 ml-1">{dict.formEmail}</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-gray-400 ml-1">{dict.formMessage}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
          placeholder="..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg shadow-purple-600/20"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {dict.formSending}
          </>
        ) : (
          dict.formSubmit
        )}
      </button>
    </form>
  );
}
