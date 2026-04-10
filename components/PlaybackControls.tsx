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
    <div className="flex items-center justify-between px-6 py-4 bg-transparent border-t border-gray-100">
      <div className="flex items-center space-x-2">
        {playbackState === 'playing' ? (
          <button
            onClick={pause}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200/60 hover:bg-gray-200 text-gray-900 transition-colors"
            title="Pause"
          >
            <Pause className="w-4 h-4 fill-current" />
          </button>
        ) : (
          <button
            onClick={play}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black hover:bg-gray-800 text-white transition-colors"
            title="Play"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </button>
        )}
        
        <button
          onClick={reset}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent hover:bg-gray-200/60 text-gray-500 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 bg-gray-200/50 p-0.5 rounded-md">
        {(['slow', 'normal', 'fast'] as PlaybackSpeed[]).map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`px-2.5 py-1 text-[11px] font-medium rounded capitalize transition-colors ${
              speed === s
                ? 'bg-white text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
