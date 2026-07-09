"use server";

import { db } from "@/db/db";
import { messages, guestbook } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { sendNotificationEmail } from "@/lib/mail";

export async function submitContactMessage(prevState: unknown, formData: FormData) {
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
    
    await sendNotificationEmail({
      subject: `Új portfólió üzenet tőle: ${name}`,
      text: `Kapcsolatfelvétel érkezett a portfóliódon keresztül.\n\nNév: ${name}\nEmail: ${email}\nÜzenet:\n${message}`,
    });

    return { success: true, error: "", message: "Köszönöm! Az üzenetet sikeresen elmentettem, hamarosan válaszolok!" };
  } catch (error) {
    console.error("Hiba az üzenet mentésekor:", error);
    return { success: false, error: "Hiba történt az üzenet küldése során. Kérlek próbáld újra!", message: "" };
  }
}

export async function submitGuestbookComment(prevState: unknown, formData: FormData) {
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
    
    await sendNotificationEmail({
      subject: `Új vendégkönyv bejegyzés: ${name}`,
      text: `Valaki új bejegyzést írt a vendégkönyvedbe.\n\nNév: ${name}\nBejegyzés:\n${comment}`,
    });

    revalidatePath("/", "layout");
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

export async function deleteMessage(id: number): Promise<void> {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    throw new Error("Nincs jogosultságod a törléshez!");
  }
  
  try {
    await db.delete(messages).where(eq(messages.id, id));
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Hiba törléskor:", error);
    throw new Error("Nem sikerült törölni az üzenetet.");
  }
}

export async function deleteGuestbookComment(id: number): Promise<void> {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    throw new Error("Nincs jogosultságod a törléshez!");
  }

  try {
    await db.delete(guestbook).where(eq(guestbook.id, id));
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Hiba törléskor:", error);
    throw new Error("Nem sikerült törölni a bejegyzést.");
  }
}
