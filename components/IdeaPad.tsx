import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { Subject } from '../types';

interface IdeaPadProps {
  subjects: Subject[];
  onConvertToTasks: (idea: string, subjectId: string) => void;
  isLoadingAi: boolean;
}

export const IdeaPad: React.FC<IdeaPadProps> = ({ subjects, onConvertToTasks, isLoadingAi }) => {
  const [ideaText, setIdeaText] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');

  const handleConvert = () => {
    if (ideaText.trim() && selectedSubjectId) {
      onConvertToTasks(ideaText.trim(), selectedSubjectId);
      setIdeaText('');
    }
  };

  const hasSubjects = subjects.length > 0;

  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-bold text-calm-text mb-4">Idea Pad</h2>
      <textarea
        value={ideaText}
        onChange={(e) => setIdeaText(e.target.value)}
        placeholder={hasSubjects ? "Capture your brilliant ideas here..." : "Create a subject first to capture ideas."}
        className="flex-grow w-full p-4 border border-calm-border rounded-lg focus:ring-2 focus:ring-calm-accent focus:outline-none transition resize-none placeholder:text-calm-subtle focus:bg-calm-text focus:text-white focus:placeholder:text-gray-400"
        disabled={!hasSubjects}
      />
      {hasSubjects && (
        <select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="mt-4 w-full p-3 border border-calm-border rounded-lg bg-white focus:ring-2 focus:ring-calm-accent focus:outline-none"
        >
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              Add tasks to: {subject.name}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={handleConvert}
        disabled={isLoadingAi || !ideaText.trim() || !selectedSubjectId}
        className="mt-4 w-full flex justify-center items-center px-4 py-3 bg-calm-accent text-white font-semibold rounded-lg hover:bg-calm-accent-hover transition-all duration-200 disabled:bg-calm-subtle disabled:cursor-not-allowed"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoadingAi ? 'Converting...' : 'Convert to Tasks with AI'}
      </button>
    </div>
  );
};