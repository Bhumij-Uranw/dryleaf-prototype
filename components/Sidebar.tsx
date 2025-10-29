import React from 'react';
import { Subject } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { HomeIcon } from './icons/HomeIcon';
import { PlusIcon } from './icons/PlusIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { View } from '../App';

interface SidebarProps {
  subjects: Subject[];
  onAddSubject: () => void;
  onSelectView: (view: View) => void;
  activeView: View;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ subjects, onAddSubject, onSelectView, activeView, onOpenSettings }) => {

  const getButtonClass = (isActive: boolean) =>
    `flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-calm-accent text-white'
        : 'text-calm-text dark:text-dark-text hover:bg-calm-border dark:hover:bg-dark-border'
    }`;

  return (
    <div
      className="hidden md:flex flex-col flex-shrink-0 bg-white/60 dark:bg-dark-surface/60 shadow-md h-screen w-64 p-4"
    >
      {/* Header */}
      <div className="flex items-center mb-8 pl-2">
        <LeafIcon className="w-10 h-10 text-calm-accent" />
        <span
          className="text-2xl font-bold text-calm-text dark:text-dark-text tracking-tight ml-3"
        >
          Dryleaf
        </span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-grow space-y-2 overflow-y-auto">
        <button
          onClick={() => onSelectView({ type: 'home' })}
          className={getButtonClass(activeView.type === 'home')}
        >
          <HomeIcon className="w-6 h-6 flex-shrink-0" />
          <span className="ml-4">
            Home
          </span>
        </button>

        <button
          onClick={() => onSelectView({ type: 'calendar' })}
          className={getButtonClass(activeView.type === 'calendar')}
        >
          <CalendarIcon className="w-6 h-6 flex-shrink-0" />
          <span className="ml-4">
            Calendar
          </span>
        </button>
        
        <div className="border-t border-calm-border dark:border-dark-border my-4"></div>

        <span className="px-3 text-sm font-semibold text-calm-subtle">Subjects</span>
        {subjects.map(subject => (
          <button
            key={subject.id}
            onClick={() => onSelectView({ type: 'subject', subjectId: subject.id })}
            className={getButtonClass(activeView.type === 'subject' && activeView.subjectId === subject.id)}
          >
            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-calm-subtle rounded-full"></div>
            </div>
            <span className="ml-4 truncate">
              {subject.name}
            </span>
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="mt-auto space-y-2">
         <button
          onClick={onAddSubject}
          className="flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 text-calm-accent hover:bg-emerald-50 dark:hover:bg-dark-border"
        >
          <PlusIcon className="w-6 h-6" />
          <span className="ml-4 font-semibold">
            Add Subject
          </span>
        </button>
         <button
          onClick={onOpenSettings}
          className="flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 text-calm-subtle hover:bg-calm-border dark:hover:bg-dark-border"
        >
          <SettingsIcon className="w-6 h-6" />
          <span className="ml-4 font-semibold">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
};