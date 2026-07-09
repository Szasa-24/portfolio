"use server";

import { db } from "@/db/db";
import { messages, guestbook } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { desc } from "drizzle-orm";

export async function submitContactMessage(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Minden mezőt ki kell tölteni!", message: "" };
  }

  try {
    await db.insert(messages).values({
      name,
      email,
      message,
    });
    return { success: true, error: "", message: "Köszönöm! Az üzenetet sikeresen elmentettem, hamarosan válaszolok!" };
  } catch (error) {
    console.error("Hiba az üzenet mentésekor:", error);
    return { success: false, error: "Hiba történt az üzenet küldése során. Kérlek próbáld újra!", message: "" };
  }
}

export async function submitGuestbookComment(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const comment = formData.get("comment") as string;

  if (!name || !comment) {
    return { success: false, error: "A név és a hozzászólás mező is kötelező!", message: "" };
  }

  try {
    await db.insert(guestbook).values({
      name,
      comment,
    });
    revalidatePath("/");
    return { success: true, error: "", message: "Köszönöm a hozzászólást!" };
  } catch (error) {
    console.error("Hiba a vendégkönyv mentésekor:", error);
    return { success: false, error: "Hiba történt a mentés során. Kérlek próbáld újra!", message: "" };
  }
}

export async function getGuestbookComments() {
  try {
    return await db.select().from(guestbook).orderBy(desc(guestbook.id));
  } catch (error) {
    console.error("Hiba a hozzászólások lekérésekor:", error);
    return [];
  }
}
