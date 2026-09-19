"use server";

export async function requestOtpAction(email: string) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/request-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailInstitusi: email }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error: errorData?.error || "Gagal mengirim OTP",
      };
    }

    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Terjadi kesalahan jaringan",
    };
  }
}
