import React from 'react';
import { Subject } from '../types';
import { View } from '../App';

interface SubjectsViewProps {
  subjects: Subject[];
  onSelectView: (view: View) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({ subjects, onSelectView }) => {
  return (
    <div className="bg-white/50 dark:bg-dark-surface/50 p-4 sm:p-6 rounded-xl shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-bold text-calm-text dark:text-dark-text mb-4">Subjects</h2>
      {subjects.length > 0 ? (
        <div className="flex-grow overflow-y-auto space-y-3">
          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => onSelectView({ type: 'subject', subjectId: subject.id })}
              className="flex items-center w-full text-left p-4 rounded-lg bg-white dark:bg-dark-surface hover:shadow-md transition-shadow"
            >
              <div className="w-3 h-3 bg-calm-subtle rounded-full mr-4"></div>
              <span className="font-semibold text-calm-text dark:text-dark-text">{subject.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-calm-subtle dark:text-dark-subtle flex-grow flex flex-col items-center justify-center">
            <p className="text-lg">No subjects yet.</p>
            <p>Tap the "+" button below to add your first subject!</p>
        </div>
      )}
    </div>
  );
};
