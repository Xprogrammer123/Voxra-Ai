import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET || "",
    onPayload: async (payload) => {
        // Basic webhook logging—Better Auth plugin handles the actual DB sync for us
        console.log("Polar webhook event received:", payload.type);
    },
});
