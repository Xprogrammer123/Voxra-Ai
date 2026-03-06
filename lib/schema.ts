import {
    pgTable, text, timestamp, integer, jsonb, pgEnum
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────────────────────
export const platformEnum = pgEnum("platform", ["tiktok", "reels", "shorts", "youtube", "linkedin"]);
export const formatEnum = pgEnum("format", ["9:16", "16:9", "1:1"]);
export const statusEnum = pgEnum("status", ["pending", "processing", "done", "failed"]);
export const subtitleStyleEnum = pgEnum("subtitle_style", ["plain", "highlight", "box", "outline"]);
export const transitionStyleEnum = pgEnum("transition_style", ["cut", "fade", "slide", "zoom"]);
export const videoStyleEnum = pgEnum("video_style", ["stock", "ai", "broll", "minimal"]);

// ─── Projects ────────────────────────────────────────────────────────────
export const projects = pgTable("projects", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(),              // references Better Auth user.id
    name: text("name").notNull(),
    platform: platformEnum("platform").notNull().default("tiktok"),
    format: formatEnum("format").notNull().default("9:16"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Videos ──────────────────────────────────────────────────────────────
export const videos = pgTable("videos", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    scriptText: text("script_text").notNull(),
    voiceId: text("voice_id"),
    musicId: text("music_id"),
    stylePreset: jsonb("style_preset"),
    status: statusEnum("status").notNull().default("pending"),
    runwayTaskId: text("runway_task_id"),
    audioUrl: text("audio_url"),
    subtitlesJson: jsonb("subtitles_json"),
    outputUrls: jsonb("output_urls"),              // { "9:16": url, "16:9": url, "1:1": url }
    durationSecs: integer("duration_secs"),
    platform: platformEnum("platform"),
    phase: text("phase"),                     // tts | subtitles | footage | assembly | done
    progress: integer("progress").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Style Presets ────────────────────────────────────────────────────────
export const presets = pgTable("presets", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    voiceId: text("voice_id"),
    musicId: text("music_id"),
    font: text("font"),
    primaryColor: text("primary_color"),
    subtitleStyle: subtitleStyleEnum("subtitle_style").default("plain"),
    transitionStyle: transitionStyleEnum("transition_style").default("cut"),
    videoStyle: videoStyleEnum("video_style").default("stock"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Types ────────────────────────────────────────────────────────────────
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
export type Preset = typeof presets.$inferSelect;
export type NewPreset = typeof presets.$inferInsert;
