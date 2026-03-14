import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const resolvedParams = await params;
        const projectId = resolvedParams.id;

        // Ensure the user actually owns this project before deleting
        const result = await db.delete(projects)
            .where(and(eq(projects.id, projectId), eq(projects.userId, session.user.id)))
            .returning();

        if (result.length === 0) {
            return NextResponse.json({ error: "Project not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error("[/api/projects/[id]] DELETE Error:", err);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
