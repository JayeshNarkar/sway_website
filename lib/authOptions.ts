import { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
        cacheStrategy: { ttl: 60 },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: { email: profile.email },
        });
      }

      return true;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { email: token.email as string },
        cacheStrategy: { ttl: 60 },
      });
      if (session && session.user) {
        session.user.isAdmin = user?.isAdmin as boolean;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
          cacheStrategy: { ttl: 60 },
        });
        if (!user) {
          throw new Error("No user found");
        }
        token.id = user.id;
      }
      return token;
    },
  },
};
export default authOptions;
