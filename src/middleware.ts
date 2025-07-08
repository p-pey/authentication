import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
       console.log("*****")
       return NextResponse.next();
};

export const config = {
       matcher: ["/auth", "/dashboard"]
}