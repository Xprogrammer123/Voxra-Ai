import { GoogleGenAI } from "@google/genai";
import dns from "node:dns";

// Fix for Node.js fetch Connect Timeout (IPv6 resolution hanging on api.gemini.google.com)
dns.setDefaultResultOrder("ipv4first");

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
}

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });