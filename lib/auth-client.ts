import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    // ─── Polar plugin — add back once Polar is configured ───
    // plugins: [polarClient()],
});

export const {
    signIn,
    signOut,
    signUp,
    useSession,
} = authClient;