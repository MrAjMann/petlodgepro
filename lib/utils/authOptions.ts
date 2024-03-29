import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from '@/lib/db'
import { and, eq, sql } from 'drizzle-orm';
import { users } from '../db/schema';




export const authOptions: NextAuthOptions = {



  // @ts-ignore
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "password", type: "password" }
      },



      async authorize(credentials, req) {

        if (!credentials) {
          return new Error("Credentials not provided")
        }

        const res = await db.select().from(users).where(and(eq(users.email, credentials.email), eq(users.password, credentials.password)));


        const user = res[0]

        if (!user) {
          return null
        }


        return user

      },
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {

    async jwt({ token, user, session, trigger }) {

      if (trigger === "update" && session?.firstName || session?.role) {
        token.firstName = session.firstName
        token.role = session.role
      }

      // pass role and user id to token
      if (user) {
        return {
          ...token,
          id: user.id,
          firstName: user.firstName,
          tenantId: user.tenantId,
          role: user.role!,
        }
      }

      //  user && (token.user = user)
      return token
    },


    async session({ session, token, user }) {


      // pass user id and role to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstName: token.firstName,
          role: token.role,
          tenantId: token.tenantId
        }
      };
      // return session
    },


  },
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

}


