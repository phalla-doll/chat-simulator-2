import React from 'react';
import { motion } from 'motion/react';
import { Message } from '@/lib/chat';
import { ChevronLeft, Phone, Video } from 'lucide-react';

interface ThemeProps {
  messages: Message[];
  personAName: string;
  personBName: string;
}

export function InstagramTheme({ messages, personAName, personBName }: ThemeProps) {
  return (
    <div className="flex flex-col min-h-full bg-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white pt-12 pb-2 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-8 h-8 text-black -ml-2" strokeWidth={1.5} />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${personBName || 'B'}`} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-black leading-tight">{personBName || 'Person B'}</span>
              <span className="text-[12px] text-gray-500 leading-tight">Active now</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5 text-black">
          <Phone className="w-6 h-6" strokeWidth={1.5} />
          <Video className="w-7 h-7" strokeWidth={1.5} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col justify-end min-h-0 pb-8">
        <div className="flex flex-col">
          {messages.map((msg, i) => {
            const isRight = msg.side === 'right';
            const showAvatar = !isRight && (i === messages.length - 1 || messages[i + 1].side === 'right');
            const isFirstInGroup = i === 0 || messages[i - 1].side !== msg.side;
            const isLastInGroup = i === messages.length - 1 || messages[i + 1].side !== msg.side;
            const spacingClass = isFirstInGroup && i !== 0 ? 'mt-4' : 'mt-[2px]';
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                className={`flex ${isRight ? 'justify-end' : 'justify-start items-end space-x-2'} ${spacingClass}`}
              >
                {!isRight && (
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mb-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {showAvatar && <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${personBName || 'B'}`} alt="avatar" className="w-full h-full object-cover" />}
                  </div>
                )}
                <div
                  className={`max-w-[240px] px-4 py-[10px] text-[15px] leading-[20px] ${
                    isRight
                      ? 'bg-gradient-to-tr from-[#A60F93] to-[#0D94F3] text-white'
                      : 'bg-[#EFEFEF] text-black'
                  } ${
                    isRight
                      ? `rounded-3xl ${!isFirstInGroup ? 'rounded-tr-md' : ''} ${!isLastInGroup ? 'rounded-br-md' : ''}`
                      : `rounded-3xl ${!isFirstInGroup ? 'rounded-tl-md' : ''} ${!isLastInGroup ? 'rounded-bl-md' : ''}`
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
