"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitGuestbookComment } from "@/app/actions";
import { Loader2 } from "lucide-react";

const initialState = {
  success: false,
  error: "",
  message: "",
};

export default function GuestbookForm({ dict }: { dict: any }) {
  const [state, formAction, isPending] = useActionState(submitGuestbookComment, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && !isPending) {
      formRef.current?.reset();
    }
  }, [state.success, isPending]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {state.success && state.message && (
        <div className="p-3 rounded-lg bg-green-950/50 border border-green-500/50 text-green-400 text-xs font-semibold">
          {state.message}
        </div>
      )}

      {!state.success && state.error && (
        <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-semibold">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-xs font-semibold text-gray-400 ml-1">{dict.formName}</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 rounded-lg bg-gray-900/50 border border-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="comment" className="text-xs font-semibold text-gray-400 ml-1">{dict.formComment}</label>
        <textarea
          id="comment"
          name="comment"
          required
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg bg-gray-900/50 border border-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
          placeholder="..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {dict.formSending}
          </>
        ) : (
          dict.formSubmit
        )}
      </button>
    </form>
  );
}
