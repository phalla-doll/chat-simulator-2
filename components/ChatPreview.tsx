import React, { useEffect, useRef } from 'react';
import { Message, Theme } from '@/lib/chat';
import { IMessageTheme } from './themes/IMessageTheme';
import { InstagramTheme } from './themes/InstagramTheme';
import { MessengerTheme } from './themes/MessengerTheme';

const IosSignal = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[12px]">
    <rect x="1" y="8" width="3" height="4" rx="1" fill="currentColor"/>
    <rect x="5.5" y="5" width="3" height="7" rx="1" fill="currentColor"/>
    <rect x="10" y="2" width="3" height="10" rx="1" fill="currentColor"/>
    <rect x="14.5" y="0" width="3" height="12" rx="1" fill="currentColor"/>
  </svg>
);

const IosWifi = () => (
  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[14px]">
    <path d="M8.5 14C9.32843 14 10 13.3284 10 12.5C10 11.6716 9.32843 11 8.5 11C7.67157 11 7 11.6716 7 12.5C7 13.3284 7.67157 14 8.5 14Z" fill="currentColor"/>
    <path d="M12.0355 8.46447C11.0981 7.52703 9.8268 7 8.5 7C7.1732 7 5.9019 7.52703 4.96447 8.46447C4.57394 8.85499 3.94078 8.85499 3.55025 8.46447C3.15973 8.07394 3.15973 7.44078 3.55025 7.05025C4.8627 5.73781 6.6426 5 8.5 5C10.3574 5 12.1373 5.73781 13.4497 7.05025C13.8403 7.44078 13.8403 8.07394 13.4497 8.46447C13.0592 8.85499 12.4261 8.85499 12.0355 8.46447Z" fill="currentColor"/>
    <path d="M15.5711 4.92893C13.6958 3.05367 11.1522 2 8.5 2C5.8478 2 3.3042 3.05367 1.42893 4.92893C1.03841 5.31946 0.40524 5.31946 0.0147186 4.92893C-0.375806 4.53841 -0.375806 3.90524 0.0147186 3.51472C2.2718 1.25764 5.2956 0 8.5 0C11.7044 0 14.7282 1.25764 16.9853 3.51472C17.3758 3.90524 17.3758 4.53841 16.9853 4.92893C16.5948 5.31946 15.9616 5.31946 15.5711 4.92893Z" fill="currentColor"/>
  </svg>
);

const IosBattery = () => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[25px] h-[12px]">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <path d="M23 4V8C23.5523 8 24 7.55228 24 7V5C24 4.44772 23.5523 4 23 4Z" fill="currentColor" opacity="0.4"/>
    <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor"/>
  </svg>
);

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
      <div className="relative w-[393px] h-[852px] bg-white rounded-[55px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[14px] border-black flex flex-col overflow-hidden ring-1 ring-white/10">
        
        {/* Hardware buttons */}
        <div className="absolute -left-[16px] top-[120px] w-[2px] h-[32px] bg-black rounded-l-md"></div>
        <div className="absolute -left-[16px] top-[170px] w-[2px] h-[60px] bg-black rounded-l-md"></div>
        <div className="absolute -left-[16px] top-[240px] w-[2px] h-[60px] bg-black rounded-l-md"></div>
        <div className="absolute -right-[16px] top-[200px] w-[2px] h-[90px] bg-black rounded-r-md"></div>

        {/* Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-6 z-50 text-black pointer-events-none">
          <span className="text-[15px] font-semibold tracking-tight mt-1">9:41</span>
          <div className="flex items-center space-x-1.5 mt-1">
            <IosSignal />
            <IosWifi />
            <IosBattery />
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
