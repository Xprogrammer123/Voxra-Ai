import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, platform, format } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Project name is required" }, { status: 400 });
        }

        const [project] = await db.insert(projects).values({
            userId:   session.user.id,
            name,
            platform: platform ?? "tiktok",
            format:   format   ?? "9:16",
        }).returning();

        return NextResponse.json({ id: project.id });

    } catch (err: any) {
        console.error("[/api/projects]", err);
        return NextResponse.json({ error: err.message ?? "Failed to create project" }, { status: 500 });
    }
}