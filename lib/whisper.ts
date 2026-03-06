export async function generateSubtitles(audioUrl: string): Promise<any | { error: string }> {
    try {
        // In a real app we'd fetch the audio from the URL and send to Whisper
        // For this hackathon, we'll assume we pass a URL or a buffer.
        // E.g., const audioBuffer = await fetch(audioUrl).then(r => r.arrayBuffer());

        const formData = new FormData();
        // formData.append("file", new Blob([audioBuffer]), "audio.mp3");
        formData.append("model", "whisper-1");
        formData.append("response_format", "verbose_json");
        formData.append("timestamp_granularities[]", "word");

        const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Whisper API error: ${res.statusText}`);
        }

        return await res.json();
    } catch (err: any) {
        return { error: err.message };
    }
}
