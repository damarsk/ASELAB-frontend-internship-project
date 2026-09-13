"use server";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const nim = formData.get("nim") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, nim, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to register user");
  }

  return {
    success: true,
    message: data.message || "User registered successfully",
  };
}
