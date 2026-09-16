import React, { useState, useEffect, useRef } from 'react';

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "Python & FastAPI Developer",
  "Data & AI Enthusiast"
];

const CODE_FILES: Record<string, { lang: string; code: React.ReactNode }> = {
  "main.py": {
    lang: "python",
    code: (
      <pre>
        <code>
          <span className="keyword">from</span> fastapi <span className="keyword">import</span> <span className="title">FastAPI</span>{'\n'}
          <span className="keyword">from</span> fastapi.middleware.cors <span className="keyword">import</span> <span className="title">CORSMiddleware</span>{'\n'}
          <span className="keyword">from</span> core_engine <span className="keyword">import</span> <span className="title">SoftwareEngineer</span>{'\n\n'}
          app = <span className="title">FastAPI</span>(title=<span className="string">"mhdhamka API"</span>){'\n'}
          app.add_middleware(<span className="title">CORSMiddleware</span>, allow_origins=[<span className="string">"*"</span>]){'\n\n'}
          engineer = <span className="title">SoftwareEngineer</span>(){'\n\n'}
          <span className="decorator">@app.get</span>(<span className="string">"/api/status"</span>){'\n'}
          <span className="keyword">async def</span> <span className="function">get_status</span>():{'\n'}
          {'    '}<span className="comment"># exposes live profile data to the frontend</span>{'\n'}
          {'    '}<span className="keyword">return</span> {'{'}{'\n'}
          {'        '}<span className="string">"name"</span>: <span className="string">"mhdhamka"</span>,{'\n'}
          {'        '}<span className="string">"stack"</span>: engineer.stack,{'\n'}
          {'        '}<span className="string">"status"</span>: engineer.status,{'\n'}
          {'    '}{'}'}
        </code>
      </pre>
    )
  },
  "core_engine.py": {
    lang: "python",
    code: (
      <pre>
        <code>
          <span className="keyword">class</span> <span className="title">SoftwareEngineer</span>:{'\n'}
          {'    '}<span className="comment"># core identity of the engine</span>{'\n'}
          {'    '}<span className="keyword">def</span> <span className="function">__init__</span>(<span className="params">self</span>):{'\n'}
          {'        '}<span className="params">self</span>.stack = [<span className="string">"FastAPI"</span>, <span className="string">"React"</span>, <span className="string">"Next.js"</span>]{'\n'}
          {'        '}<span className="params">self</span>.status = <span className="string">"Ready"</span>{'\n\n'}
          {'    '}<span className="keyword">def</span> <span className="function">build</span>(<span className="params">self</span>, idea: <span className="title">str</span>) -&gt; <span className="title">str</span>:{'\n'}
          {'        '}<span className="keyword">return</span> <span className="string">f"Shipping &#123;idea&#125;"</span>
        </code>
      </pre>
    )
  },
  "App.tsx": {
    lang: "react",
    code: (
      <pre>
        <code>
          <span className="keyword">import</span> {"{ useEffect, useState }"} <span className="keyword">from</span> <span className="string">"react"</span>;{"\n\n"}
          <span className="keyword">export default function</span> <span className="function">Home</span>() {"{\n"}
          {"  "}<span className="keyword">const</span> [status, setStatus] = <span className="function">useState</span>(<span className="keyword">null</span>);{"\n\n"}
          {"  "}<span className="function">useEffect</span>(() =&gt; {"{\n"}
          {"    "}<span className="function">fetch</span>(<span className="string">"/api/status"</span>){"\n"}
          {"      "}.then((res) =&gt; res.json()){"\n"}
          {"      "}.then(setStatus);{"\n"}
          {"  "}, []);{"\n\n"}
          {"  "}<span className="keyword">return</span> ({"\n"}
          {"    "}&lt;<span className="tag">main</span>&gt;{"\n"}
          {"      "}&lt;<span className="tag">h1</span>&gt;Hi, I&apos;m mhdhamka&lt;/<span className="tag">h1</span>&gt;{"\n"}
          {"      "}&lt;<span className="tag">p</span>&gt;{"{status?.status ?? "}<span className="string">"Loading..."</span>{"}"}&lt;/<span className="tag">p</span>&gt;{"\n"}
          {"    "}&lt;/<span className="tag">main</span>&gt;{"\n"}
          {"  "});{"\n"}
          {"}"}
        </code>
      </pre>
    )
  },
  "requirements.txt": {
    lang: "text",
    code: (
      <pre>
        <code>
          fastapi<span className="function">==</span><span className="number">0.115.0</span>{'\n'}
          uvicorn[standard]<span className="function">==</span><span className="number">0.30.6</span>{'\n'}
          pydantic<span className="function">==</span><span className="number">2.9.2</span>{'\n'}
          python-dotenv<span className="function">==</span><span className="number">1.0.1</span>
        </code>
      </pre>
    )
  },
  "package.json": {
    lang: "json",
    code: (
      <pre>
        <code>
          {'{'}{'\n'}
          {'  '}<span className="string">"name"</span>: <span className="string">"mhdhamka-portfolio"</span>,{'\n'}
          {'  '}<span className="string">"scripts"</span>: {'{'}{'\n'}
          {'    '}<span className="string">"dev"</span>: <span className="string">"vite"</span>,{'\n'}
          {'    '}<span className="string">"build"</span>: <span className="string">"vite build"</span>{'\n'}
          {'  '}{'}'},{'\n'}
          {'  '}<span className="string">"dependencies"</span>: {'{'}{'\n'}
          {'    '}<span className="string">"react"</span>: <span className="string">"^19.0.0"</span>,{'\n'}
          {'    '}<span className="string">"react-dom"</span>: <span className="string">"^19.0.0"</span>{'\n'}
          {'  '}{'}'}{'\n'}
          {'}'}
        </code>
      </pre>
    )
  }
};

const TERMINAL_LINES = [
  { text: "$ uvicorn main:app --reload", cls: "line-prompt" },
  { text: "INFO:     Uvicorn running on http://127.0.0.1:8000", cls: "line-info" },
  { text: "INFO:     Application startup complete.", cls: "line-ok" },
  { text: "", cls: "" },
  { text: "$ npm run dev", cls: "line-prompt" },
  { text: "▲ React + Vite 6.0", cls: "line-info" },
  { text: "- Local:  http://localhost:3000", cls: "line-dim" },
  { text: "✓ Ready in 450ms", cls: "line-ok" },
];

interface HeroProps {
  onNavigate?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Tooltip & copy states
  const [emailTooltip, setEmailTooltip] = useState("Copy Email");
  const [npxTooltip, setNpxTooltip] = useState("npx mhdhamka-cv");

  // Typewriter state
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // GitHub stats
  const [repoCount, setRepoCount] = useState<number | string>("18+");

  // VS Code state
  const [activeFile, setActiveFile] = useState("main.py");
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(true);
  const [binaryOpened, setBinaryOpened] = useState(false);

  // Terminal typewriter
  const [terminalOutput, setTerminalOutput] = useState<{ text: string; cls: string }[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedRole.length < current.length) {
      timer = setTimeout(() => {
        setTypedRole(current.slice(0, typedRole.length + 1));
      }, 90);
    } else if (!isDeleting && typedRole.length === current.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typedRole.length > 0) {
      timer = setTimeout(() => {
        setTypedRole(current.slice(0, typedRole.length - 1));
      }, 45);
    } else if (isDeleting && typedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex]);

  // Fetch GitHub public repo count
  useEffect(() => {
    fetch("https://api.github.com/users/mhdhamka")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.public_repos === "number") {
          setRepoCount(data.public_repos);
        }
      })
      .catch(() => {});
  }, []);

  // Terminal loop effect
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const runLoop = () => {
      if (isCancelled) return;
      if (lineIdx >= TERMINAL_LINES.length) {
        timer = setTimeout(() => {
          setTerminalOutput([]);
          lineIdx = 0;
          charIdx = 0;
          runLoop();
        }, 2600);
        return;
      }

      const currentLine = TERMINAL_LINES[lineIdx];
      if (!currentLine.text) {
        setTerminalOutput((prev) => [...prev, { text: "", cls: "" }]);
        lineIdx++;
        charIdx = 0;
        timer = setTimeout(runLoop, 200);
        return;
      }

      if (charIdx === 0) {
        setTerminalOutput((prev) => [...prev, { text: "", cls: currentLine.cls }]);
      }

      if (charIdx < currentLine.text.length) {
        const nextChar = currentLine.text[charIdx];
        charIdx++;
        setTerminalOutput((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last) {
            next[next.length - 1] = { ...last, text: last.text + nextChar };
          }
          return next;
        });
        timer = setTimeout(runLoop, 20);
      } else {
        lineIdx++;
        charIdx = 0;
        timer = setTimeout(runLoop, 260);
      }
    };

    runLoop();

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const copyEmail = () => {
    navigator.clipboard.writeText("m.hamka017@gmail.com");
    setEmailTooltip("Copied!");
    setTimeout(() => setEmailTooltip("Copy Email"), 2500);
  };

  const copyNpx = () => {
    navigator.clipboard.writeText("npx mhdhamka-cv");
    setNpxTooltip("Copied Command!");
    setTimeout(() => setNpxTooltip("npx mhdhamka-cv"), 2500);
  };

  return (
    <section className="home section" id="home">
      <aside className="home__social sticky-social-dock" aria-label="Social Links and Quick Actions">
        <a
          href="https://www.linkedin.com/in/mhdhamka/"
          target="_blank"
          rel="noopener noreferrer"
          className="home__social-icon"
          aria-label="LinkedIn"
        >
          <i className="uil uil-linkedin-alt" aria-hidden="true"></i>
          <span className="dock-tooltip">LinkedIn</span>
        </a>

        <a
          href="https://github.com/mhdhamka"
          target="_blank"
          rel="noopener noreferrer"
          className="home__social-icon"
          aria-label="GitHub"
        >
          <i className="uil uil-github-alt" aria-hidden="true"></i>
          <span className="dock-tooltip">GitHub</span>
        </a>

        <div
          className="email-copy-wrapper home__social-icon"
          id="copyEmailBtn"
          aria-label="Copy Email"
          role="button"
          tabIndex={0}
          onClick={copyEmail}
        >
          <i className="uil uil-envelope email-icon" aria-hidden="true"></i>
          <span className="dock-tooltip" id="copyTooltip">{emailTooltip}</span>
        </div>

        <a href="#contact" className="home__social-icon" aria-label="Contact Me">
          <i className="uil uil-message" aria-hidden="true"></i>
          <span className="dock-tooltip">Contact Me</span>
        </a>

        <div
          className="home__social-icon terminal-copy-btn"
          id="copyNpxBtn"
          aria-label="Copy terminal command"
          role="button"
          tabIndex={0}
          onClick={copyNpx}
        >
          <i className="uil uil-copy" aria-hidden="true"></i>
          <span className="dock-tooltip" id="npxTooltip">{npxTooltip}</span>
        </div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/assets/resume/mhdhamka_resume.pdf"
          className="home__social-icon"
          aria-label="Resume"
        >
          <i className="uil uil-download-alt" aria-hidden="true"></i>
          <span className="dock-tooltip">Resume</span>
        </a>
      </aside>

      <div className="home__container container">
        <div className="home__content grid">
          <div className="home__data">
            <div className="home__meta-wrapper">
              <div className="home__status-badge">
                <span className="status-ping" aria-hidden="true"></span>
                <span className="status-text">
                  <code>status: open_to_work = true</code>
                </span>
              </div>

              <div className="home__health-badge">
                <span className="health-dot" aria-hidden="true"></span>
                <span className="health-text">
                  API: <code>99.9% uptime</code>
                </span>
              </div>

              <span className="home__location">
                <i className="uil uil-map-marker" aria-hidden="true"></i> Kuching, Sarawak
              </span>
            </div>

            <h1 className="home__title">
              Hi, I'm <span id="name" className="highlight-text">mhdhamka</span>
            </h1>

            <h3 className="home__subtitle">
              I'm a <span className="typed-text">{typedRole}</span>
              <span className="cursor" aria-hidden="true">&nbsp;</span>
            </h3>

            <p className="home__description">
              Software Engineering graduate specializing in full-stack web development, backend API design, and data-driven applications powered by Python, FastAPI, and machine learning.
            </p>

            <div className="home__tech-stack">
              <span className="tech-pill">
                <i className="uil uil-react" aria-hidden="true"></i> React / Next.js
              </span>
              <span className="tech-pill">
                <i className="uil uil-python" aria-hidden="true"></i> Python / FastAPI
              </span>
              <span className="tech-pill">
                <i className="uil uil-database" aria-hidden="true"></i> Pandas / NumPy / ML
              </span>
            </div>

            <div className="home__metrics">
              <div className="metric-item">
                <span className="metric-value" id="repoCount">{repoCount}</span>
                <span className="metric-label">Repositories Built</span>
              </div>
              <div className="metric-divider" aria-hidden="true"></div>
              <div className="metric-item">
                <span className="metric-value" id="stackCount">3+</span>
                <span className="metric-label">Core Tech Stacks</span>
              </div>
              <div className="metric-divider" aria-hidden="true"></div>
              <div className="metric-item">
                <span className="metric-value">100%</span>
                <span className="metric-label">Commit Frequency</span>
              </div>
            </div>

            <div className="home__scroll">
              <a href="#about" className="home__scroll-button button--flex">
                <i className="uil uil-mouse-alt home__scroll-mouse" aria-hidden="true"></i>
                <span className="home__scroll-name">Scroll down</span>
                <i className="uil uil-arrow-down home__scroll-arrow" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Interactive VS Code Window */}
          <div className="home__vscode-window" id="vscodeWindow">
            <div className="vscode__topbar">
              <div className="vscode__window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="vscode__workspace-title">mhdhamka-portfolio - VS Code</div>
              <button
                type="button"
                className="vscode__terminal-toggle"
                id="terminalToggle"
                aria-expanded={isTerminalExpanded}
                title="Toggle Terminal"
                onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
                <span>Terminal</span>
              </button>
            </div>

            <div className="vscode__workspace">
              {/* Activity Bar */}
              <div
                className="vscode__activity-bar"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '10px'
                }}
              >
                <div className="activity-bar-top">
                  <div className="activity-icon active" title="Explorer">
                    <i className="uil uil-files-landscapes"></i>
                  </div>
                  <div className="activity-icon" title="Search">
                    <i className="uil uil-search"></i>
                  </div>
                  <div className="activity-icon" title="Source Control">
                    <i className="uil uil-code-branch"></i>
                    <span className="activity-badge">3</span>
                  </div>
                  <div className="activity-icon" title="Debug">
                    <i className="uil uil-bug"></i>
                  </div>
                  <div className="activity-icon" title="Extensions">
                    <i className="uil uil-box"></i>
                  </div>
                </div>

                <div
                  className="activity-bar-bottom"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                >
                  <div
                    className="home__img activity-profile-blob"
                    style={{ cursor: 'pointer' }}
                    title="mhdhamka"
                  >
                    <svg
                      className="home__blob"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <defs>
                        <clipPath id="circleMaskActivity">
                          <circle cx="100" cy="100" r="90" />
                        </clipPath>
                      </defs>
                      <circle className="home__blob-ring" cx="100" cy="100" r="92" />
                      <image
                        className="home__blob-img"
                        x="0"
                        y="0"
                        width="200"
                        height="200"
                        href="/assets/img/photo.jpg"
                        clipPath="url(#circleMaskActivity)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </svg>
                  </div>
                  <div className="activity-icon settings" title="Settings">
                    <i className="uil uil-setting"></i>
                  </div>
                </div>
              </div>

              {/* Sidebar Tree */}
              <div className="vscode__sidebar">
                <div className="sidebar__header">Explorer</div>
                <div className="sidebar__section-title">
                  <i className="uil uil-angle-down"></i> PORTFOLIO-WORKSPACE
                </div>
                <div className="sidebar__file-tree" id="fileTree">
                  <div className="folder-item">
                    <i className="uil uil-angle-down"></i> backend
                  </div>
                  <div
                    className={`file-item indent ${activeFile === 'main.py' ? 'active' : ''}`}
                    onClick={() => setActiveFile('main.py')}
                  >
                    <i className="uil uil-file-code text-python"></i> main.py
                  </div>
                  <div
                    className={`file-item indent ${activeFile === 'core_engine.py' ? 'active' : ''}`}
                    onClick={() => setActiveFile('core_engine.py')}
                  >
                    <i className="uil uil-file-code text-python"></i> core_engine.py
                  </div>
                  <div
                    className={`file-item indent ${activeFile === 'requirements.txt' ? 'active' : ''}`}
                    onClick={() => setActiveFile('requirements.txt')}
                  >
                    <i className="uil uil-file-alt text-muted"></i> requirements.txt
                  </div>

                  <div className="folder-item">
                    <i className="uil uil-angle-down"></i> frontend
                  </div>
                  <div
                    className={`file-item indent ${activeFile === 'App.tsx' ? 'active' : ''}`}
                    onClick={() => setActiveFile('App.tsx')}
                  >
                    <i className="uil uil-file-code text-react"></i> App.tsx
                  </div>
                  <div
                    className={`file-item indent ${activeFile === 'package.json' ? 'active' : ''}`}
                    onClick={() => setActiveFile('package.json')}
                  >
                    <i className="uil uil-file-alt text-json"></i> package.json
                  </div>

                  <div
                    className={`file-item ${activeFile === 'profile.png' ? 'active' : ''}`}
                    onClick={() => setActiveFile('profile.png')}
                  >
                    <i className="uil uil-camera text-image"></i> profile.png
                  </div>
                </div>
              </div>

              {/* Editor Pane */}
              <div className="vscode__editor-pane">
                <div className="vscode__tabs" id="fileTabs">
                  <div
                    className={`vscode__tab ${activeFile === 'main.py' ? 'active' : ''}`}
                    onClick={() => setActiveFile('main.py')}
                  >
                    <i className="uil uil-file-code text-python" aria-hidden="true"></i> main.py
                  </div>
                  <div
                    className={`vscode__tab ${activeFile === 'core_engine.py' ? 'active' : ''}`}
                    onClick={() => setActiveFile('core_engine.py')}
                  >
                    <i className="uil uil-file-code text-python" aria-hidden="true"></i> core_engine.py
                  </div>
                  <div
                    className={`vscode__tab ${activeFile === 'App.tsx' ? 'active' : ''}`}
                    onClick={() => setActiveFile('App.tsx')}
                  >
                    <i className="uil uil-file-code text-react" aria-hidden="true"></i> App.tsx
                  </div>
                  <div
                    className={`vscode__tab ${activeFile === 'requirements.txt' ? 'active' : ''}`}
                    onClick={() => setActiveFile('requirements.txt')}
                  >
                    <i className="uil uil-file-alt text-muted" aria-hidden="true"></i> requirements.txt
                  </div>
                  <div
                    className={`vscode__tab ${activeFile === 'package.json' ? 'active' : ''}`}
                    onClick={() => setActiveFile('package.json')}
                  >
                    <i className="uil uil-file-alt text-json" aria-hidden="true"></i> package.json
                  </div>
                  <div
                    className={`vscode__tab ${activeFile === 'profile.png' ? 'active' : ''}`}
                    onClick={() => setActiveFile('profile.png')}
                  >
                    <i className="uil uil-camera text-image" aria-hidden="true"></i> profile.png
                  </div>
                </div>

                <div className="vscode__body">
                  {activeFile !== 'profile.png' ? (
                    <div className="code-panel active">
                      <div className="hero-code-snippet">
                        {CODE_FILES[activeFile]?.code}
                      </div>
                    </div>
                  ) : (
                    <div className="code-panel binary-preview active">
                      <i className="uil uil-image-v text-image binary-preview__icon" aria-hidden="true"></i>
                      <p>This file is not displayed in the editor because it is a binary file.</p>
                      <button
                        type="button"
                        className="binary-preview__btn"
                        disabled={binaryOpened}
                        onClick={() => setBinaryOpened(true)}
                      >
                        {binaryOpened ? 'Opened (preview unavailable)' : 'Open Anyway'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Terminal Pane */}
                <div className={`vscode__terminal ${!isTerminalExpanded ? 'collapsed' : ''}`} id="vscodeTerminal">
                  <div className="vscode__terminal-header">
                    <div className="vscode__terminal-tabs">
                      <span className="vscode__terminal-tab">PROBLEMS</span>
                      <span className="vscode__terminal-tab">OUTPUT</span>
                      <span className="vscode__terminal-tab active">TERMINAL</span>
                    </div>
                    <span className="vscode__terminal-shell">
                      <i className="uil uil-plus" aria-hidden="true"></i> bash
                    </span>
                  </div>
                  <div className="vscode__terminal-body" id="terminalBody" ref={terminalRef}>
                    {terminalOutput.map((line, i) => (
                      <div key={i} className={line.cls}>
                        {line.text}
                        {i === terminalOutput.length - 1 && <span className="terminal-caret"></span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
