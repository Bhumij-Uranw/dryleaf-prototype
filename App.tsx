import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task, Subject } from './types';
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { AddSubjectModal } from './components/AddSubjectModal';
import { FlowMode } from './components/FlowMode';
import { IdeaPad } from './components/IdeaPad';
import { FocusAssistant } from './components/FocusAssistant';
import { PieChart } from './components/PieChart';
import { geminiService } from './services/geminiService';
import { AssignDeadlineModal } from './components/AssignDeadlineModal';
import { UpcomingDeadlines } from './components/UpcomingDeadlines';
import { Calendar } from './components/Calendar';

type View = { type: 'home' } | { type: 'subject'; subjectId: string } | { type: 'calendar' };

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', []);
  const [view, setView] = useState<View>({ type: 'home' });

  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [taskInFlowMode, setTaskInFlowMode] = useState<Task | null>(null);
  const [taskForDeadline, setTaskForDeadline] = useState<Task | null>(null);

  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [encouragement, setEncouragement] = useState("Let's get things done today!");
  const [isGeminiAvailable, setIsGeminiAvailable] = useState(false);

  useEffect(() => {
    setIsGeminiAvailable(geminiService.isAvailable());
  }, []);

  const handleAddSubject = (name: string) => {
    const newSubject: Subject = { id: Date.now().toString(), name };
    setSubjects([...subjects, newSubject]);
    setView({ type: 'subject', subjectId: newSubject.id });
  };

  const handleAddTask = (text: string, subjectId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority: 'medium',
      subjectId,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
  
  const handleAssignDeadline = (taskId: string, deadline: string) => {
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, deadline } : t)));
    setTaskForDeadline(null);
  };

  const handlePrioritize = async (subjectId: string) => {
    if (!isGeminiAvailable) return;
    setIsLoadingAi(true);
    try {
      const subjectTasks = tasks.filter(t => t.subjectId === subjectId && !t.completed);
      const prioritizedTasks = await geminiService.prioritizeTasks(subjectTasks);
      const otherTasks = tasks.filter(t => t.subjectId !== subjectId || t.completed);
      const updatedTasks = tasks.map(originalTask => {
        const prioritized = prioritizedTasks.find(p => p.id === originalTask.id);
        return prioritized || originalTask;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
      alert('Failed to prioritize tasks. Please check the console for details.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleConvertToTasks = async (idea: string, subjectId: string) => {
    if (!isGeminiAvailable) return;
    setIsLoadingAi(true);
    try {
      const newTasksText = await geminiService.ideaToTasks(idea);
      const newTasks: Task[] = newTasksText.map(text => ({
        id: `${Date.now()}-${Math.random()}`,
        text,
        completed: false,
        priority: 'medium',
        subjectId,
      }));
      setTasks(prevTasks => [...prevTasks, ...newTasks]);
      setView({ type: 'subject', subjectId });
    } catch (error) {
      console.error(error);
      alert('Failed to convert idea to tasks. Please check the console for details.');
    } finally {
      setIsLoadingAi(false);
    }
  };
  
  const handleGetEncouragement = async () => {
    if (!isGeminiAvailable) return;
    setIsLoadingAi(true);
    setEncouragement('');
    try {
      const message = await geminiService.getEncouragement(tasks);
      setEncouragement(message);
    } catch (error) {
      console.error(error);
      setEncouragement('Could not get encouragement right now. But you can do it!');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const HomeView = () => (
    <div className="space-y-8">
      <PieChart tasks={tasks} subjects={subjects} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <UpcomingDeadlines tasks={tasks} subjects={subjects} />
        </div>
        <FocusAssistant
          message={encouragement}
          onGetEncouragement={handleGetEncouragement}
          isLoadingAi={isLoadingAi}
        />
      </div>
       <IdeaPad
          subjects={subjects}
          onConvertToTasks={handleConvertToTasks}
          isLoadingAi={isLoadingAi}
        />
    </div>
  );
  
  const renderContent = () => {
    if (view.type === 'home' || (view.type === 'subject' && !subjects.some(s => s.id === view.subjectId))) {
      if (view.type === 'subject') setView({ type: 'home' });
      return <HomeView />;
    }
    if (view.type === 'subject') {
      const subject = subjects.find(s => s.id === view.subjectId)!;
      const subjectTasks = tasks.filter(t => t.subjectId === subject.id);
      return (
        <TaskList
          tasks={subjectTasks}
          subject={subject}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTask}
          onPrioritize={handlePrioritize}
          onFocus={setTaskInFlowMode}
          isLoadingAi={isLoadingAi}
          onSetDeadline={setTaskForDeadline}
        />
      );
    }
    if (view.type === 'calendar') {
        return <Calendar tasks={tasks} />;
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-calm-bg text-calm-text font-sans">
      <Sidebar 
        subjects={subjects}
        onAddSubject={() => setIsAddSubjectModalOpen(true)}
        onSelectView={setView}
        activeView={view}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>

      {isAddSubjectModalOpen && (
        <AddSubjectModal
          onClose={() => setIsAddSubjectModalOpen(false)}
          onAddSubject={handleAddSubject}
        />
      )}
      {taskInFlowMode && (
        <FlowMode
          task={taskInFlowMode}
          onClose={() => setTaskInFlowMode(null)}
          onComplete={handleToggleTask}
        />
      )}
      {taskForDeadline && (
        <AssignDeadlineModal 
          task={taskForDeadline}
          onClose={() => setTaskForDeadline(null)}
          onAssignDeadline={handleAssignDeadline}
        />
      )}
    </div>
  );
};

export default App;
