import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { ai } from "@/lib/google";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const VEO_PROMPT_PREFIX = `Create a Minecraft-style voxel art animation video for social media.

VISUAL STYLE:
- Everything rendered in Minecraft / voxel aesthetic — blocky cubic geometry, pixel textures, 16x16 pixel art surfaces
- 3D voxel world with game-like lighting: bright ambient light, hard block shadows, torch-style warm accents
- Saturated, vivid color palette typical of Minecraft — greens, browns, blues, grays
- Subtle idle animations throughout: blocks slowly assembling, characters breathing, foliage swaying, particles floating
- Camera sweeps smoothly through the voxel scene like a cinematic Minecraft render or a Minecraft movie trailer
- No human faces, no text overlays, no watermarks, no UI elements

CONTENT DIRECTION:
`;

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {
            projectId,
            scriptText,
            voiceId,
            musicId,
            stylePreset,
            assets,
            platform,
            format,
            generationMode = "image", // "image" | "video"
        } = await req.json();

        if (!projectId || !scriptText) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let operationName: string | null = null;

        if (generationMode === "video") {
            // --- Veo 3 video generation (requires billing) ---
            const prompt = `${VEO_PROMPT_PREFIX}${scriptText.slice(0, 400)}

SHOT COMPOSITION:
- Mix of sweeping wide shots of voxel landscapes, close-ups of block textures, and mid-range character/object shots
- Dynamic camera: slow dolly-ins, orbital rotations around voxel subjects, dramatic low-angle hero shots
- Blocks assembling and building up in satisfying sequences
- Particle effects: voxel sparks, pixelated smoke, floating XP orbs, block break particles

MOOD & TONE:
- Epic, cinematic, game-trailer energy
- Feels like a high-budget Minecraft animation or a Mojang Studios official render`;

            try {
                const operation = await ai.models.generateVideos({
                    model: "veo-3.0-generate-001",
                    prompt,
                    config: {
                        aspectRatio: format ?? "9:16",
                        durationSeconds: 8,
                        numberOfVideos: 1,
                    },
                });
                operationName = operation.name ?? null;
            } catch (apiErr: any) {
                console.error("[/api/generate] Veo error:", apiErr.message);
                return NextResponse.json({ error: apiErr.message ?? "Veo generation failed" }, { status: 500 });
            }

            if (!operationName) {
                return NextResponse.json({ error: "Veo returned no operation name" }, { status: 500 });
            }

        } else {
            // --- Imagen 3 image slideshow (free tier) ---
            // Split script into up to 5 scene prompts
            const scenes = splitIntoScenes(scriptText, 5);

            // Kick off first image generation to validate API key immediately
            // All scene generations happen in the poll route progressively
            try {
                const testResponse = await ai.models.generateImages({
                    model: "imagen-3.0-generate-002",
                    prompt: buildImagenPrompt(scenes[0]),
                    config: { numberOfImages: 1, aspectRatio: format ?? "9:16" },
                });
                if (!testResponse.generatedImages?.length) {
                    return NextResponse.json({ error: "Imagen returned no images" }, { status: 500 });
                }
            } catch (apiErr: any) {
                console.error("[/api/generate] Imagen error:", apiErr.message);
                return NextResponse.json({ error: apiErr.message ?? "Image generation failed" }, { status: 500 });
            }

            // Store scenes as the operation name so poll route can process them
            operationName = `imagen-scenes:${JSON.stringify(scenes)}`;
        }

        // Create video record
        const [video] = await db.insert(videos).values({
            projectId,
            userId: session.user.id,
            scriptText,
            voiceId: voiceId ?? null,
            musicId: musicId ?? null,
            stylePreset: stylePreset ?? null,
            assets: assets ?? null,
            platform: platform ?? "tiktok",
            status: "processing",
            phase: "footage",
            progress: 10,
            runwayTaskId: operationName,
        }).returning();

        return NextResponse.json({ taskId: video.id, generationMode });

    } catch (err: any) {
        console.error("[/api/generate]", err);
        return NextResponse.json({ error: err.message ?? "Generation failed" }, { status: 500 });
    }
}

// Split script into N scene descriptions
function splitIntoScenes(script: string, maxScenes: number): string[] {
    const sentences = script.match(/[^.!?]+[.!?]+/g) ?? [script];
    const chunkSize = Math.ceil(sentences.length / maxScenes);
    const scenes: string[] = [];
    for (let i = 0; i < sentences.length; i += chunkSize) {
        scenes.push(sentences.slice(i, i + chunkSize).join(" ").trim());
        if (scenes.length >= maxScenes) break;
    }
    return scenes.length > 0 ? scenes : [script];
}

// Build Imagen prompt for a scene
function buildImagenPrompt(scene: string): string {
    return `Minecraft voxel art style, blocky cubic geometry, pixel textures, cinematic lighting, vivid colors, game screenshot aesthetic. Scene: ${scene.slice(0, 300)}`;
}