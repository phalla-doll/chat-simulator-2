import React from 'react';
import { motion } from 'motion/react';
import { Message } from '@/lib/chat';
import { ChevronLeft, Video, Info } from 'lucide-react';

interface ThemeProps {
  messages: Message[];
  personAName: string;
  personBName: string;
}

export function IMessageTheme({ messages, personAName, personBName }: ThemeProps) {
  return (
    <div className="flex flex-col min-h-full bg-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/50 pt-12 pb-2 px-4 flex items-center justify-between">
        <div className="flex items-center text-blue-500">
          <ChevronLeft className="w-6 h-6" />
          <span className="text-[17px] -ml-1">Filters</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-white text-lg font-medium mb-1">
            {personBName.charAt(0).toUpperCase() || 'B'}
          </div>
          <span className="text-[11px] font-medium text-gray-900">{personBName || 'Person B'}</span>
        </div>
        <div className="flex items-center space-x-4 text-blue-500">
          <Video className="w-6 h-6" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col justify-end min-h-0">
        <div className="flex flex-col space-y-1">
          {messages.map((msg, i) => {
            const isRight = msg.side === 'right';
            const showTail = i === messages.length - 1 || messages[i + 1].side !== msg.side;
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex ${isRight ? 'justify-end' : 'justify-start'} ${showTail ? 'mb-2' : ''}`}
              >
                <div
                  className={`relative max-w-[75%] px-4 py-2 text-[17px] leading-tight ${
                    isRight
                      ? 'bg-[#007AFF] text-white'
                      : 'bg-[#E9E9EB] text-black'
                  } ${
                    showTail && isRight
                      ? 'rounded-2xl rounded-br-sm'
                      : showTail && !isRight
                      ? 'rounded-2xl rounded-bl-sm'
                      : 'rounded-2xl'
                  }`}
                >
                  {msg.text}
                  {/* Tail SVG could go here for extra realism, but rounded corners work well enough for MVP */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
