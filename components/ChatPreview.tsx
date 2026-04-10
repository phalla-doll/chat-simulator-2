import React, { useEffect, useRef } from 'react';
import { Message, Theme } from '@/lib/chat';
import { IMessageTheme } from './themes/IMessageTheme';
import { InstagramTheme } from './themes/InstagramTheme';
import { MessengerTheme } from './themes/MessengerTheme';

interface ChatPreviewProps {
  messages: Message[];
  currentIndex: number;
  theme: Theme;
  personAName: string;
  personBName: string;
}

export function ChatPreview({
  messages,
  currentIndex,
  theme,
  personAName,
  personBName,
}: ChatPreviewProps) {
  const visibleMessages = messages.slice(0, currentIndex + 1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentIndex]);

  const renderTheme = () => {
    switch (theme) {
      case 'imessage':
        return <IMessageTheme messages={visibleMessages} personAName={personAName} personBName={personBName} />;
      case 'instagram':
        return <InstagramTheme messages={visibleMessages} personAName={personAName} personBName={personBName} />;
      case 'messenger':
        return <MessengerTheme messages={visibleMessages} personAName={personAName} personBName={personBName} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#e5e5e5] p-8 overflow-hidden">
      {/* Phone container */}
      <div className="relative w-[375px] h-[812px] bg-white rounded-[48px] shadow-2xl overflow-hidden border-[8px] border-gray-900 flex flex-col">
        {/* Notch placeholder */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar" ref={scrollRef}>
          {renderTheme()}
        </div>
      </div>
    </div>
  );
}
