import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";





declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id?:  string | null;
      tenantId?:  string | null;
      firstName?: string | null
      role?:  string | null;
      email?: string | null
      image?: string | null
    } 
  }

  interface User extends DefaultUser {
      id?:  string | null;
      tenantId?:  string | null;
      firstName?: string | null;
      role?:  string | null;
      email?: string | null;
      image?: string | null;
    } 
  
}



declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string | null;
      firstName: string;
      tenantId:  string | null;
      role:  string | null;
    }
  }
}



