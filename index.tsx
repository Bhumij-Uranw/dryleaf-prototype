
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LoadingScreen } from './components/LoadingScreen';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the animation and quotes to be visible
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return loading ? <LoadingScreen /> : <App />;
};


const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);