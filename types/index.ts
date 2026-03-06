export interface UploadedAsset {
    id: string;
    url: string;
    type: "image" | "video";
    name: string;
}

export interface ComponentProps {
    className?: string;
    children?: React.ReactNode;
}
