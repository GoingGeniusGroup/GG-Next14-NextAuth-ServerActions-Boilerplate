export interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number; // in seconds
}

export interface MusicPlayerProps {
  songs: Song[];
  initialSongId?: string;
}
