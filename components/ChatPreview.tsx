import React, { useEffect, useRef } from 'react';
import { Message, Theme } from '@/lib/chat';
import { IMessageTheme } from './themes/IMessageTheme';
import { InstagramTheme } from './themes/InstagramTheme';
import { MessengerTheme } from './themes/MessengerTheme';
import { Battery, Wifi, Signal } from 'lucide-react';

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
    <div className="flex-1 flex items-center justify-center bg-white p-8 overflow-hidden">
      {/* Phone container */}
      <div className="relative w-[393px] h-[852px] bg-white rounded-[55px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border-[14px] border-black flex flex-col overflow-hidden ring-1 ring-gray-200/50">
        
        {/* Hardware buttons */}
        <div className="absolute -left-[16px] top-[120px] w-[2px] h-[32px] bg-black rounded-l-md"></div>
        <div className="absolute -left-[16px] top-[170px] w-[2px] h-[60px] bg-black rounded-l-md"></div>
        <div className="absolute -left-[16px] top-[240px] w-[2px] h-[60px] bg-black rounded-l-md"></div>
        <div className="absolute -right-[16px] top-[200px] w-[2px] h-[90px] bg-black rounded-r-md"></div>

        {/* Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-6 z-50 text-black pointer-events-none">
          <span className="text-[15px] font-semibold tracking-tight mt-1">9:41</span>
          <div className="flex items-center space-x-1.5 mt-1">
            <Signal className="w-4 h-4 fill-current" />
            <Wifi className="w-4 h-4" />
            <Battery className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50 pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white" ref={scrollRef}>
          {renderTheme()}
        </div>
      </div>
    </div>
  );
}
