"use server";

import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";

export async function registerAction(data: RegisterFormValues) {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Data formulir tidak valid" };
  }

  const response = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    return {
      success: false,
      error: errorData?.message || "Gagal melakukan registrasi",
    };
  }

  return { success: true };
}
