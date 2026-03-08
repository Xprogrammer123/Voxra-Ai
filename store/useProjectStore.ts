import { create } from "zustand";
import { UploadedAsset } from "@/types";

interface ProjectState {
  scriptText: string;
  voiceId: string;
  musicMood: string;
  musicId: string;
  stylePreset: string;
  assets: UploadedAsset[];
  currentStep: number;
  stepsCompleted: number[];

  setScriptText: (script: string) => void;
  setVoiceId: (id: string) => void;
  setMusicMood: (mood: string) => void;
  setMusicId: (id: string) => void;
  setStylePreset: (id: string) => void;
  addAsset: (asset: UploadedAsset) => void;
  removeAsset: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  scriptText: "",
  voiceId: "",
  musicMood: "none",
  musicId: "none",
  stylePreset: "",
  assets: [],
  currentStep: 1,
  stepsCompleted: [],

  setScriptText: (script) => set({ scriptText: script }),
  setVoiceId: (id) => set({ voiceId: id }),
  setMusicMood: (mood) => set({ musicMood: mood }),
  setMusicId: (id) => set({ musicId: id }),
  setStylePreset: (id) => set({ stylePreset: id }),
  addAsset: (asset) =>
    set((state) => ({ assets: [...state.assets, asset] })),
  removeAsset: (id) =>
    set((state) => ({
      assets: state.assets.filter((a) => a.id !== id),
    })),
  nextStep: () =>
    set((state) => {
      const nextStep = Math.min(state.currentStep + 1, 5);
      const newStepsCompleted = state.stepsCompleted.includes(
        state.currentStep,
      )
        ? state.stepsCompleted
        : [...state.stepsCompleted, state.currentStep];
      return { currentStep: nextStep, stepsCompleted: newStepsCompleted };
    }),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  reset: () =>
    set({
      scriptText: "",
      voiceId: "",
      musicMood: "none",
      musicId: "none",
      stylePreset: "",
      assets: [],
      currentStep: 1,
      stepsCompleted: [],
    }),
}));


