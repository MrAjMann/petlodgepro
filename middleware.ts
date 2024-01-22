import { withAuth } from 'next-auth/middleware'
import { redirect } from 'next/navigation'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(


  {

    callbacks: {
      authorized({ req, token }) {
        // requires admin role
        // `/tenant` 


        if (req.nextUrl.pathname === '/') {
          if (!token) {
            return redirect(`/auth/signin`)
          }
          if (token?.user?.tenantId === token?.tenantId) {
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

export const config = { matcher: ["/", "/tenants/:path*", "/profile", '/protected/:path*'] }


// 