import { withAuth } from 'next-auth/middleware'
import { redirect } from 'next/navigation'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  
  // function middleware(req, token) {
  //   if (req.nextUrl.pathname === "/") {
     
  //     if (token?. === token?.tenantId && token?.role === "CLIENT ") {
  //       redirect(`/tenant/${token.tenantId}/profile`)
  //     }
  //   }

  // },
  
  {

  callbacks: {
    authorized({ req, token }) {
      // requires admin role
      // `/tenant` 
      console.log('token tenant id', token?.user?.tenantId)
      if (req.nextUrl.pathname === '/') {
        if (token?.user?.tenantId === token?.tenantId ) {
          redirect(`/`)
        }
      }
      if (req.nextUrl.pathname === "/tenants") {
        
        if (token?.user?.tenantId === token?.tenantId && token?.role === "CLIENT || STAFF") {
          return true
        }
     
      }
      // only requires the user to be logged in
      // `/me` 
      return !!token
    },

},
})
// export {default} from 'next-auth/middleware'

export const config = { matcher: ["/tenants/:path*", "/profile", '/protected/:path*'] }


// 