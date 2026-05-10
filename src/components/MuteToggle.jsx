import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useSoundEffects } from "../hooks/useSoundEffects";

const MuteToggle = () => {
  const { isMuted, toggleMute } = useSoundEffects();

  return (
    <button
      onClick={toggleMute}
      className="group relative p-3 flex items-center justify-center outline-none"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      <div
        className={`
        absolute inset-0 rounded-2xl border transition-all duration-500
        ${
          isMuted
            ? "bg-black/5 border-black/5 shadow-inner"
            : "bg-accent/10 border-accent/20 shadow-lg shadow-accent/5"
        }
      `}
      />
      <div
        className={`
        absolute inset-1 rounded-xl transition-all duration-500 ease-out transform
        ${isMuted ? "scale-0 opacity-0" : "scale-100 opacity-100 bg-accent/5"}
      `}
      />
      <div
        className={`
        relative z-10 text-xl transition-all duration-300
        ${
          isMuted
            ? "text-gray-400 scale-90"
            : "text-accent scale-110 rotate-0 group-hover:rotate-12"
        }
      `}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </div>
      {!isMuted && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse" />
      )}
    </button>
  );
};

export default MuteToggle;
