import React from 'react';
import { motion } from 'motion/react';
import { Message } from '@/lib/chat';
import { ChevronLeft, Video } from 'lucide-react';

interface ThemeProps {
  messages: Message[];
  personAName: string;
  personBName: string;
}

export function IMessageTheme({ messages, personAName, personBName }: ThemeProps) {
  return (
    <div className="flex flex-col min-h-full bg-white font-sans">
      <style>{`
        .imessage-tail-right::before {
          content: "";
          position: absolute;
          bottom: 0;
          right: -8px;
          height: 20px;
          width: 20px;
          background-color: #007AFF;
          border-bottom-left-radius: 16px;
          z-index: -1;
        }
        .imessage-tail-right::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: -10px;
          width: 10px;
          height: 20px;
          background-color: white;
          border-bottom-left-radius: 10px;
          z-index: -1;
        }
        .imessage-tail-left::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: -8px;
          height: 20px;
          width: 20px;
          background-color: #E9E9EB;
          border-bottom-right-radius: 16px;
          z-index: -1;
        }
        .imessage-tail-left::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: -10px;
          width: 10px;
          height: 20px;
          background-color: white;
          border-bottom-right-radius: 10px;
          z-index: -1;
        }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 pt-12 pb-2 px-2 flex items-center justify-between">
        <div className="flex items-center text-[#007AFF] w-1/3">
          <ChevronLeft className="w-7 h-7 -ml-1" strokeWidth={2.5} />
          <span className="text-[17px] -ml-1 tracking-tight">2</span>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-white text-xl font-medium mb-0.5">
            {personBName.charAt(0).toUpperCase() || 'B'}
          </div>
          <div className="flex items-center">
            <span className="text-[11px] font-medium text-black tracking-tight">{personBName || 'Person B'}</span>
            <ChevronLeft className="w-3 h-3 text-gray-400 -rotate-90 ml-0.5" strokeWidth={3} />
          </div>
        </div>
        <div className="flex items-center justify-end w-1/3 pr-2 text-[#007AFF]">
          <Video className="w-6 h-6" strokeWidth={1.5} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col justify-end min-h-0 pb-8">
        <div className="flex flex-col">
          {messages.map((msg, i) => {
            const isRight = msg.side === 'right';
            const showTail = i === messages.length - 1 || messages[i + 1].side !== msg.side;
            const isFirstInGroup = i === 0 || messages[i - 1].side !== msg.side;
            const spacingClass = isFirstInGroup && i !== 0 ? 'mt-4' : 'mt-[2px]';
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                className={`flex ${isRight ? 'justify-end' : 'justify-start'} ${spacingClass}`}
              >
                <div
                  className={`relative max-w-[260px] px-[14px] py-[7px] text-[17px] leading-[22px] tracking-[-0.02em] ${
                    isRight
                      ? 'bg-[#007AFF] text-white'
                      : 'bg-[#E9E9EB] text-black'
                  } ${
                    showTail && isRight
                      ? 'rounded-2xl rounded-br-md imessage-tail-right'
                      : showTail && !isRight
                      ? 'rounded-2xl rounded-bl-md imessage-tail-left'
                      : 'rounded-2xl'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
