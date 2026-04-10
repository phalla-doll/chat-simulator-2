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
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        {playbackState === 'playing' ? (
          <button
            onClick={pause}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors"
            title="Pause"
          >
            <Pause className="w-5 h-5 fill-current" />
          </button>
        ) : (
          <button
            onClick={play}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            title="Play"
          >
            <Play className="w-5 h-5 fill-current ml-1" />
          </button>
        )}
        
        <button
          onClick={reset}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
        {(['slow', 'normal', 'fast'] as PlaybackSpeed[]).map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
              speed === s
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
