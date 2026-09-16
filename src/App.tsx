import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Qualification } from './components/Qualification';
import { Skills } from './components/Skills';
import { FeaturedProjects } from './components/FeaturedProjects';
import { HomeActivityTeaser } from './components/HomeActivityTeaser';
import { GitHub } from './components/GitHub';
import { Contact } from './components/Contact';
import { Footer } from './components/common/Footer';
import { ProjectsView } from './components/ProjectsView';
import { ActivitiesView } from './components/ActivitiesView';
import { ScrollTop } from './components/ScrollTop';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'activities'>('home');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem('selected-theme');
    return saved ? saved === 'dark' : true;
  });

  // Apply dark theme class to document.body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('selected-theme', 'dark');
      localStorage.setItem('selected-icon', 'uil-sun');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('selected-theme', 'light');
      localStorage.setItem('selected-icon', 'uil-moon');
    }
  }, [isDarkTheme]);

  // Synchronize URL hash with views
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'all-projects' || hash === 'projects') {
        setCurrentView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'all-activities' || hash === 'activities') {
        setCurrentView('activities');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'all-projects' || sectionId === 'projects') {
      setCurrentView('projects');
      window.location.hash = 'projects';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'all-activities' || sectionId === 'activities') {
      setCurrentView('activities');
      window.location.hash = 'activities';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to standard in-page home sections
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = sectionId;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.location.hash = sectionId;
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app-container">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onNavigateSection={handleNavigate}
      />

      <main className="main">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Qualification />
            <Skills />
            <HomeActivityTeaser onViewAllActivities={() => handleNavigate('activities')} />
            <FeaturedProjects onViewAllProjects={() => handleNavigate('projects')} />
            <GitHub />
            <Contact />
          </>
        )}

        {currentView === 'projects' && (
          <ProjectsView onBackToHome={() => handleNavigate('home')} />
        )}

        {currentView === 'activities' && (
          <ActivitiesView onBackToHome={() => handleNavigate('home')} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <ScrollTop />
    </div>
  );
};

export default App;
