"use client";

import { useTransition, useState } from "react";
import { loginAction } from "./actions";
import { Loader2 } from "lucide-react";

export default function AdminLogin({ dict }: { dict: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await loginAction(formData);
      if (!res.success) {
        setError("Hibás jelszó!");
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-400 text-sm font-semibold">{error}</div>}
      <input
        type="password"
        name="password"
        required
        placeholder={dict.password}
        className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-center text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all disabled:opacity-50"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : dict.submit}
      </button>
    </form>
  );
}
