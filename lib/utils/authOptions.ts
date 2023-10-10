import NextAuth ,{ NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from '@/lib/db'
import { and, eq, sql } from 'drizzle-orm';
import {  users } from '../db/schema';

 


export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {

    async jwt({ token, user, account, profile, isNewUser }) {
      // console.debug("callback jwt user:", user)
      // console.debug("callback jwt token:", token)
      // console.log('token',token)
      user && (token.user )
      return token
  },
    session: async ({ session }) => {
      
     
    return session
    },
  

},

  
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {label: "email", type: "email", placeholder: "jsmith@gmail.com"},
        password: {label:"password", type: "password"}
      },

      async authorize(credentials, req) {
        
        if (!credentials) {
          return new Error("Credentials not provided")
        }
        
        const res = await db.select().from(users).where(and(eq(users.email, credentials.email  ),eq(users.password, credentials.password)));
        // console.log('user id', res[0].id)

        const user = res[0]

        if (!user ) {
          return null
        }


        return user
        
      },
    }) 
  ],
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}


