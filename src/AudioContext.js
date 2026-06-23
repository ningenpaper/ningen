import { createContext, useContext, useRef, useState } from "react";

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadingId, setLoadingId] = useState(null);

  function playItem(item) {
    if (!item.audioUrl) return;

    if (playingId === item.id) {
      if (audioRef.current?.paused) {
        audioRef.current.play();
        setIsPaused(false);
      } else {
        audioRef.current?.pause();
        setIsPaused(true);
      }
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(item.audioUrl);
    audioRef.current = audio;
    setPlayingId(item.id);
    setLoadingId(item.id);
    setIsPaused(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    audio.play().catch(console.error);
    audio.addEventListener("playing", () => setLoadingId(null));
    audio.addEventListener("error", () => setLoadingId(null));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration || 0));
    audio.addEventListener("timeupdate", () => {
      const dur = audio.duration;
      setProgress(dur ? (audio.currentTime / dur) * 100 : 0);
      setCurrentTime(audio.currentTime || 0);
      if (dur) setDuration(dur);
    });
    audio.addEventListener("ended", () => {
      setPlayingId(null);
      setLoadingId(null);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
    });
  }

  return (
    <AudioCtx.Provider value={{ playingId, isPaused, progress, currentTime, duration, loadingId, playItem, audioRef }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}
