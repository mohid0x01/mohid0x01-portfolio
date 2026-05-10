import React from "react";
import MuxPlayer from "@mux/mux-player-react";

const ProjectVideoPlayer = ({ playbackId, variant = "stage" }) => {
  if (!playbackId) return null;

  const styles = {
    atmosphere: "w-full h-full object-cover scale-150 ",
    stage:
      "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105",
  };

  return (
    <div className="w-full h-full pointer-events-none">
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay="muted"
        loop
        muted
        playsInline
        className={styles[variant]}
        metadataVideoTitle="Project Preview"
      />
    </div>
  );
};

export default ProjectVideoPlayer;
