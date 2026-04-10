import React from 'react';
import { motion } from 'motion/react';
import { Message } from '@/lib/chat';
import { ChevronLeft, Phone, Video, Info } from 'lucide-react';

interface ThemeProps {
  messages: Message[];
  personAName: string;
  personBName: string;
}

export function MessengerTheme({ messages, personAName, personBName }: ThemeProps) {
  return (
    <div className="flex flex-col min-h-full bg-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 pt-12 pb-2 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="w-7 h-7 text-[#0084ff]" />
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${personBName || 'B'}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold text-gray-900 leading-tight">{personBName || 'Person B'}</span>
              <span className="text-[12px] text-gray-500 leading-tight">Active now</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-[#0084ff]">
          <Phone className="w-6 h-6 fill-current" />
          <Video className="w-6 h-6 fill-current" />
          <Info className="w-6 h-6" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col justify-end min-h-0">
        <div className="flex flex-col space-y-[2px]">
          {messages.map((msg, i) => {
            const isRight = msg.side === 'right';
            const showAvatar = !isRight && (i === messages.length - 1 || messages[i + 1].side === 'right');
            const isFirstInGroup = i === 0 || messages[i - 1].side !== msg.side;
            const isLastInGroup = i === messages.length - 1 || messages[i + 1].side !== msg.side;
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex ${isRight ? 'justify-end' : 'justify-start items-end space-x-2'} ${isLastInGroup ? 'mb-3' : ''}`}
              >
                {!isRight && (
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    {showAvatar && <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${personBName || 'B'}`} alt="avatar" className="w-full h-full object-cover" />}
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-4 py-2 text-[15px] leading-tight ${
                    isRight
                      ? 'bg-[#0084ff] text-white'
                      : 'bg-[#e4e6eb] text-black'
                  } ${
                    isRight
                      ? `rounded-l-2xl ${isFirstInGroup ? 'rounded-tr-2xl' : 'rounded-tr-md'} ${isLastInGroup ? 'rounded-br-2xl' : 'rounded-br-md'}`
                      : `rounded-r-2xl ${isFirstInGroup ? 'rounded-tl-2xl' : 'rounded-tl-md'} ${isLastInGroup ? 'rounded-bl-2xl' : 'rounded-bl-md'}`
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
