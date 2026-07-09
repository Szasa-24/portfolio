"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  const truePassword = process.env.ADMIN_PASSWORD || "Hatalovics2026";

  if (password === truePassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    revalidatePath("/", "layout");
    return { success: true };
  }

  return { success: false };
}
