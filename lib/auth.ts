import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { polarClient } from "@/lib/polar";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: { enabled: true },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        { productId: process.env.POLAR_STARTER_PRODUCT_ID || "starter_id", slug: "starter" },
                        { productId: process.env.POLAR_CREATOR_PRODUCT_ID || "creator_id", slug: "creator" },
                        { productId: process.env.POLAR_STUDIO_PRODUCT_ID || "studio_id", slug: "studio" },
                    ],
                    successUrl: "/dashboard?upgraded=true",
                    authenticatedUsersOnly: true,
                }),
                portal(),
                webhooks({
                    secret: process.env.POLAR_WEBHOOK_SECRET || "",
                    onCustomerStateChanged: async (payload) => {
                        const plan = payload.activeSubscriptions?.[0]?.productId
                            ? getPlanFromProductId(payload.activeSubscriptions[0].productId)
                            : "free";

                        await db
                            .update(schema.user as any)
                            .set({ plan } as any)
                            .where(eq((schema.user as any).polarCustomerId, payload.customerId));
                    },
                    onOrderPaid: async (payload) => {
                        console.log("Order paid:", payload.data.id);
                    },
                }),
            ],
        }),
    ],
});

function getPlanFromProductId(productId: string): string {
    const map: Record<string, string> = {
        [process.env.POLAR_STARTER_PRODUCT_ID || "starter_id"]: "starter",
        [process.env.POLAR_CREATOR_PRODUCT_ID || "creator_id"]: "creator",
        [process.env.POLAR_STUDIO_PRODUCT_ID || "studio_id"]: "studio",
    };
    return map[productId] ?? "free";
}

export type Auth = typeof auth;
