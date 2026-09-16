import React, { useState } from 'react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approach' | 'focus' | 'beyond'>('approach');

  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">Beyond the Resume</span>

      <div className="about__container container grid">
        {/* Visual Profile & Quick Stats Box */}
        <div className="about__img">
          <div className="about__profile-card">
            <div className="profile__header-badge">
              <i className="uil uil-graduation-cap" aria-hidden="true"></i>
              <span>UNIMAS Alumni</span>
            </div>

            <div className="profile__content-center">
              <div className="profile__avatar-container">
                <img
                  src="/assets/img/photo.jpg"
                  alt="Mohd Hamka"
                  className="profile__img"
                  onError={(e: any) => {
                    e.target.src = '/assets/img/preview.jpg';
                  }}
                />
              </div>
              <h3 className="profile__name">Mohd Hamka</h3>
              <p className="profile__role">Software Engineer</p>
            </div>

            <div className="profile__footer-stats">
              <div className="stat__item">
                <span className="stat__number">B.Sc.</span>
                <span className="stat__label">Software Eng</span>
              </div>
              <div className="stat__divider"></div>
              <div className="stat__item">
                <span className="stat__number">AI/ML</span>
                <span className="stat__label">Specialization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Data */}
        <div className="about__data">
          <p className="about__description">
            My journey into tech started with a simple obsession: turning messy, real-world problems into systems that just work. That curiosity carried me through a Software Engineering degree at <strong style={{ color: '#c084fc' }}>UNIMAS</strong>, and it still shapes how I approach every project today, start from the data, design for the person who&apos;ll actually use it, and sweat the details in between.
          </p>

          {/* Interactive "click to explore" panel */}
          <div className="about__pulse" id="aboutPulse">
            <div className="pulse__tabs" role="tablist" aria-label="About me, by category">
              <button
                type="button"
                className={`pulse__tab ${activeTab === 'approach' ? 'active' : ''}`}
                onClick={() => setActiveTab('approach')}
                role="tab"
                aria-selected={activeTab === 'approach'}
              >
                <i className="uil uil-compass" aria-hidden="true"></i> Approach
              </button>
              <button
                type="button"
                className={`pulse__tab ${activeTab === 'focus' ? 'active' : ''}`}
                onClick={() => setActiveTab('focus')}
                role="tab"
                aria-selected={activeTab === 'focus'}
              >
                <i className="uil uil-crosshairs" aria-hidden="true"></i> Focus Areas
              </button>
              <button
                type="button"
                className={`pulse__tab ${activeTab === 'beyond' ? 'active' : ''}`}
                onClick={() => setActiveTab('beyond')}
                role="tab"
                aria-selected={activeTab === 'beyond'}
              >
                <i className="uil uil-coffee" aria-hidden="true"></i> Beyond Code
              </button>
            </div>

            <div
              className={`pulse__panel ${activeTab === 'approach' ? 'active' : ''}`}
              role="tabpanel"
            >
              <p>
                I&apos;d rather ship something small and working than perfect and stuck. Most projects start with me sketching the data model first, once that&apos;s solid, the API and the UI tend to follow naturally.
              </p>
            </div>

            <div
              className={`pulse__panel ${activeTab === 'focus' ? 'active' : ''}`}
              role="tabpanel"
            >
              <p>
                My university coursework runs through the fundamentals like <strong style={{ color: '#c084fc' }}>C, C++, PHP,</strong> and JavaScript, while my own side projects are where I get to stretch into the modern stack: <strong style={{ color: '#c084fc' }}>Python, TypeScript, React, FastAPI</strong>, and occasionally Three.js or Laravel when a project calls for it.
              </p>
            </div>

            <div
              className={`pulse__panel ${activeTab === 'beyond' ? 'active' : ''}`}
              role="tabpanel"
            >
              <p>
                Outside of code, I&apos;m usually chasing a good sunset around Kuching or hunting down new food spots. I&apos;m also a bit obsessed with football, and I&apos;ll happily go down a rabbit hole about history or geopolitics if you let me.
              </p>
            </div>
          </div>

          <blockquote className="about__quote">
            “Strive to build things that make a difference!”
          </blockquote>

          <div className="about__buttons">
            <a href="#contact" className="button button--flex">
              Let&apos;s Connect
              <i className="uil uil-navigator button__icon" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
