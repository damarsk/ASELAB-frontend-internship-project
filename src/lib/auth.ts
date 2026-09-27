import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailInstitusi: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        if (
          !backendBaseUrl ||
          !credentials?.emailInstitusi ||
          !credentials.password
        ) {
          return null;
        }

        const response = await fetch(`${backendBaseUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailInstitusi: credentials.emailInstitusi,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          return null;
        }

        const result = (await response.json()) as {
          token?: string;
          data?: { id?: string; nama?: string; emailInstitusi?: string };
        };

        if (!result.token) {
          return null;
        }

        return {
          id: result.data?.id ?? credentials.emailInstitusi,
          name: result.data?.nama,
          email: result.data?.emailInstitusi ?? credentials.emailInstitusi,
          backendToken: result.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
