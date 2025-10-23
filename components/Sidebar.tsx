import React, { useState } from 'react';
import { Subject } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { HomeIcon } from './icons/HomeIcon';
import { PlusIcon } from './icons/PlusIcon';
import { CalendarIcon } from './icons/CalendarIcon';

// FIX: Made `subjectId` required to match the `View` type in `App.tsx`, resolving the type error.
type View = { type: 'home' } | { type: 'subject'; subjectId: string } | { type: 'calendar' };

interface SidebarProps {
  subjects: Subject[];
  onAddSubject: () => void;
  onSelectView: (view: View) => void;
  activeView: View;
}

export const Sidebar: React.FC<SidebarProps> = ({ subjects, onAddSubject, onSelectView, activeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getButtonClass = (isActive: boolean) =>
    `flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-calm-accent text-white'
        : 'text-calm-text hover:bg-calm-border'
    }`;

  return (
    <div
      className="relative flex-shrink-0 transition-all duration-300 ease-in-out bg-white/60 shadow-md h-screen"
      style={{ width: isOpen ? '280px' : '80px' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center mb-8" style={{ paddingLeft: '8px' }}>
          <LeafIcon className="w-10 h-10 text-calm-accent" />
          <span
            className={`text-2xl font-bold text-calm-text tracking-tight ml-3 transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Dryleaf
          </span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-grow space-y-2">
          <button
            onClick={() => onSelectView({ type: 'home' })}
            className={getButtonClass(activeView.type === 'home')}
          >
            <HomeIcon className="w-6 h-6 flex-shrink-0" />
            <span className={`ml-4 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              Home
            </span>
          </button>

          <button
            onClick={() => onSelectView({ type: 'calendar' })}
            className={getButtonClass(activeView.type === 'calendar')}
          >
            <CalendarIcon className="w-6 h-6 flex-shrink-0" />
            <span className={`ml-4 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              Calendar
            </span>
          </button>
          
          <div className="border-t border-calm-border my-4"></div>

          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => onSelectView({ type: 'subject', subjectId: subject.id })}
              className={getButtonClass(activeView.type === 'subject' && activeView.subjectId === subject.id)}
            >
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-calm-subtle rounded-full"></div>
              </div>
              <span className={`ml-4 transition-opacity duration-200 truncate ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                {subject.name}
              </span>
            </button>
          ))}
        </nav>

        {/* Add Subject */}
        <div className="mt-auto">
          <button
            onClick={onAddSubject}
            className="flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 text-calm-accent hover:bg-emerald-50"
          >
            <PlusIcon className="w-6 h-6" />
            <span className={`ml-4 font-semibold transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              Add Subject
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};