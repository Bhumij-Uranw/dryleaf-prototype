import React, { useState, useEffect } from 'react';
import { motivationService } from '../services/motivationService';

export const LoadingScreen: React.FC = () => {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      const fetchedQuotes = await motivationService.getMotivationalQuotes();
      setQuotes(fetchedQuotes);
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 4000); // Change quote every 4 seconds

      return () => clearInterval(interval);
    }
  }, [quotes]);

  return (
    <div className="fixed inset-0 bg-calm-bg flex flex-col items-center justify-center">
      <div className="text-center z-10 p-4">
        <h1 className="text-5xl font-bold text-calm-text tracking-tight mb-8">Dryleaf</h1>
        {quotes.length > 0 && (
          <p
            key={currentQuoteIndex}
            className="text-xl text-calm-text italic animate-fade-in-out"
          >
            "{quotes[currentQuoteIndex]}"
          </p>
        )}
      </div>
    </div>
  );
};
