import React, { useState, useEffect, useCallback } from 'react';
import { Task, Settings } from '../types';

interface FlowModeProps {
  task: Task;
  onClose: () => void;
  onComplete: (id: string) => void;
  settings: Settings;
}

export const FlowMode: React.FC<FlowModeProps> = ({ task, onClose, onComplete, settings }) => {
  const FOCUS_DURATION = settings.pomodoroDuration * 60;
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(true);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleComplete = useCallback(() => {
    onComplete(task.id);
    onClose();
  }, [onComplete, onClose, task.id]);
  
  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      new Notification('Dryleaf: Focus session complete!', {
        body: `Great job! Time for a ${settings.shortBreakDuration} minute break.`,
      });
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, settings.shortBreakDuration]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-calm-bg/90 dark:bg-dark-bg/90 backdrop-blur-md flex flex-col items-center justify-center z-50 p-4">
      <div className="text-center">
        <p className="text-lg md:text-xl text-calm-subtle mb-4">Focusing on:</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-calm-text dark:text-dark-text max-w-4xl">{task.text}</h1>
        <div className="my-12 md:my-16 text-7xl sm:text-8xl md:text-9xl font-mono font-bold text-calm-accent">
          {formatTime(timeLeft)}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-8 py-4 w-full sm:w-auto text-lg md:text-xl font-semibold bg-white dark:bg-dark-surface border-2 border-calm-accent text-calm-accent rounded-lg hover:bg-emerald-50 dark:hover:bg-dark-border transition-colors"
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={handleComplete}
            className="px-8 py-4 w-full sm:w-auto text-lg md:text-xl font-semibold bg-calm-accent text-white rounded-lg hover:bg-calm-accent-hover transition-colors"
          >
            Mark as Complete
          </button>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-6 right-6 text-calm-subtle hover:text-calm-text text-lg font-bold">
        Exit Flow Mode
      </button>
    </div>
  );
};