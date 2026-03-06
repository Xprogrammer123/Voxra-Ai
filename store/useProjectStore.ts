import { create } from 'zustand';
import { UploadedAsset } from '@/types';

interface ProjectState {
    script: string;
    voiceId: string;
    musicMood: string;
    stylePresetId: string;
    assets: UploadedAsset[];

    setScript: (script: string) => void;
    setVoiceId: (id: string) => void;
    setMusicMood: (mood: string) => void;
    setStylePresetId: (id: string) => void;
    addAsset: (asset: UploadedAsset) => void;
    removeAsset: (id: string) => void;
    reset: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    script: '',
    voiceId: '',
    musicMood: 'none',
    stylePresetId: '',
    assets: [],

    setScript: (script) => set({ script }),
    setVoiceId: (id) => set({ voiceId: id }),
    setMusicMood: (mood) => set({ musicMood: mood }),
    setStylePresetId: (id) => set({ stylePresetId: id }),
    addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
    removeAsset: (id) => set((state) => ({ assets: state.assets.filter(a => a.id !== id) })),
    reset: () => set({
        script: '',
        voiceId: '',
        musicMood: 'none',
        stylePresetId: '',
        assets: [],
    })
}));
