import React from 'react';
import { Theme, PlaybackSpeed } from '@/lib/chat';

interface ConversationEditorProps {
  script: string;
  setScript: (script: string) => void;
  personAName: string;
  setPersonAName: (name: string) => void;
  personBName: string;
  setPersonBName: (name: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function ConversationEditor({
  script,
  setScript,
  personAName,
  setPersonAName,
  personBName,
  setPersonBName,
  theme,
  setTheme,
}: ConversationEditorProps) {
  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-6 pb-2">
        <h1 className="text-[15px] font-semibold text-gray-800 mb-1">Chat Simulator</h1>
        <p className="text-[13px] text-gray-500">Write dialogue to simulate a conversation.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              className="w-full bg-white border border-gray-200/70 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-300 transition-colors"
            >
              <option value="imessage">iMessage</option>
              <option value="instagram">Instagram DMs</option>
              <option value="messenger">Messenger</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
                Person A {'>'}
              </label>
              <input
                type="text"
                value={personAName}
                onChange={(e) => setPersonAName(e.target.value)}
                placeholder="Right side"
                className="w-full bg-white border border-gray-200/70 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
                Person B {'<'}
              </label>
              <input
                type="text"
                value={personBName}
                onChange={(e) => setPersonBName(e.target.value)}
                placeholder="Left side"
                className="w-full bg-white border border-gray-200/70 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex flex-col h-[400px]">
          <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
            Script
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder={`> hey\n< hi\n> where are you\n< almost there`}
            className="flex-1 w-full bg-white border border-gray-200/70 rounded-lg p-4 text-[13px] font-mono resize-none focus:outline-none focus:border-gray-300 transition-colors leading-relaxed"
            spellCheck={false}
          />
          <p className="text-[11px] text-gray-400 mt-2">
            Use <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-500">&gt;</code> for Person A (right) and <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-500">&lt;</code> for Person B (left).
          </p>
        </div>
      </div>
    </div>
  );
}
