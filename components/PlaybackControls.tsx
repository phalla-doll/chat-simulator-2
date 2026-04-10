import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { PlaybackState } from '@/hooks/use-simulation';
import { PlaybackSpeed } from '@/lib/chat';

interface PlaybackControlsProps {
  playbackState: PlaybackState;
  play: () => void;
  pause: () => void;
  reset: () => void;
  speed: PlaybackSpeed;
  setSpeed: (speed: PlaybackSpeed) => void;
}

export function PlaybackControls({
  playbackState,
  play,
  pause,
  reset,
  speed,
  setSpeed,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-transparent border-t border-[#2A2A2A]">
      <div className="flex items-center space-x-2">
        {playbackState === 'playing' ? (
          <button
            onClick={pause}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2A2A2A] hover:bg-[#3E3E3E] text-white transition-colors"
            title="Pause"
          >
            <Pause className="w-4 h-4 fill-current" />
          </button>
        ) : (
          <button
            onClick={play}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#3ECF8E] hover:bg-[#34B27A] text-[#1C1C1C] transition-colors"
            title="Play"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </button>
        )}
        
        <button
          onClick={reset}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent hover:bg-[#2A2A2A] text-gray-400 hover:text-white transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 bg-[#2A2A2A] p-0.5 rounded-md border border-[#3E3E3E]">
        {(['slow', 'normal', 'fast'] as PlaybackSpeed[]).map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`px-2.5 py-1 text-[11px] font-medium rounded capitalize transition-colors ${
              speed === s
                ? 'bg-[#3E3E3E] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
