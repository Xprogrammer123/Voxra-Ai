import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { ai } from "@/lib/google";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        // Retry once on Neon cold start timeout
        let session = null;
        try {
            session = await auth.api.getSession({ headers: await headers() });
        } catch {
            await new Promise(r => setTimeout(r, 2000));
            session = await auth.api.getSession({ headers: await headers() });
        }
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { projectId, scriptText, voiceId, musicId, stylePreset, platform, format } = await req.json();

        if (!projectId || !scriptText) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Build Veo prompt from script
        const prompt = `Create a Minecraft-style voxel art animation video for social media.

VISUAL STYLE:
- Everything rendered in Minecraft / voxel aesthetic — blocky cubic geometry, pixel textures, 16x16 pixel art surfaces
- 3D voxel world with game-like lighting: bright ambient light, hard block shadows, torch-style warm accents
- Saturated, vivid color palette typical of Minecraft — greens, browns, blues, grays
- Subtle idle animations throughout: blocks slowly assembling, characters breathing, foliage swaying, particles floating
- Camera sweeps smoothly through the voxel scene like a cinematic Minecraft render or a Minecraft movie trailer
- No human faces, no text overlays, no watermarks, no UI elements

CONTENT DIRECTION:
- Represent this topic entirely in voxel/Minecraft form — translate every concept, object, and environment into blocky pixelated 3D equivalents: ${scriptText.slice(0, 400)}

SHOT COMPOSITION:
- Mix of sweeping wide shots of voxel landscapes, close-ups of block textures, and mid-range character/object shots
- Dynamic camera: slow dolly-ins, orbital rotations around voxel subjects, dramatic low-angle hero shots
- Blocks assembling and building up in satisfying sequences
- Particle effects: voxel sparks, pixelated smoke, floating XP orbs, block break particles

MOOD & TONE:
- Epic, cinematic, game-trailer energy
- Feels like a high-budget Minecraft animation or a Mojang Studios official render
- Think: Minecraft Movie trailer meets a viral TikTok voxel art showcase`;

        // Kick off Veo job
        const operation = await ai.models.generateVideos({
            model: "veo-2.0-generate-001",
            prompt,
            config: {
                aspectRatio: format ?? "9:16",
                durationSeconds: 8,
                numberOfVideos: 1,
            },
        });

        // Create video record
        const [video] = await db.insert(videos).values({
            projectId,
            userId:       session.user.id,
            scriptText,
            voiceId:      voiceId   ?? null,
            musicId:      musicId   ?? null,
            stylePreset:  stylePreset ?? null,
            platform:     platform  ?? "tiktok",
            status:       "processing",
            phase:        "footage",
            progress:     10,
            runwayTaskId: operation.name ?? null,
        }).returning();

        return NextResponse.json({ taskId: video.id });

    } catch (err: any) {
        console.error("[/api/generate]", err);
        return NextResponse.json({ error: err.message ?? "Generation failed" }, { status: 500 });
    }
}