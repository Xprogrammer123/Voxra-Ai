import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

export async function proxy(req: NextRequest) {
    // Better Auth provides a clean way to check session in proxy
    const { data: session } = await betterFetch<Session>(
        `${req.nextUrl.origin}/api/auth/get-session`,
        {
            baseURL: req.nextUrl.origin,
            headers: {
                cookie: req.headers.get("cookie") || "",
            },
        }
    );

    // Protect specific routes
    const protectedRoutes = ["/dashboard", "/projects", "/gallery", "/settings"];
    const isProtected = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Keep users away from auth pages if logged in
    if (session && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/projects/:path*", "/gallery/:path*", "/settings/:path*", "/sign-in", "/sign-up"],
};
