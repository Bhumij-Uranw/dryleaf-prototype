
import React, { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

interface FlowModeProps {
  task: Task;
  onClose: () => void;
  onComplete: (id: string) => void;
}

const FOCUS_DURATION = 25 * 60; // 25 minutes

export const FlowMode: React.FC<FlowModeProps> = ({ task, onClose, onComplete }) => {
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
        body: 'Great job! Time for a short break.',
      });
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-calm-bg/90 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="text-center p-8">
        <p className="text-xl text-calm-subtle mb-4">Focusing on:</p>
        <h1 className="text-5xl font-bold text-calm-text max-w-4xl">{task.text}</h1>
        <div className="my-16 text-9xl font-mono font-bold text-calm-accent">
          {formatTime(timeLeft)}
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-8 py-4 text-xl font-semibold bg-white border-2 border-calm-accent text-calm-accent rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={handleComplete}
            className="px-8 py-4 text-xl font-semibold bg-calm-accent text-white rounded-lg hover:bg-calm-accent-hover transition-colors"
          >
            Mark as Complete
          </button>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-8 right-8 text-calm-subtle hover:text-calm-text text-2xl font-bold">
        Exit Flow Mode
      </button>
    </div>
  );
};
