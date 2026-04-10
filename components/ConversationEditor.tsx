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
    <div className="flex flex-col h-full bg-[#f5f5f5] border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-medium tracking-tight text-gray-900 mb-1">Chat Simulator</h1>
        <p className="text-sm text-gray-500">Write dialogue to simulate a conversation.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="imessage">iMessage</option>
              <option value="instagram">Instagram DMs</option>
              <option value="messenger">Messenger</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Person A {'>'}
              </label>
              <input
                type="text"
                value={personAName}
                onChange={(e) => setPersonAName(e.target.value)}
                placeholder="Right side"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Person B {'<'}
              </label>
              <input
                type="text"
                value={personBName}
                onChange={(e) => setPersonBName(e.target.value)}
                placeholder="Left side"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex flex-col h-[400px]">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Script
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder={`> hey\n< hi\n> where are you\n< almost there`}
            className="flex-1 w-full bg-white border border-gray-200 rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            spellCheck={false}
          />
          <p className="text-xs text-gray-400 mt-2">
            Use <code className="bg-gray-100 px-1 rounded text-gray-600">&gt;</code> for Person A (right) and <code className="bg-gray-100 px-1 rounded text-gray-600">&lt;</code> for Person B (left).
          </p>
        </div>
      </div>
    </div>
  );
}
