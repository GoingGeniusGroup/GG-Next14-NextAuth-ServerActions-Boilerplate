export interface ImagePost {
  img_id: string;
  description: string | null;
  image_url: string;
  caption: string;
}

export interface GalleryCard {
  img_id?: string;
  index: number;
  content: JSX.Element;
  className: string;
  thumbnail: string;
  blurDataURL?: string; // For image placeholder
}
