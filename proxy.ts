import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

export async function proxy(req: NextRequest) {
    const protectedRoutes = ["/dashboard", "/projects", "/gallery", "/settings"];
    const isProtected = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
    const isAuthPage = req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up";

    if (!isProtected && !isAuthPage) {
        return NextResponse.next();
    }

    try {
        const { data: session } = await betterFetch<Session>(
            "/api/auth/get-session",
            {
                baseURL: req.nextUrl.origin,
                headers: {
                    cookie: req.headers.get("cookie") || "",
                },
            }
        );

        if (isProtected && !session) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        if (isAuthPage && session) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

    } catch {
        // DB timeout or network blip — don't redirect, let the page handle it
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/projects/:path*",
        "/gallery/:path*",
        "/settings/:path*",
        "/sign-in",
        "/sign-up",
    ],
};