export async function generateVideoFromText(prompt: string): Promise<{ taskId: string } | { error: string }> {
    try {
        const res = await fetch("https://api.dev.runwayml.com/v1/text_to_video", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RUNWAY_API_KEY}`,
            },
            body: JSON.stringify({
                promptText: prompt,
            }),
        });

        if (!res.ok) {
            throw new Error(`Runway API error: ${res.statusText}`);
        }

        const data = await res.json();
        return { taskId: data.id };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function checkRunwayTaskStatus(taskId: string): Promise<any> {
    try {
        const res = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.RUNWAY_API_KEY}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Runway API error: ${res.statusText}`);
        }

        return await res.json();
    } catch (err: any) {
        return { error: err.message };
    }
}
