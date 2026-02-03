import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

     if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/api/auth") ||
        pathname === "/"
    ) {
        return NextResponse.next();
    }
    const token = await getToken({req,secret: process.env.NEXTAUTH_SECRET,});
    
    if(!token){
        return NextResponse.redirect(new URL('/login',req.url));    
    }

    if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
  return NextResponse.redirect(new URL("/", req.url));
}
    if (pathname.startsWith("/recruiter") && token.role !== "RECRUITER") {
  return NextResponse.redirect(new URL("/", req.url));
}
    if (pathname.startsWith("/student") && token.role !== "STUDENT") {
  return NextResponse.redirect(new URL("/", req.url));
}

    
    return NextResponse.next();



  


}


                                                                                                                                                                                                  
