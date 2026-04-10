import React from 'react';
import { motion } from 'motion/react';
import { Message } from '@/lib/chat';
import { ChevronLeft, Phone, Video, Info } from 'lucide-react';

interface ThemeProps {
  messages: Message[];
  personAName: string;
  personBName: string;
}

export function InstagramTheme({ messages, personAName, personBName }: ThemeProps) {
  return (
    <div className="flex flex-col min-h-full bg-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 pt-12 pb-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-7 h-7 text-gray-900" />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${personBName || 'B'}`} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold text-gray-900 leading-tight">{personBName || 'Person B'}</span>
              <span className="text-[12px] text-gray-500 leading-tight">Active now</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5 text-gray-900">
          <Phone className="w-6 h-6" />
          <Video className="w-6 h-6" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col justify-end min-h-0">
        <div className="flex flex-col space-y-2">
          {messages.map((msg, i) => {
            const isRight = msg.side === 'right';
            const showAvatar = !isRight && (i === messages.length - 1 || messages[i + 1].side === 'right');
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex ${isRight ? 'justify-end' : 'justify-start items-end space-x-2'}`}
              >
                {!isRight && (
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    {showAvatar && <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${personBName || 'B'}`} alt="avatar" className="w-full h-full object-cover" />}
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-4 py-3 text-[15px] leading-tight ${
                    isRight
                      ? 'bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-3xl rounded-br-sm'
                      : 'bg-[#efefef] text-black rounded-3xl rounded-bl-sm'
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
