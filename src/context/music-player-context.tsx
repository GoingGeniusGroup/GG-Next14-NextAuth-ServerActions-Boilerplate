import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Song, MusicPlayerProps } from "@/core/types/songs";

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (time: number) => void;
  setSong: (song: Song) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

export const MusicPlayerProvider: React.FC<
  React.PropsWithChildren<MusicPlayerProps>
> = ({ children, songs, initialSongId }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(
    initialSongId
      ? songs.find((song) => song.id === initialSongId) || songs[0]
      : songs[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Play current song
  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  // Pause current song
  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  // Set volume
  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  // Play next song
  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  // Play previous song
  const playPrevious = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  // Seek to specific time
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Set a specific song
  const setSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  // Update current time and duration
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const updateCurrentTime = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const updateDuration = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("timeupdate", updateCurrentTime);
    audioElement.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
      audioElement.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong]);

  // Autoplay next song when current song ends
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleEnded = () => {
      playNext();
    };

    audioElement.addEventListener("ended", handleEnded);
    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, songs]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        play,
        pause,
        setVolume: handleVolumeChange,
        playNext,
        playPrevious,
        seekTo,
        setSong,
      }}
    >
      {children}
      <audio ref={audioRef} src={currentSong?.audioUrl} autoPlay={isPlaying} />
    </MusicPlayerContext.Provider>
  );
};

// Custom hook to use the MusicPlayerContext
export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
