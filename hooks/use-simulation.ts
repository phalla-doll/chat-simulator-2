import { useState, useEffect, useCallback, useRef } from 'react';
import { Message, PlaybackSpeed, SPEED_MAP } from '@/lib/chat';

export type PlaybackState = 'idle' | 'playing' | 'paused' | 'finished';

export function useSimulation(messages: Message[], speed: PlaybackSpeed) {
  const [internalIndex, setInternalIndex] = useState(-1);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    if (messages.length === 0) return;
    if (playbackState === 'idle' || playbackState === 'finished') {
      setInternalIndex(-1);
    }
    setPlaybackState('playing');
  }, [messages.length, playbackState]);

  const pause = useCallback(() => {
    setPlaybackState('paused');
  }, []);

  const reset = useCallback(() => {
    setInternalIndex(-1);
    setPlaybackState('idle');
  }, []);

  useEffect(() => {
    if (playbackState === 'playing') {
      // If we somehow are playing but already at the end, just stop.
      // We use a timeout to avoid synchronous setState in the effect body.
      if (internalIndex >= messages.length - 1) {
        const t = setTimeout(() => setPlaybackState('finished'), 0);
        return () => clearTimeout(t);
      }

      const delay = SPEED_MAP[speed];
      const actualDelay = internalIndex === -1 ? 300 : delay;

      timerRef.current = setTimeout(() => {
        setInternalIndex((prev) => {
          const next = prev + 1;
          if (next >= messages.length - 1) {
            setPlaybackState('finished');
          }
          return next;
        });
      }, actualDelay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [playbackState, internalIndex, messages.length, speed]);

  // When idle, show all messages so the user can preview their script live.
  const currentIndex = playbackState === 'idle' ? messages.length - 1 : internalIndex;

  return {
    currentIndex,
    playbackState,
    play,
    pause,
    reset,
  };
}
