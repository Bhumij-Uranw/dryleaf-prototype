
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center">
      <LeafIcon className="w-10 h-10 text-calm-accent" />
      <h1 className="ml-3 text-4xl font-bold text-calm-text tracking-tight">Dryleaf</h1>
    </header>
  );
};
