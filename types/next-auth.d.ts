import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from 'next-auth/jwt';





declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"];
  }
}



declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultJWT["user"];
  }
}
// declare module "next-auth/DefaultUser" {
//   interface User {
//     user?: {
//       id: string;
//       name?: string | null
//       email?: string | null
//       image?: string | null
//     } & DefaultUser["user"];
//   }
// }