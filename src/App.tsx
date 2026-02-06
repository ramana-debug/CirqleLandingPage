import React, { useState, useEffect } from 'react';
import LandingPage from './landingPage';
import TermsPage from './terms';
import PrivacyPage from './privacy';
import DeleteDataPage from './deletePage';
import HelpPage from './HelpPage';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top whenever the path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Function to navigate programmatically
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Render based on current path
  switch (currentPath) {
    case '/terms':
      return <TermsPage/>;
    case '/privacy':
      return <PrivacyPage/>;
    case '/deleteUserData':
      return <DeleteDataPage/>;
    case '/help':
      return <HelpPage/>;
    case '/':
    default:
      return <LandingPage />;
  }
};

export default App;