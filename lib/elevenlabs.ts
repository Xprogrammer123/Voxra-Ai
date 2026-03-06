export async function generateSpeech(text: string, voiceId: string, speed: number = 1.0): Promise<ArrayBuffer | { error: string }> {
    try {
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
            },
            body: JSON.stringify({
                text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    speed,
                },
            }),
        });

        if (!res.ok) {
            throw new Error(`ElevenLabs API error: ${res.statusText}`);
        }

        const arrayBuffer = await res.arrayBuffer();
        return arrayBuffer;
    } catch (err: any) {
        return { error: err.message };
    }
}
