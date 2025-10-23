import React, { useState } from 'react';
import { Task, Subject } from '../types';
import { TaskItem } from './TaskItem';
import { SparklesIcon } from './icons/SparklesIcon';

interface TaskListProps {
  tasks: Task[];
  subject: Subject;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (text: string, subjectId: string) => void;
  onPrioritize: (subjectId: string) => void;
  onFocus: (task: Task) => void;
  isLoadingAi: boolean;
  onSetDeadline: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  subject,
  onToggleTask,
  onDeleteTask,
  onAddTask,
  onPrioritize,
  onFocus,
  isLoadingAi,
  onSetDeadline,
}) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim(), subject.id);
      setNewTaskText('');
    }
  };

  const uncompletedTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-calm-text">{subject.name}</h2>
        <button
          onClick={() => onPrioritize(subject.id)}
          disabled={isLoadingAi || uncompletedTasks.length < 2}
          className="flex items-center px-4 py-2 bg-calm-accent text-white rounded-lg hover:bg-calm-accent-hover transition-all duration-200 disabled:bg-calm-subtle disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {isLoadingAi ? 'Prioritizing...' : 'Prioritize with AI'}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto space-y-3 pr-2">
        {uncompletedTasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} onFocus={onFocus} onSetDeadline={onSetDeadline} />
        ))}
        {completedTasks.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-calm-subtle mb-2">Completed</h3>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} onFocus={onFocus} onSetDeadline={onSetDeadline} />
            ))}
          </div>
        )}
         {tasks.length === 0 && (
          <div className="text-center py-10 text-calm-subtle">
            <p>This subject has no tasks.</p>
            <p>Add a task below to get started!</p>
          </div>
        )}
      </div>
      <form onSubmit={handleAddTask} className="mt-4 flex">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 border border-calm-border rounded-l-lg focus:ring-2 focus:ring-calm-accent focus:outline-none transition placeholder:text-calm-subtle focus:bg-calm-text focus:text-white focus:placeholder:text-gray-400"
        />
        <button type="submit" className="px-6 py-3 bg-calm-accent text-white font-semibold rounded-r-lg hover:bg-calm-accent-hover transition-colors">
          Add
        </button>
      </form>
    </div>
  );
};
