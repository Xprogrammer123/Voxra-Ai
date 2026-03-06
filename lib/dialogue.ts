export const RPG_DIALOGUE = {
    tts: [
        "The voice goblin clears his throat...",
        "Summoning vocal cords from the aether...",
        "Recording in the dungeon studio...",
        "The narrator has entered the realm...",
    ],
    subtitles: [
        "The subtitle wizard is casting...",
        "Word-timing spell in progress...",
        "Enchanting your captions...",
        "Carving words into the timeline...",
    ],
    footage: [
        "The footage dragon gathers clips...",
        "Raiding the stock library vault...",
        "AI painter rendering your scenes...",
        "Collecting visual loot...",
    ],
    assembly: [
        "Master Editor assembling the final cut...",
        "Stitching frames with pixel thread...",
        "The grand video spell nears completion...",
        "Final boss: rendering...",
    ],
    done: [
        "⚔️ VICTORY! Video forged!",
        "LOOT ACQUIRED! Your video is ready.",
        "Quest complete, creator!",
        "★ CRITICAL HIT — Perfect render!",
    ],
    error: [
        "💀 THE PARTY HAS FALLEN",
        "GAME OVER — render failed. Retry?",
        "Critical failure! The goblin dropped the files.",
    ],
};

export function getDialogue(phase: keyof typeof RPG_DIALOGUE): string {
    const arr = RPG_DIALOGUE[phase];
    return arr[Math.floor(Math.random() * arr.length)];
}
