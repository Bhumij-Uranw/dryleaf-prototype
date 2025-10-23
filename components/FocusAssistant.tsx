
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface FocusAssistantProps {
  message: string;
  onGetEncouragement: () => void;
  isLoadingAi: boolean;
}

export const FocusAssistant: React.FC<FocusAssistantProps> = ({ message, onGetEncouragement, isLoadingAi }) => {
  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-calm-text mb-4">Focus Assistant</h2>
      <div className="bg-emerald-50 p-4 rounded-lg min-h-[80px] flex items-center justify-center">
        <p className="text-calm-text text-center italic">
          {isLoadingAi && message === '' ? 'Thinking of some encouragement...' : message}
        </p>
      </div>
      <button
        onClick={onGetEncouragement}
        disabled={isLoadingAi}
        className="mt-4 w-full flex justify-center items-center px-4 py-3 bg-white border border-calm-accent text-calm-accent font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-200 disabled:bg-calm-subtle/20 disabled:text-calm-subtle disabled:border-calm-subtle disabled:cursor-not-allowed"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        Get Encouragement
      </button>
    </div>
  );
};
