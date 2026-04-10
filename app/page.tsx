'use client';

import React, { useState, useMemo } from 'react';
import { ConversationEditor } from '@/components/ConversationEditor';
import { ChatPreview } from '@/components/ChatPreview';
import { PlaybackControls } from '@/components/PlaybackControls';
import { useSimulation } from '@/hooks/use-simulation';
import { Theme, PlaybackSpeed, parseScript } from '@/lib/chat';

const DEFAULT_SCRIPT = `> hey!
< hi!
> are you coming later?
< yeah, around 7
> cool, see you then
< see ya`;

export default function Home() {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [personAName, setPersonAName] = useState('Me');
  const [personBName, setPersonBName] = useState('Alex');
  const [theme, setTheme] = useState<Theme>('imessage');
  const [speed, setSpeed] = useState<PlaybackSpeed>('normal');

  const messages = useMemo(() => parseScript(script), [script]);

  const { currentIndex, playbackState, play, pause, reset } = useSimulation(
    messages,
    speed
  );

  return (
    <main className="flex h-screen w-full bg-[#1C1C1C] overflow-hidden font-sans text-gray-200">
      {/* Left Panel: Editor & Controls */}
      <div className="w-[360px] flex flex-col flex-shrink-0 border-r border-[#2A2A2A] bg-[#1C1C1C] z-10 relative">
        <div className="flex-1 overflow-hidden">
          <ConversationEditor
            script={script}
            setScript={setScript}
            personAName={personAName}
            setPersonAName={setPersonAName}
            personBName={personBName}
            setPersonBName={setPersonBName}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
        <PlaybackControls
          playbackState={playbackState}
          play={play}
          pause={pause}
          reset={reset}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>

      {/* Right Panel: Preview Stage */}
      <ChatPreview
        messages={messages}
        currentIndex={currentIndex}
        theme={theme}
        personAName={personAName}
        personBName={personBName}
      />
    </main>
  );
}
