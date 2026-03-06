import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";

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
    // ─── Polar plugin — add back once you have real product IDs from polar.sh ───
    // plugins: [
    //     polar({
    //         client: polarClient,
    //         createCustomerOnSignUp: true,
    //         use: [
    //             checkout({
    //                 products: [
    //                     { productId: process.env.POLAR_STARTER_PRODUCT_ID!, slug: "starter" },
    //                     { productId: process.env.POLAR_CREATOR_PRODUCT_ID!, slug: "creator" },
    //                     { productId: process.env.POLAR_STUDIO_PRODUCT_ID!, slug: "studio" },
    //                 ],
    //                 successUrl: "/dashboard?upgraded=true",
    //                 authenticatedUsersOnly: true,
    //             }),
    //             portal(),
    //             webhooks({
    //                 secret: process.env.POLAR_WEBHOOK_SECRET!,
    //                 onCustomerStateChanged: async (payload) => {
    //                     const plan = payload.activeSubscriptions?.[0]?.productId
    //                         ? getPlanFromProductId(payload.activeSubscriptions[0].productId)
    //                         : "free";
    //                     await db
    //                         .update(schema.user as any)
    //                         .set({ plan } as any)
    //                         .where(eq((schema.user as any).polarCustomerId, payload.customerId));
    //                 },
    //                 onOrderPaid: async (payload) => {
    //                     console.log("Order paid:", payload.data.id);
    //                 },
    //             }),
    //         ],
    //     }),
    // ],
});

export type Auth = typeof auth;

// ─── Uncomment when adding Polar back ────────────────────────────────────────
// function getPlanFromProductId(productId: string): string {
//     const map: Record<string, string> = {
//         [process.env.POLAR_STARTER_PRODUCT_ID!]: "starter",
//         [process.env.POLAR_CREATOR_PRODUCT_ID!]: "creator",
//         [process.env.POLAR_STUDIO_PRODUCT_ID!]: "studio",
//     };
//     return map[productId] ?? "free";
// }