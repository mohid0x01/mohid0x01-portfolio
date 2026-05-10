/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

const SoundContext = createContext();
export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("isMuted") === "true";
  });

  const hoverAudio = useRef(new Audio("/sounds/hover_sound.wav"));
  const clickAudio = useRef(new Audio("/sounds/click_sound.wav"));

  useEffect(() => {
    localStorage.setItem("isMuted", isMuted);
  }, [isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const playHover = useCallback(() => {
    if (isMuted) return;
    hoverAudio.current.currentTime = 0;
    hoverAudio.current.volume = 0.2;
    hoverAudio.current.play().catch(() => {});
  }, [isMuted]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    clickAudio.current.currentTime = 0;
    clickAudio.current.volume = 0.4;
    clickAudio.current.play().catch(() => {});
  }, [isMuted]);

  return (
    <SoundContext.Provider
      value={{ playHover, playClick, isMuted, toggleMute }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundEffects = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundEffects must be used within a SoundProvider");
  }
  return context;
};
