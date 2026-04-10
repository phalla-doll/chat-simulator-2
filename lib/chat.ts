export type MessageSide = 'left' | 'right';

export interface Message {
  id: string;
  side: MessageSide;
  text: string;
}

export type Theme = 'imessage' | 'instagram' | 'messenger';
export type PlaybackSpeed = 'slow' | 'normal' | 'fast';

export function parseScript(script: string): Message[] {
  return script
    .split('\n')
    .map((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('>')) {
        return {
          id: `msg-${index}`,
          side: 'right' as MessageSide,
          text: trimmed.substring(1).trim(),
        };
      }
      if (trimmed.startsWith('<')) {
        return {
          id: `msg-${index}`,
          side: 'left' as MessageSide,
          text: trimmed.substring(1).trim(),
        };
      }
      return null;
    })
    .filter((msg): msg is Message => msg !== null);
}

export const SPEED_MAP: Record<PlaybackSpeed, number> = {
  slow: 2000,
  normal: 1200,
  fast: 600,
};
