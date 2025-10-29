import React from 'react';
import { Settings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (newSettings: Settings | ((prev: Settings) => Settings)) => void;
  onFactoryReset: () => void;
}

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${
        checked ? 'bg-calm-accent' : 'bg-gray-200 dark:bg-dark-border'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  );
};

const SettingRow: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="flex items-center justify-between py-4 border-b border-calm-border dark:border-dark-border">
      <div>
        <h3 className="font-semibold text-calm-text dark:text-dark-text">{title}</h3>
        <p className="text-sm text-calm-subtle dark:text-dark-subtle">{description}</p>
      </div>
      {children}
    </div>
);


export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onFactoryReset,
}) => {
  if (!isOpen) return null;

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateSettings(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
  };

  const inputClass = "w-20 p-2 border border-calm-border dark:border-dark-border rounded-md bg-calm-bg dark:bg-dark-bg focus:ring-2 focus:ring-calm-accent focus:outline-none";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-dark-surface rounded-xl shadow-2xl p-8 w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-calm-text dark:text-dark-text mb-6">Settings</h2>
        
        <div className="space-y-2">
            <SettingRow title="Dark Mode" description="Switch to a darker, calmer interface.">
                <Toggle
                    checked={settings.darkMode}
                    onChange={(checked) => onUpdateSettings(prev => ({ ...prev, darkMode: checked }))}
                />
            </SettingRow>

            <SettingRow title="Pomodoro Timers" description="Customize your focus and break durations.">
                <div className="flex items-center space-x-4 text-sm">
                    <div>
                        <label htmlFor="pomodoroDuration" className="block text-calm-subtle dark:text-dark-subtle mb-1">Focus</label>
                        <input type="number" name="pomodoroDuration" id="pomodoroDuration" value={settings.pomodoroDuration} onChange={handleNumericChange} className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="shortBreakDuration" className="block text-calm-subtle dark:text-dark-subtle mb-1">Short</label>
                        <input type="number" name="shortBreakDuration" id="shortBreakDuration" value={settings.shortBreakDuration} onChange={handleNumericChange} className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="longBreakDuration" className="block text-calm-subtle dark:text-dark-subtle mb-1">Long</label>
                        <input type="number" name="longBreakDuration" id="longBreakDuration" value={settings.longBreakDuration} onChange={handleNumericChange} className={inputClass} />
                    </div>
                </div>
            </SettingRow>
            
            <SettingRow title="Factory Reset" description="Erase all subjects, tasks, and settings.">
                <button
                    onClick={onFactoryReset}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                >
                    Reset Data
                </button>
            </SettingRow>

        </div>

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-calm-accent text-white font-semibold hover:bg-calm-accent-hover transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
