"use client";

import React, { useState, useRef } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  url: string;
  poster: string;
  title: string;
  className?: string;
}

export function VideoPlayer({ url, poster, title, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      // Firing a dataLayer event for VSLStart would go here
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black border border-[var(--color-border)] aspect-video shadow-2xl",
        className
      )}
    >
      <video
        ref={videoRef}
        src={url}
        poster={poster}
        title={title}
        className="w-full h-full object-cover"
        controls={isPlaying}
        onPause={handlePause}
        onPlay={() => setIsPlaying(true)}
        preload="none"
      >
        <track kind="captions" />
      </video>

      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group cursor-pointer"
          aria-label="Play Video"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <Play className="w-10 h-10 ml-2" />
          </div>
          <span className="text-white font-semibold text-lg drop-shadow-md">
            Assistir Apresentação
          </span>
        </button>
      )}
    </div>
  );
}
