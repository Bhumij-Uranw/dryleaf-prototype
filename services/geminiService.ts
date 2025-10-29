
import { GoogleGenAI, Type } from "@google/genai";
import { Task, Priority } from '../types';

let ai: GoogleGenAI;

try {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
} catch (error) {
  console.error("Failed to initialize GoogleGenAI. Make sure API_KEY is set.", error);
}

export const geminiService = {
  isAvailable: (): boolean => !!ai,

  prioritizeTasks: async (tasks: Task[]): Promise<Task[]> => {
    if (!ai) throw new Error("Gemini AI not initialized.");

    const taskDescriptions = tasks.map(t => ({ id: t.id, text: t.text }));
    const prompt = `You are a productivity expert. Prioritize the following tasks based on urgency and importance. Return a JSON array of objects, each with the task "id" and a "priority" level ('high', 'medium', 'low'). The tasks are: ${JSON.stringify(taskDescriptions)}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                priority: { type: Type.STRING, enum: ['high', 'medium', 'low'] },
              },
              required: ['id', 'priority'],
            },
          },
        },
      });

      const result = JSON.parse(response.text);
      
      const priorityMap = new Map<string, Priority>(result.map((p: { id: string; priority: Priority }) => [p.id, p.priority]));
      
      const updatedTasks = tasks.map(task => ({
        ...task,
        priority: priorityMap.get(task.id) || task.priority,
      }));

      // Sort tasks based on new priority
      const priorityOrder: Record<Priority, number> = { high: 1, medium: 2, low: 3 };
      return updatedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } catch (error) {
      console.error("Error prioritizing tasks:", error);
      throw new Error("Failed to prioritize tasks with AI.");
    }
  },

  ideaToTasks: async (idea: string): Promise<string[]> => {
    if (!ai) throw new Error("Gemini AI not initialized.");
    
    const prompt = `You are an expert project planner. Break down the following idea into a list of actionable tasks. Return a JSON array of strings, where each string is a single task. The idea is: "${idea}"`;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Error converting idea to tasks:", error);
      throw new Error("Failed to convert idea to tasks with AI.");
    }
  },

  getEncouragement: async (tasks: Task[]): Promise<string> => {
    if (!ai) throw new Error("Gemini AI not initialized.");
    
    const uncompletedTasks = tasks.filter(t => !t.completed).map(t => t.text);
    if (uncompletedTasks.length === 0) {
      return "You've completed all your tasks! Great job. Time to relax or plan your next move.";
    }

    const prompt = `You are a friendly and encouraging productivity coach. Look at this user's uncompleted tasks and provide a short, motivational message (1-2 sentences) to help them get started. Be inspiring but gentle. Here are the tasks: ${uncompletedTasks.join(', ')}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Error getting encouragement:", error);
      throw new Error("Failed to get encouragement from AI.");
    }
  },
};