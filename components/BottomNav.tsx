import React from 'react';
import { View } from '../App';
import { HomeIcon } from './icons/HomeIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SubjectsIcon } from './icons/SubjectsIcon';

interface BottomNavProps {
    activeView: View;
    onSelectView: (view: View) => void;
    onAddSubject: () => void;
    onOpenSettings: () => void;
}

const NavButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    label: string;
    children: React.ReactNode;
}> = ({ isActive, onClick, label, children }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-calm-accent' : 'text-calm-subtle'}`}
        >
            {children}
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
};


export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onSelectView, onAddSubject, onOpenSettings }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-t border-calm-border dark:border-dark-border flex items-center justify-around z-40">
            <NavButton
                isActive={activeView.type === 'home'}
                onClick={() => onSelectView({ type: 'home' })}
                label="Home"
            >
                <HomeIcon className="w-6 h-6 mb-1" />
            </NavButton>

            <NavButton
                isActive={activeView.type === 'subjects' || activeView.type === 'subject'}
                onClick={() => onSelectView({ type: 'subjects' })}
                label="Subjects"
            >
                <SubjectsIcon className="w-6 h-6 mb-1" />
            </NavButton>

            <button
                onClick={onAddSubject}
                className="flex items-center justify-center w-14 h-14 bg-calm-accent text-white rounded-full shadow-lg -mt-8"
                aria-label="Add Subject"
            >
                <PlusIcon className="w-8 h-8" />
            </button>

            <NavButton
                isActive={activeView.type === 'calendar'}
                onClick={() => onSelectView({ type: 'calendar' })}
                label="Calendar"
            >
                <CalendarIcon className="w-6 h-6 mb-1" />
            </NavButton>
            
            <NavButton
                isActive={false} // Settings opens a modal, doesn't have an active state
                onClick={onOpenSettings}
                label="Settings"
            >
                <SettingsIcon className="w-6 h-6 mb-1" />
            </NavButton>
        </nav>
    );
};