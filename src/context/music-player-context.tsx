/* eslint-disable react-hooks/exhaustive-deps */
"use client";

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
  isRepeat: boolean;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (time: number) => void;
  setSong: (song: Song) => void;
  toggleRepeat: () => void;
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
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const toggleRepeat = () => {
    setIsRepeat((prev) => !prev);
  };

  // Restart current song
  const restartCurrentSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
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

  // Handle song ending
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleEnded = () => {
      if (isRepeat) {
        restartCurrentSong();
      } else {
        playNext();
      }
    };

    audioElement.addEventListener("ended", handleEnded);
    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, currentSong]);

  // Auto-play when song changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        isRepeat,
        play,
        pause,
        setVolume: handleVolumeChange,
        playNext,
        playPrevious,
        seekTo,
        setSong,
        toggleRepeat,
      }}
    >
      {children}
      <audio ref={audioRef} src={currentSong?.audioUrl} />
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
