import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <h2 className="footer__title">Mohd Hamka</h2>
            <span className="footer__subtitle">Software Engineer</span>
          </div>

          <ul className="footer__links">
            <li>
              <a
                href="#home"
                className="footer__link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate('home');
                  }
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#project"
                className="footer__link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('project');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate('project');
                  }
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="footer__link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate('contact');
                  }
                }}
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="footer__socials">
            <a
              href="https://www.linkedin.com/in/mhdhamka/"
              className="footer__social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              tabIndex={0}
            >
              <i className="uil uil-linkedin-alt" aria-hidden="true"></i>
            </a>
            <a
              href="https://github.com/mhdhamka"
              className="footer__social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              tabIndex={0}
            >
              <i className="uil uil-github" aria-hidden="true"></i>
            </a>
            <a
              href="https://x.com/mhdhamka_"
              className="footer__social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              tabIndex={0}
            >
              <i className="uil uil-twitter" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <p className="footer__copy">&#169; 2026 mhdhamka. Developed &amp; Maintained.</p>
      </div>
    </footer>
  );
};

