import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

// export default withAuth(
//   function middleware(req) {
//     // Add any additional middleware logic here
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         // Protect admin routes
//         if (req.nextUrl.pathname.startsWith("/admin")) {
//           return token?.role === "ADMIN" // Only allow admin access
//         }

//         // Protect authenticated routes
//         if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/list-item")) {
//           return !!token
//         }

//         return true
//       },
//     },
//   },
// )
export default function middleware(req: NextRequest) {

}
export const config = {
  matcher: ["/dashboard/:path*", "/list-item/:path*", "/admin/:path*"],
} 