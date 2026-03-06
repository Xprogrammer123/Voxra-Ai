import { CustomerPortal } from "@polar-sh/nextjs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { user } from "@/lib/schema";

export const GET = CustomerPortal({
    accessToken: process.env.POLAR_ACCESS_TOKEN || "",
    getCustomerId: async (req) => {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session) return "";

        const dbUser = await db.query.user.findFirst({
            where: eq(user.id, session.user.id),
        });

        return (dbUser as any)?.polarCustomerId ?? "";
    },
    returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});
