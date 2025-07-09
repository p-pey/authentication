import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
       const isLoggedIn = !!req.cookies.has('email');
       const url = req.nextUrl.pathname;
       const isDashboard = url === "/dashboard";
       const isLoggedInAndVisitAuthPage = isLoggedIn && !isDashboard;
       const isNotLoggedInAndVisitDashboard = !isLoggedIn && isDashboard;

       if (isLoggedInAndVisitAuthPage) {
              return NextResponse.redirect(new URL('/dashboard', req.url))
       }

       if (isNotLoggedInAndVisitDashboard) {
              return NextResponse.redirect(new URL('/auth', req.url))
       }
       return NextResponse.next();
};

export const config = {
       matcher: ["/auth", "/dashboard"]
}