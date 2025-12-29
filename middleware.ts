import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function middleware(req:NextRequest){
    const token= 
    req.headers.get("authorization")?.replace("Bearer","")||
    req.cookies.get("token")?.value;

    if(req.nextUrl.pathname.startsWith("/api/auth")){
        return NextResponse.next();
    }

    if(!token){
        return NextResponse.json(
            {message:"Unauthorized"},
            {status:401}
        );
    }
    try{
        jwt.verify(token,process.env.JWT_SECRET!);
        return NextResponse.next();

    }catch{
        return NextResponse.json(
            {message:"Invlaid token"},
            {status:401}
        );
    }
}

export const config={
    matcher:[
          "/api/orders/:path*",
    "/api/products/:path*",
    "/admin/:path*", 
    ]
};
