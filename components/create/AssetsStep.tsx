"use client";

import { useState, useRef, DragEvent } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import { supabase } from "@/lib/supabase";
import { UploadedAsset } from "@/types";
import { X, Loader2, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

export function AssetsStep() {
    const { assets, addAsset, removeAsset } = useProjectStore();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleFiles(e.dataTransfer.files);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await handleFiles(e.target.files);
        }
        // Reset input so the same file can be selected again if removed
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFiles = async (files: FileList) => {
        setUploadError(null);
        setIsUploading(true);

        const uploadPromises = Array.from(files).map(async (file) => {
            // Validate size (max 50MB)
            if (file.size > 50 * 1024 * 1024) {
                throw new Error(`File ${file.name} exceeds 50MB limit.`);
            }

            // Determine type
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            if (!isImage && !isVideo) {
                throw new Error(`File ${file.name} is not a supported format.`);
            }

            const type = isImage ? "image" : "video";
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `user-uploads/${fileName}`;

            // Upload to Supabase Storage 'project-assets' bucket
            const { data, error } = await supabase.storage
                .from("project-assets")
                .upload(filePath, file, { upsert: false });

            if (error) {
                throw new Error(`Failed to upload ${file.name}: ${error.message}`);
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from("project-assets")
                .getPublicUrl(filePath);

            const asset: UploadedAsset = {
                id: fileName,    // unique enough for local keying
                url: urlData.publicUrl,
                type,
                name: file.name
            };

            addAsset(asset);
        });

        try {
            await Promise.all(uploadPromises);
        } catch (error: any) {
            setUploadError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span style={{ color: "#f7d51d" }}>★</span>
                    <h2 className="text-xl font-black tracking-widest uppercase" style={{ color: "#f7d51d", textShadow: "2px 2px 0 #000" }}>
                        UPLOAD INVENTORY
                    </h2>
                </div>
                <p className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                    Provide custom b-roll or let Veo 3 generate footage for you.
                </p>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*,video/mp4,video/quicktime"
                className="hidden"
            />

            {/* Drop zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={(e) => {
                    // Prevent triggering if clicking something specific inside (like buttons if any were added later)
                    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName.toLowerCase() !== 'button') {
                        fileInputRef.current?.click();
                    }
                }}
                className="flex flex-col items-center justify-center gap-4 py-12 cursor-pointer transition-all duration-150 relative overflow-hidden"
                style={{
                    border: `3px dashed ${isDragging ? "#f7d51d" : "#1e1e1e"}`,
                    background: isDragging ? "#0d0d00" : "#0a0a0a"
                }}
            >
                {isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-[#f7d51d] animate-spin" />
                        <span className="text-sm font-black tracking-widest" style={{ color: "#f7d51d" }}>
                            UPLOADING LOOT...
                        </span>
                    </div>
                ) : (
                    <>
                        <span className="text-5xl transition-transform hover:scale-110">📤</span>
                        <div className="flex flex-col items-center gap-1 text-center px-4">
                            <span className="text-sm font-black tracking-widest" style={{ color: "#888" }}>
                                {isDragging ? "DROP FILES HERE" : "DRAG & DROP LOOT HERE"}
                            </span>
                            <span className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                                MP4 · MOV · PNG · JPG — MAX 50MB
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                            className="text-xs font-black tracking-widest uppercase px-5 py-2 transition-all duration-150 mt-2 hover:bg-[#f7d51d] hover:text-black"
                            style={{
                                color: "#f7d51d",
                                border: "3px solid #f7d51d",
                                boxShadow: "3px 3px 0 #000",
                            }}
                        >
                            BROWSE FILES
                        </button>
                    </>
                )}
            </div>

            {/* Error Message */}
            {
                uploadError && (
                    <div className="px-4 py-3 text-xs font-black tracking-widest flex items-center gap-2"
                        style={{ background: "#1a0000", border: "2px solid #e76e55", color: "#e76e55" }}>
                        ⚠ {uploadError}
                    </div>
                )
            }

            {/* Asset Preview List */}
            {
                assets.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-black tracking-widest" style={{ color: "#888" }}>INVENTORY ({assets.length})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {assets.map((asset) => (
                                <div key={asset.id} className="relative group rounded-md overflow-hidden bg-[#111] border-2 border-[#1e1e1e] aspect-video flex-shrink-0">
                                    {asset.type === "image" ? (
                                        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                                            <VideoIcon className="w-8 h-8 text-[#555]" />
                                        </div>
                                    )}

                                    {/* Overlay gradient & text */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 pointer-events-none">
                                        <span className="text-[9px] truncate w-full text-white/70" title={asset.name}>{asset.name}</span>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeAsset(asset.id);
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-black/60 border border-[#333] hover:border-[#e76e55] hover:bg-[#e76e55]/20 text-[#888] hover:text-[#e76e55] rounded-sm transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>

                                    {/* Type icon badge */}
                                    <div className="absolute top-2 left-2 p-1 bg-black/60 border border-[#333] rounded-sm">
                                        {asset.type === "image" ? <ImageIcon className="w-3 h-3 text-[#f7d51d]" /> : <VideoIcon className="w-3 h-3 text-[#92cc41]" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* AI fallback notice */}
            {
                assets.length === 0 && (
                    <div className="flex items-start gap-3 px-4 py-3"
                        style={{ background: "#0a0a0a", border: "2px solid #1e1e1e" }}>
                        <div className="w-6 h-6 flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5"
                            style={{ background: "#92cc41", color: "#000", border: "2px solid #fff" }}>
                            AI
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black tracking-widest" style={{ color: "#92cc41" }}>
                                VEO 3 FOOTAGE GENERATION ENABLED
                            </span>
                            <span className="text-[10px] leading-loose" style={{ color: "#555" }}>
                                Since no assets are uploaded, Veo 3 will generate cinematic footage matching your script automatically.
                            </span>
                        </div>
                    </div>
                )
            }
        </div >
    );
}