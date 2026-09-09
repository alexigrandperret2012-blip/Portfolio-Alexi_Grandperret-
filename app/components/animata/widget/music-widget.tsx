"use client";

import { Music, Music2, Music3, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";
import { absoluteUrl, cn } from "@/app/lib/utils";

export type MusicTrack = {
  title: string;
  artist: string;
};

export type MusicWidgetProps = {
  className?: string;
  tracks?: MusicTrack[];
  coverUrl?: string;
  defaultPlaying?: boolean;
  compact?: boolean;
};

const DEFAULT_TRACKS: MusicTrack[] = [
  { title: "Never Gonna Give You Up", artist: "Rick Astley" },
  { title: "It Must Have Been Love", artist: "Roxette" },
  { title: "Take On Me", artist: "A-ha" },
];

export default function MusicWidget({
  className,
  tracks = DEFAULT_TRACKS,
  coverUrl = absoluteUrl("/widget/music.jpg"),
  defaultPlaying = false,
  compact = false,
}: MusicWidgetProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(defaultPlaying);

  const safeTracks = tracks.length > 0 ? tracks : DEFAULT_TRACKS;
  const track = safeTracks[index % safeTracks.length];

  if (compact) {
    return (
      <div
        className={cn(
          "flex w-[238px] items-center gap-1.5 rounded-xl border border-white/14 bg-[linear-gradient(180deg,rgba(45,48,76,0.92),rgba(35,36,60,0.9))] p-2 text-white shadow-[0_12px_34px_rgba(0,0,0,0.28)] backdrop-blur-md",
          className,
        )}
      >
        <img src={coverUrl} alt="" className="size-8 shrink-0 rounded-lg object-cover" />

        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 font-mono text-[11px] font-semibold leading-tight text-metal-light">
            {track.title}
          </p>
          <p className="line-clamp-1 text-[10px] text-text-dim">{track.artist}</p>
        </div>

        <button
          type="button"
          aria-label="Previous track"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-dim transition hover:bg-white/8 hover:text-metal-light"
          onClick={() => setIndex((i) => (i - 1 + safeTracks.length) % safeTracks.length)}
        >
          <SkipBack className="size-3.5" />
        </button>

        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#2b3160] transition hover:bg-white"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
        </button>

        <button
          type="button"
          aria-label="Next track"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-dim transition hover:bg-white/8 hover:text-metal-light"
          onClick={() => setIndex((i) => (i + 1) % safeTracks.length)}
        >
          <SkipForward className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex size-52 flex-col rounded-3xl bg-gradient-to-br from-[#5a72df] to-[#1c2560] p-4 text-white shadow-md",
        className,
      )}
    >
      <div className="relative flex min-h-0 flex-1 flex-col justify-between">
        <div className="flex gap-2">
          <img src={coverUrl} alt="" className="size-20 shrink-0 rounded-2xl object-cover" />
          <div className="ms-auto flex h-fit flex-wrap justify-end gap-0.5" aria-hidden>
            <Music2 size={16} className={cn("transition-all", playing ? "animate-pulse" : "opacity-30")} />
            <Music3 size={14} className={cn("transition-all", playing ? "animate-pulse" : "opacity-30")} />
            <Music size={18} className={cn("transition-all", playing ? "animate-pulse" : "opacity-30")} />
          </div>
        </div>

        <div className="space-y-0.5">
          <p className="line-clamp-1 text-sm font-semibold leading-tight">{track.title}</p>
          <p className="line-clamp-1 text-xs font-medium text-indigo-200">{track.artist}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-evenly">
        <button
          type="button"
          aria-label="Previous track"
          className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full"
          onClick={() => setIndex((i) => (i - 1 + safeTracks.length) % safeTracks.length)}
        >
          <SkipBack className="size-5 fill-current" />
        </button>

        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause className="size-6 fill-current" /> : <Play className="size-6 fill-current" />}
        </button>

        <button
          type="button"
          aria-label="Next track"
          className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full"
          onClick={() => setIndex((i) => (i + 1) % safeTracks.length)}
        >
          <SkipForward className="size-5 fill-current" />
        </button>
      </div>
    </div>
  );
}
