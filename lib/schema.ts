import {
    pgTable, text, timestamp, integer, jsonb, pgEnum, boolean
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────────────────────
export const platformEnum = pgEnum("platform", ["tiktok", "reels", "shorts", "youtube", "linkedin"]);
export const formatEnum = pgEnum("format", ["9:16", "16:9", "1:1"]);
export const statusEnum = pgEnum("status", ["pending", "processing", "done", "failed"]);
export const subtitleStyleEnum = pgEnum("subtitle_style", ["plain", "highlight", "box", "outline"]);
export const transitionStyleEnum = pgEnum("transition_style", ["cut", "fade", "slide", "zoom"]);
export const videoStyleEnum = pgEnum("video_style", ["stock", "ai", "broll", "minimal"]);

// ─── Better Auth Tables ───────────────────────────────────────────────────
export const user = pgTable("user", {
    id:              text("id").primaryKey(),
    name:            text("name").notNull(),
    email:           text("email").notNull().unique(),
    emailVerified:   boolean("email_verified").notNull().default(false),
    image:           text("image"),
    createdAt:       timestamp("created_at").notNull().defaultNow(),
    updatedAt:       timestamp("updated_at").notNull().defaultNow(),
    // Added by @polar-sh/better-auth plugin
    polarCustomerId: text("polar_customer_id"),
    plan:            text("plan").default("free"),
});

export const session = pgTable("session", {
    id:        text("id").primaryKey(),
    userId:    text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    token:     text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const account = pgTable("account", {
    id:                    text("id").primaryKey(),
    userId:                text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    accountId:             text("account_id").notNull(),
    providerId:            text("provider_id").notNull(),
    accessToken:           text("access_token"),
    refreshToken:          text("refresh_token"),
    accessTokenExpiresAt:  timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope:                 text("scope"),
    idToken:               text("id_token"),
    password:              text("password"),
    createdAt:             timestamp("created_at").notNull().defaultNow(),
    updatedAt:             timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
    id:         text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value:      text("value").notNull(),
    expiresAt:  timestamp("expires_at").notNull(),
    createdAt:  timestamp("created_at").notNull().defaultNow(),
    updatedAt:  timestamp("updated_at").notNull().defaultNow(),
});

// ─── Projects ────────────────────────────────────────────────────────────
export const projects = pgTable("projects", {
    id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:    text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    name:      text("name").notNull(),
    platform:  platformEnum("platform").notNull().default("tiktok"),
    format:    formatEnum("format").notNull().default("9:16"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Videos ──────────────────────────────────────────────────────────────
export const videos = pgTable("videos", {
    id:            text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    projectId:     text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    userId:        text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    scriptText:    text("script_text").notNull(),
    voiceId:       text("voice_id"),
    musicId:       text("music_id"),
    stylePreset:   jsonb("style_preset"),
    status:        statusEnum("status").notNull().default("pending"),
    runwayTaskId:  text("runway_task_id"),
    audioUrl:      text("audio_url"),
    subtitlesJson: jsonb("subtitles_json"),
    outputUrls:    jsonb("output_urls"),       // { "9:16": url, "16:9": url, "1:1": url }
    durationSecs:  integer("duration_secs"),
    platform:      platformEnum("platform"),
    phase:         text("phase"),              // tts | subtitles | footage | assembly | done
    progress:      integer("progress").default(0),
    createdAt:     timestamp("created_at").notNull().defaultNow(),
});

// ─── Style Presets ────────────────────────────────────────────────────────
export const presets = pgTable("presets", {
    id:              text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:          text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    name:            text("name").notNull(),
    voiceId:         text("voice_id"),
    musicId:         text("music_id"),
    font:            text("font"),
    primaryColor:    text("primary_color"),
    subtitleStyle:   subtitleStyleEnum("subtitle_style").default("plain"),
    transitionStyle: transitionStyleEnum("transition_style").default("cut"),
    videoStyle:      videoStyleEnum("video_style").default("stock"),
    createdAt:       timestamp("created_at").notNull().defaultNow(),
});

// ─── Types ────────────────────────────────────────────────────────────────
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
export type Preset = typeof presets.$inferSelect;
export type NewPreset = typeof presets.$inferInsert;