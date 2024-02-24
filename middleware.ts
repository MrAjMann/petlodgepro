// import { withAuth } from 'next-auth/middleware'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";


// // More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth(


//   {

//     callbacks: {
//       authorized({ request: NextRequest, token}) {

//         if (request.nextUrl.pathname.startsWith('/')) {

//             return NextResponse.rewrite(new URL(`/signin`,req.url))

//         }


//         if (token?.user?.tenantId === token?.tenantId) {
//           redirect(`/`)
//         }


//         if (req.nextUrl.pathname === "/tenants") {

//           if (token?.user?.tenantId === token?.tenantId && token?.role === "CLIENT || STAFF") {
//             return true
//           }

//         }
//         // only requires the user to be logged in
//         // `/me` 
//         return !!token
//       },

//     },
//   })
// // export {default} from 'next-auth/middleware'

// export const config = { matcher: ["/", "/tenants/:path*", "/profile", '/protected/:path*'] }


// // 

export const config = {
  matcher: ['/', '/tenants/:path*', '/profile']
}



export async function middleware(req: NextRequest) {
  const isAuth = await getToken({ req })
  // console.log('isAuth', isAuth)
  if (isAuth === null) {
    return NextResponse.rewrite(new URL('/signin', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/tenants')) {

    if (isAuth?.tenantId && isAuth?.role === "TENANT") {
      console.log('TENANT')
      return NextResponse.next()
    }


    if (isAuth?.tenantId && isAuth?.role === "STAFF") {
      console.log('STAFF')
      return NextResponse.next()
    }
    if (isAuth?.tenantId && isAuth?.role === "CLIENT") {
      console.log('CLIENT')
      return NextResponse.next()
    }


    if (isAuth?.role === "CLIENT" || isAuth?.role === "STAFF" && req.nextUrl.pathname === `/staff`) {
      console.log('Not Allowed')
      return NextResponse.rewrite(new URL(`/tenants/${isAuth?.tenantId}`, req.url))
    }



  }
}