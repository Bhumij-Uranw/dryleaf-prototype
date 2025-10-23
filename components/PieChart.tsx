import React from 'react';
import { Task, Subject } from '../types';

interface PieChartProps {
  tasks: Task[];
  subjects: Subject[];
}

const COLORS = ['#10B981', '#3B82F6', '#F97316', '#8B5CF6', '#EC4899', '#F59E0B', '#14B8A6'];

export const PieChart: React.FC<PieChartProps> = ({ tasks, subjects }) => {
  if (subjects.length === 0 || tasks.length === 0) {
    return (
      <div className="bg-white/50 p-6 rounded-xl shadow-lg h-full flex flex-col">
        <h2 className="text-2xl font-bold text-calm-text mb-4">Progress Overview</h2>
        <div className="flex-grow flex items-center justify-center text-calm-subtle">
          <p>No tasks or subjects yet. Add a subject and some tasks to see your progress!</p>
        </div>
      </div>
    );
  }
  
  const subjectData = subjects.map((subject, index) => {
    const subjectTasks = tasks.filter(t => t.subjectId === subject.id);
    const completedTasks = subjectTasks.filter(t => t.completed).length;
    const totalTasks = subjectTasks.length;
    return {
      id: subject.id,
      name: subject.name,
      value: totalTasks,
      completed: completedTasks,
      color: COLORS[index % COLORS.length],
    };
  }).filter(s => s.value > 0);

  const totalTasks = subjectData.reduce((acc, s) => acc + s.value, 0);
  
  if (totalTasks === 0) {
    return (
        <div className="bg-white/50 p-6 rounded-xl shadow-lg h-full flex flex-col">
          <h2 className="text-2xl font-bold text-calm-text mb-4">Progress Overview</h2>
          <div className="flex-grow flex items-center justify-center text-calm-subtle">
            <p>Add some tasks to your subjects to see your progress chart.</p>
          </div>
        </div>
      );
  }

  let cumulativePercentage = 0;
  const gradientParts = subjectData.map(s => {
    const percentage = (s.value / totalTasks) * 100;
    const part = `${s.color} ${cumulativePercentage}% ${cumulativePercentage + percentage}%`;
    cumulativePercentage += percentage;
    return part;
  });
  const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;

  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-bold text-calm-text mb-4">Progress Overview</h2>
      <div className="flex-grow flex items-center justify-center sm:justify-start flex-wrap gap-8">
        <div 
          className="w-48 h-48 rounded-full"
          style={{ background: conicGradient }}
          role="img"
          aria-label="Pie chart of task distribution by subject"
        ></div>
        <div className="space-y-2">
          {subjectData.map(s => (
            <div key={s.id} className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: s.color }}></div>
              <span className="font-semibold text-calm-text">{s.name}</span>
              <span className="ml-auto text-sm text-calm-subtle">{s.completed}/{s.value} completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
