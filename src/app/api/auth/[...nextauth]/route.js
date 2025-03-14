import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { authService } from "@/services/auth/authService";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await authService.authenticateUser(
            credentials.email,
            credentials.password
          );

          await updateDoc(doc(db, "users", user.id), {
            lastLogin: new Date().toISOString(),
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name || "User",
            role: user.role || "pasien",
            image: user.image || null,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
