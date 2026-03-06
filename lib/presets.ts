export interface PresetDefinition {
    id: string;
    name: string;
    voiceId: string;
    musicMood: "energetic" | "calm" | "dramatic" | "funny" | "none";
    font: string;
    primaryColor: string;
    subtitleStyle: "plain" | "highlight" | "box" | "outline";
    transitionStyle: "cut" | "fade" | "slide" | "zoom";
    videoStyle: "stock" | "ai" | "broll" | "minimal";
}

export const DEFAULT_PRESETS: PresetDefinition[] = [
    {
        id: "preset-tiktok-bold",
        name: "TikTok Bold",
        voiceId: "pNInz6obbfDQGcgMyIGC", // Adam
        musicMood: "energetic",
        font: "Inter, sans-serif",
        primaryColor: "#92cc41", // Voxra green
        subtitleStyle: "highlight",
        transitionStyle: "cut",
        videoStyle: "ai",
    },
    {
        id: "preset-youtube-chill",
        name: "YouTube Chill",
        voiceId: "EXAVITQu4vr4xnSDxMaL", // Bella
        musicMood: "calm",
        font: "Roboto, sans-serif",
        primaryColor: "#209cee", // Voxra blue
        subtitleStyle: "box",
        transitionStyle: "fade",
        videoStyle: "broll",
    },
];
