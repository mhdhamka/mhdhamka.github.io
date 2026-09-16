import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentView: 'home' | 'projects' | 'activities';
  setCurrentView: (view: 'home' | 'projects' | 'activities') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onNavigateSection
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
      setIsDarkTheme(false);
    } else {
      document.body.classList.add('dark-theme');
      setIsDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    if (newTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('selected-theme', 'dark');
      localStorage.setItem('selected-icon', 'uil-sun');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('selected-theme', 'light');
      localStorage.setItem('selected-icon', 'uil-moon');
    }
  };

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        onNavigateSection(sectionId);
      }, 50);
    } else {
      onNavigateSection(sectionId);
    }
  };

  return (
    <header className="header" id="header">
      <nav className="nav container" aria-label="Main Navigation">
        {/* Logo with Developer Icon */}
        <a
          href="#home"
          className="nav__logo"
          id="nav-logo"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNavClick('home');
            }
          }}
        >
          <div className="nav__logo-icon">
            <i className="uil uil-brackets-curly" aria-hidden="true"></i>
          </div>
          <span className="nav__logo-text">mhdhamka Portfolio</span>
        </a>

        <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu" role="navigation">
          <ul className="nav__list grid">
            <li className="nav__item">
              <a
                href="#home"
                className={`nav__link ${currentView === 'home' ? 'active-link' : ''}`}
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('home');
                  }
                }}
              >
                <i className="uil uil-estate nav__icon" aria-hidden="true"></i> Home
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#about"
                className="nav__link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('about');
                  }
                }}
              >
                <i className="uil uil-user nav__icon" aria-hidden="true"></i> About
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#qualification"
                className="nav__link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('qualification');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('qualification');
                  }
                }}
              >
                <i className="uil uil-book-alt nav__icon" aria-hidden="true"></i> Qualification
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#skills"
                className="nav__link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('skills');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('skills');
                  }
                }}
              >
                <i className="uil uil-wrench nav__icon" aria-hidden="true"></i> Stacks
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#activity"
                className={`nav__link ${currentView === 'activities' ? 'active-link' : ''}`}
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('activity');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('activity');
                  }
                }}
              >
                <i className="uil uil-schedule nav__icon" aria-hidden="true"></i> Activity
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#project"
                className={`nav__link ${currentView === 'projects' ? 'active-link' : ''}`}
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('project');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('project');
                  }
                }}
              >
                <i className="uil uil-file-alt nav__icon" aria-hidden="true"></i> Projects
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#github"
                className="nav__link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('github');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('github');
                  }
                }}
              >
                <i className="uil uil-github nav__icon" aria-hidden="true"></i> GitHub
              </a>
            </li>
          </ul>
          <i
            className="uil uil-times nav__close"
            id="nav-close"
            role="button"
            tabIndex={0}
            aria-label="Close Navigation Menu"
            onClick={() => setIsMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsMenuOpen(false);
              }
            }}
          ></i>
        </div>

        <div className="nav__btns">
          <i
            className={`uil ${isDarkTheme ? 'uil-sun' : 'uil-moon'} change-theme`}
            id="theme-button"
            role="button"
            tabIndex={0}
            aria-label="Toggle Dark/Light Theme"
            onClick={toggleTheme}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
              }
            }}
          ></i>
          <div
            className="nav__toggle"
            id="nav-toggle"
            role="button"
            tabIndex={0}
            aria-label="Open Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            onClick={() => setIsMenuOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsMenuOpen(true);
              }
            }}
          >
            <i className="uil uil-apps" aria-hidden="true"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};
