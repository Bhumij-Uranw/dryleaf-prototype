import React from 'react';
import { Task } from '../types';

interface CalendarProps {
    tasks: Task[];
}

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

// Helper to get first day of month
const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

export const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const tasksByDate: { [key: string]: Task[] } = {};
    tasks.forEach(task => {
        if (task.deadline) {
            const date = new Date(task.deadline).toDateString();
            if (!tasksByDate[date]) {
                tasksByDate[date] = [];
            }
            tasksByDate[date].push(task);
        }
    });

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-start-${i}`} className="p-2 border border-transparent"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toDateString();
        const tasksForDay = tasksByDate[dateString] || [];
        const isToday = new Date().toDateString() === dateString;

        calendarDays.push(
            <div key={day} className={`p-2 border border-calm-border/50 rounded-md flex flex-col min-h-[100px] ${isToday ? 'bg-emerald-50' : ''}`}>
                <span className={`font-semibold ${isToday ? 'text-calm-accent' : 'text-calm-text'}`}>{day}</span>
                <div className="mt-1 space-y-1 overflow-y-auto text-left">
                    {tasksForDay.slice(0, 2).map(task => (
                        <div key={task.id} title={task.text} className={`text-xs p-1 rounded truncate ${task.completed ? 'bg-gray-200 text-gray-500 line-through' : 'bg-calm-accent/20 text-calm-accent-dark'}`}>
                           {task.text}
                        </div>
                    ))}
                    {tasksForDay.length > 2 && <div className="text-xs text-calm-subtle text-left">+ {tasksForDay.length - 2} more</div>}
                </div>
            </div>
        );
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="bg-white/50 p-6 rounded-xl shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-calm-text">{monthName} {year}</h2>
                <div className="space-x-2">
                    <button onClick={handlePrevMonth} className="p-2 rounded-md hover:bg-calm-border/50" aria-label="Previous month">&lt;</button>
                    <button onClick={handleNextMonth} className="p-2 rounded-md hover:bg-calm-border/50" aria-label="Next month">&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-calm-subtle mb-2">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="grid grid-cols-7 grid-rows-5 gap-2 flex-grow">
                {calendarDays}
            </div>
        </div>
    );
};
