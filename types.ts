export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  subjectId: string;
  deadline?: string; // ISO string format for dates
}

export interface Subject {
  id: string;
  name: string;
}

export interface Settings {
  darkMode: boolean;
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}
