import LoginForm from "@/src/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const params = await searchParams;

  return (
    <main>
      <LoginForm registrationSuccess={params.registered === "1"} />
    </main>
  );
}
