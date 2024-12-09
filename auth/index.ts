import { authConfig } from "@/auth/config";
import { db } from "@/lib/db";
import { isExpired } from "@/lib/utils";
import { getAccountByUserId } from "@/services/account";
import { getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import { getUserById, updateUserById } from "@/services/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { encode } from "@auth/core/jwt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 Day
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await updateUserById(user.id, { emailVerified: new Date() });
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
        token.isOAuth = !!account;
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.gg_id);

      token.username = existingUser.username;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;
      console.log('====================================');
      console.log("token from jwt", token);
      console.log('====================================');
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.gg_id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username as string;
        session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.encodedToken = await encode({ 
          token: { ...token },
          secret: process.env.JWT_SECRET!,
          salt:"89hf2"
        });
      }

      
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (existingUser?.isTwoFactorEnabled) {
        const existingTwoFactorConfirmation =
          await getTwoFactorConfirmationByUserId(existingUser.gg_id);
        if (!existingTwoFactorConfirmation) return false;
        const hasExpired = isExpired(existingTwoFactorConfirmation.expires);
        if (hasExpired) return false;
      }

      return true;
    },
  },
  ...authConfig,
});
