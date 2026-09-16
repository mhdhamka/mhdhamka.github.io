import React, { useState, useRef, useEffect } from 'react';

export interface TechItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  icon: string; // url to SVG or unicon class
  isDevicon: boolean;
  level: 'Advanced' | 'Intermediate';
  percent: number;
  experience: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconImg: string;
  summary: string;
  skills: {
    name: string;
    icon: string;
    isDevicon: boolean;
    level: 'Advanced' | 'Intermediate';
    percent: number;
    experience: string;
    description: string;
  }[];
}

const ALL_TECH_ITEMS: TechItem[] = [
  {
    id: "python",
    name: "Python",
    categoryId: "lang",
    categoryName: "Programming Languages",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 90,
    experience: "Core Language • 3+ Years",
    description: "Primary language for FastAPI microservices, automated scraping, data pipelines, and AI scripting."
  },
  {
    id: "javascript",
    name: "JavaScript",
    categoryId: "lang",
    categoryName: "Programming Languages",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 90,
    experience: "Modern ES6+ & Web APIs",
    description: "Deep knowledge of asynchronous programming, promises, event loop, and DOM performance optimization."
  },
  {
    id: "typescript",
    name: "TypeScript",
    categoryId: "lang",
    categoryName: "Programming Languages",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    isDevicon: true,
    level: "Intermediate",
    percent: 80,
    experience: "Strict Type Safety",
    description: "Used across modern React and Node.js codebases for generics, strict interfaces, and scalable architectures."
  },
  {
    id: "php",
    name: "PHP",
    categoryId: "lang",
    categoryName: "Programming Languages",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 85,
    experience: "Backend & MVC",
    description: "Strong foundation in object-oriented PHP, MVC architectures, database abstraction, and web services."
  },
  {
    id: "fastapi",
    name: "FastAPI",
    categoryId: "backend",
    categoryName: "Backend & API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 90,
    experience: "High-Speed Async APIs",
    description: "Asynchronous endpoint design, Pydantic data schemas, dependency injection, and automatic Swagger docs."
  },
  {
    id: "laravel",
    name: "Laravel",
    categoryId: "backend",
    categoryName: "Backend & API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 85,
    experience: "Full-Featured MVC",
    description: "Eloquent ORM relational queries, auth middleware, queues, migrations, and modular REST API backends."
  },
  {
    id: "nodejs",
    name: "Node.js",
    categoryId: "backend",
    categoryName: "Backend & API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 85,
    experience: "Runtime & Microservices",
    description: "RESTful server services, middleware pipelines, file stream handling, and real-time event sockets."
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    categoryId: "backend",
    categoryName: "Backend & API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    isDevicon: true,
    level: "Intermediate",
    percent: 80,
    experience: "Type-Safe DB Modeling",
    description: "Declarative schema modeling, automatic migration management, and auto-generated TypeScript queries."
  },
  {
    id: "react",
    name: "React",
    categoryId: "frontend",
    categoryName: "Frontend Development",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 90,
    experience: "SPA & Component Architecture",
    description: "Declarative UI engineering, custom hooks, memoization, performance profiling, and modern state patterns."
  },
  {
    id: "nextjs",
    name: "Next.js",
    categoryId: "frontend",
    categoryName: "Frontend Development",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 85,
    experience: "Full-Stack React Framework",
    description: "App Router architecture, React Server Components (RSC), SSR, SSG caching, and server actions."
  },
  {
    id: "vite",
    name: "Vite",
    categoryId: "frontend",
    categoryName: "Frontend Development",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 90,
    experience: "Modern Bundler & HMR",
    description: "Ultra-fast dev server setup, Rollup build configuration, plugin ecosystem, and bundle splitting."
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    categoryId: "frontend",
    categoryName: "Frontend Development",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 90,
    experience: "Utility-First Design System",
    description: "Responsive multi-breakpoint layouts, custom themes, dark-mode styling, and micro-animations."
  },
  {
    id: "mysql",
    name: "MySQL & MariaDB",
    categoryId: "db",
    categoryName: "Database & Data",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 85,
    experience: "Relational Schema Design",
    description: "Database normalization, foreign key constraints, indexing strategies, stored procedures, and queries."
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    categoryId: "db",
    categoryName: "Database & Data",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 85,
    experience: "Enterprise SQL & JSONB",
    description: "Advanced relational querying, full-text indexing, JSONB data manipulation, and ACID transaction safety."
  },
  {
    id: "docker",
    name: "Docker",
    categoryId: "devops",
    categoryName: "DevOps & Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    isDevicon: true,
    level: "Intermediate",
    percent: 75,
    experience: "Containerization",
    description: "Multi-stage Dockerfile creation, local container orchestration with Docker Compose, and image optimization."
  },
  {
    id: "git",
    name: "Git & GitHub",
    categoryId: "devops",
    categoryName: "DevOps & Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 88,
    experience: "Version Control & Workflows",
    description: "Feature branching, pull requests, semantic release tags, interactive rebase, and GitHub Actions."
  },
  {
    id: "linux",
    name: "Linux & Bash",
    categoryId: "devops",
    categoryName: "DevOps & Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 85,
    experience: "Unix Environment & CLI",
    description: "Shell scripting, process management, SSH remote server deployment, system logs, and security permissions."
  },
  {
    id: "postman",
    name: "Postman",
    categoryId: "devops",
    categoryName: "DevOps & Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    isDevicon: true,
    level: "Advanced",
    percent: 90,
    experience: "API Testing & Automation",
    description: "Integration test collections, automated environment variables, response schema assertions, and mocks."
  },
  {
    id: "scikitlearn",
    name: "scikit-learn",
    categoryId: "aiml",
    categoryName: "AI & Machine Learning",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
    isDevicon: true,
    level: "Intermediate",
    percent: 80,
    experience: "ML Modeling & Evaluation",
    description: "Classification, regression algorithms, hyperparameter tuning via GridSearchCV, and performance metrics."
  },
  {
    id: "numpy",
    name: "Pandas & NumPy",
    categoryId: "aiml",
    categoryName: "AI & Machine Learning",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    isDevicon: true,
    level: "Intermediate",
    percent: 80,
    experience: "Data Wrangling & Analysis",
    description: "DataFrame manipulations, vector calculations, missing value imputation, and statistical feature analysis."
  }
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "lang",
    title: "Programming Languages",
    iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    summary: "Foundational & modern programming languages for frontend, backend, and data processing.",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 90,
        experience: "3+ Years • Core Engine",
        description: "Primary language for FastAPI backends, data pipelines, automation, and AI scripting."
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 90,
        experience: "Modern ES6+ & DOM APIs",
        description: "Full proficiency with asynchronous workflows, closures, promises, and modern frontend engines."
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        isDevicon: true,
        level: "Intermediate",
        percent: 80,
        experience: "Strict Typing & Generics",
        description: "Type safety, complex object modeling, and developer tooling for React and Node applications."
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 85,
        experience: "OOP & MVC Patterns",
        description: "Robust server-side logic, database interactions, and enterprise web application backbones."
      },
    ]
  },
  {
    id: "backend",
    title: "Backend & API",
    iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    summary: "Scalable backend architectures, RESTful API design, and asynchronous server engineering.",
    skills: [
      {
        name: "Laravel / FastAPI / Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 85,
        experience: "Multi-Stack Frameworks",
        description: "Building production-grade microservices and full-featured MVC web applications."
      },
      {
        name: "RESTful APIs & WebSockets",
        icon: "uil-api",
        isDevicon: false,
        level: "Advanced",
        percent: 90,
        experience: "API Protocol Design",
        description: "REST standard compliance, real-time bidirectional communication, and endpoint security."
      },
      {
        name: "Prisma ORM",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
        isDevicon: true,
        level: "Intermediate",
        percent: 80,
        experience: "Type-Safe DB Layer",
        description: "Schema migrations, relational queries, and automated TypeScript database models."
      },
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    summary: "Responsive, accessible, and reactive single-page applications with modern design systems.",
    skills: [
      {
        name: "React / Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 90,
        experience: "SPA & Server Rendering",
        description: "Custom hooks, state management, component tree optimization, and SSR/SSG rendering."
      },
      {
        name: "Vite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 90,
        experience: "Sub-Second Dev Bundler",
        description: "Optimized Rollup bundling, lightning-fast HMR, and asset pipeline configuration."
      },
      {
        name: "Tailwind CSS / Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 90,
        experience: "Responsive Systems",
        description: "Mobile-first responsive design, custom palettes, dark themes, and pixel-precise styling."
      },
      {
        name: "Zustand",
        icon: "uil-layers",
        isDevicon: false,
        level: "Intermediate",
        percent: 80,
        experience: "Minimalist State Store",
        description: "Lightweight reactive client-side store with minimal boilerplate and decoupled logic."
      },
    ]
  },
  {
    id: "db",
    title: "Database & Data",
    iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    summary: "Relational database design, query optimization, indexing, and persistent cloud data stores.",
    skills: [
      {
        name: "MySQL / MariaDB / PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 85,
        experience: "Relational Systems",
        description: "Complex multi-table joins, indexing strategies, transaction ACID isolation, and performance tuning."
      },
      {
        name: "SQLite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
        isDevicon: true,
        level: "Intermediate",
        percent: 80,
        experience: "Embedded Storage",
        description: "Embedded databases for lightweight services, offline caches, and rapid local prototyping."
      },
      {
        name: "Database Design",
        icon: "uil-sitemap",
        isDevicon: false,
        level: "Advanced",
        percent: 85,
        experience: "ERD & Normalization",
        description: "Conceptual & physical modeling, entity normalization, constraints, and audit logging."
      },
    ]
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    summary: "Applied AI models, tabular data analysis, classification algorithms, and local LLM inference.",
    skills: [
      {
        name: "Pandas / NumPy",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        isDevicon: true,
        level: "Intermediate",
        percent: 80,
        experience: "Data Transformation",
        description: "Tabular data cleaning, vector operations, statistical profiling, and exploratory analysis."
      },
      {
        name: "scikit-learn",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
        isDevicon: true,
        level: "Intermediate",
        percent: 80,
        experience: "Predictive Modeling",
        description: "Supervised and unsupervised models, cross-validation, feature scaling, and evaluation metrics."
      },
      {
        name: "Data Analysis",
        icon: "uil-analytics",
        isDevicon: false,
        level: "Intermediate",
        percent: 80,
        experience: "Statistical Insights",
        description: "Identifying real-world trends, creating explanatory visual charts, and actionable metrics."
      },
      {
        name: "Ollama / LLaVA",
        icon: "uil-robot",
        isDevicon: false,
        level: "Intermediate",
        percent: 75,
        experience: "Local LLM Inference",
        description: "Running local multimodal and vision-language models on edge hardware for private inference."
      },
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    summary: "Version control workflows, containerized environments, Linux server management, and automated testing.",
    skills: [
      {
        name: "Git / GitHub / CI/CD",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 88,
        experience: "Version Control Workflows",
        description: "Git branching strategies, pull requests, automated GitHub Actions testing and deployment."
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        isDevicon: true,
        level: "Intermediate",
        percent: 75,
        experience: "Containerization",
        description: "Building reproducible container images, multi-container orchestration, and environment parity."
      },
      {
        name: "Postman / Linux / Bash",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        isDevicon: true,
        level: "Advanced",
        percent: 85,
        experience: "Automation & Testing",
        description: "Automated API verification suites, Linux shell administration, remote deployments, and cron scripts."
      },
    ]
  }
];

interface TooltipState {
  name: string;
  category: string;
  icon: string;
  isDevicon: boolean;
  level: 'Advanced' | 'Intermediate';
  percent: number;
  experience: string;
  description: string;
  x: number;
  y: number;
  showBelow: boolean;
}

export const Skills: React.FC = () => {
  // Flip states for cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Active category index for the carousel
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Carousel view mode: slider vs expanded grid
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Auto-play state
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Floating tooltip portal state
  const [activeTooltip, setActiveTooltip] = useState<TooltipState | null>(null);

  // Ref for horizontal scroll tracking
  const techTrackRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Toggle card flip
  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Tooltip trigger helper
  const handleShowTooltip = (
    e: React.SyntheticEvent,
    tech: {
      name: string;
      category: string;
      icon: string;
      isDevicon: boolean;
      level: 'Advanced' | 'Intermediate';
      percent: number;
      experience: string;
      description: string;
    }
  ) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const tooltipWidth = 290;
    const estimatedHeight = 180;

    let x = rect.left + rect.width / 2;
    // Keep away from horizontal screen edges
    if (x - tooltipWidth / 2 < 16) {
      x = tooltipWidth / 2 + 16;
    } else if (x + tooltipWidth / 2 > window.innerWidth - 16) {
      x = window.innerWidth - tooltipWidth / 2 - 16;
    }

    // If too close to viewport top, show below the element
    const showBelow = rect.top < estimatedHeight + 20;
    const y = showBelow ? rect.bottom + 12 : rect.top - 12;

    setActiveTooltip({
      ...tech,
      x,
      y,
      showBelow
    });
  };

  const handleHideTooltip = () => {
    setActiveTooltip(null);
  };

  // Keyboard accessibility: dismiss tooltip on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeTooltip) {
        setActiveTooltip(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTooltip]);

  // Scroll tech stack ribbon left/right
  const scrollTechRibbon = (direction: 'left' | 'right') => {
    if (techTrackRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      techTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Navigate to a specific category card
  const navigateToCategory = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, SKILL_CATEGORIES.length - 1));
    setCurrentCategoryIndex(clampedIndex);

    if (cardsContainerRef.current && cardRefs.current[clampedIndex]) {
      const targetCard = cardRefs.current[clampedIndex];
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  };

  // When clicking a tech item from ribbon, jump to its category
  const handleTechChipClick = (categoryId: string) => {
    const foundIndex = SKILL_CATEGORIES.findIndex((c) => c.id === categoryId);
    if (foundIndex !== -1) {
      navigateToCategory(foundIndex);
    }
  };

  // Auto-play category carousel if enabled
  useEffect(() => {
    if (!isAutoPlay || viewMode === 'grid') return;

    const timer = setInterval(() => {
      setCurrentCategoryIndex((prev) => {
        const nextIndex = (prev + 1) % SKILL_CATEGORIES.length;
        if (cardsContainerRef.current && cardRefs.current[nextIndex]) {
          cardRefs.current[nextIndex]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          });
        }
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlay, viewMode]);

  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Technical Stacks</h2>
      <span className="section__subtitle">
        Technologies and tools I use to build reliable software solutions
      </span>

      {/* ==================== IMPROVISED TECH STACK CAROUSEL RIBBON ==================== */}
      <div className="tech-stack-carousel-container">
        <div className="tech-stack-carousel-header">
          <div className="tech-stack-badge-pill">
            <i className="uil uil-bolt-alt" aria-hidden="true"></i>
            <span>Interactive Tech Stack • Hover for Proficiency Details</span>
          </div>

          <div className="tech-stack-nav-group">
            <button
              type="button"
              className="carousel-action-btn"
              tabIndex={0}
              onClick={() => scrollTechRibbon('left')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollTechRibbon('left');
                }
              }}
              aria-label="Scroll tech stack carousel left"
              title="Previous technologies"
            >
              <i className="uil uil-angle-left" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="carousel-action-btn"
              tabIndex={0}
              onClick={() => scrollTechRibbon('right')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollTechRibbon('right');
                }
              }}
              aria-label="Scroll tech stack carousel right"
              title="Next technologies"
            >
              <i className="uil uil-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div className="tech-stack-carousel-viewport">
          <div
            className="tech-stack-carousel-track"
            ref={techTrackRef}
            onMouseLeave={handleHideTooltip}
          >
            {ALL_TECH_ITEMS.map((tech) => (
              <div
                key={tech.id}
                className={`tech-chip-item ${
                  SKILL_CATEGORIES[currentCategoryIndex]?.id === tech.categoryId ? 'active' : ''
                }`}
                onClick={() => handleTechChipClick(tech.categoryId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTechChipClick(tech.categoryId);
                  }
                }}
                onMouseEnter={(e) =>
                  handleShowTooltip(e, {
                    name: tech.name,
                    category: tech.categoryName,
                    icon: tech.icon,
                    isDevicon: tech.isDevicon,
                    level: tech.level,
                    percent: tech.percent,
                    experience: tech.experience,
                    description: tech.description
                  })
                }
                onMouseLeave={handleHideTooltip}
                onFocus={(e) =>
                  handleShowTooltip(e, {
                    name: tech.name,
                    category: tech.categoryName,
                    icon: tech.icon,
                    isDevicon: tech.isDevicon,
                    level: tech.level,
                    percent: tech.percent,
                    experience: tech.experience,
                    description: tech.description
                  })
                }
                onBlur={handleHideTooltip}
                role="button"
                tabIndex={0}
                aria-label={`${tech.name} - ${tech.level} proficiency ${tech.percent}%. Press Enter to view in category.`}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="tech-chip-icon"
                  width={26}
                  height={26}
                  style={{
                    width: '26px',
                    height: '26px',
                    minWidth: '26px',
                    minHeight: '26px',
                    maxWidth: '26px',
                    maxHeight: '26px',
                    objectFit: 'contain',
                    flexShrink: 0
                  }}
                  loading="lazy"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="tech-chip-info">
                  <span className="tech-chip-name">{tech.name}</span>
                  <span className="tech-chip-level">
                    {tech.level} • {tech.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== CATEGORY CAROUSEL HEADER CONTROLS ==================== */}
      <div className="category-carousel-header">
        <div className="category-carousel-status">
          <span className="category-pill-counter">
            Category {currentCategoryIndex + 1} of {SKILL_CATEGORIES.length}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#f3e8ff', fontWeight: 600 }}>
            {SKILL_CATEGORIES[currentCategoryIndex]?.title}
          </span>
        </div>

        <div className="category-carousel-nav">
          {/* Play / Pause Auto-Rotation */}
          <button
            type="button"
            className={`carousel-action-btn ${isAutoPlay ? 'active' : ''}`}
            tabIndex={0}
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsAutoPlay(!isAutoPlay);
              }
            }}
            title={isAutoPlay ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
            aria-label={isAutoPlay ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
          >
            <i className={`uil ${isAutoPlay ? 'uil-pause' : 'uil-play'}`} aria-hidden="true"></i>
          </button>

          {/* View Mode Toggle: Slider vs Expanded Grid */}
          <button
            type="button"
            className="carousel-action-btn"
            tabIndex={0}
            onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel');
              }
            }}
            title={viewMode === 'carousel' ? 'Switch to All Categories Grid' : 'Switch to Carousel Slider'}
            aria-label={viewMode === 'carousel' ? 'Switch to All Categories Grid' : 'Switch to Carousel Slider'}
          >
            <i className={`uil ${viewMode === 'carousel' ? 'uil-apps' : 'uil-slider-h-range'}`} aria-hidden="true"></i>
          </button>

          {/* Prev Slide */}
          <button
            type="button"
            className="carousel-action-btn"
            tabIndex={0}
            onClick={() => navigateToCategory(currentCategoryIndex - 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToCategory(currentCategoryIndex - 1);
              }
            }}
            disabled={currentCategoryIndex === 0 && viewMode === 'carousel'}
            aria-label="Previous skill category"
            title="Previous category"
          >
            <i className="uil uil-arrow-left" aria-hidden="true"></i>
          </button>

          {/* Next Slide */}
          <button
            type="button"
            className="carousel-action-btn"
            tabIndex={0}
            onClick={() => navigateToCategory(currentCategoryIndex + 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToCategory(currentCategoryIndex + 1);
              }
            }}
            disabled={currentCategoryIndex === SKILL_CATEGORIES.length - 1 && viewMode === 'carousel'}
            aria-label="Next skill category"
            title="Next category"
          >
            <i className="uil uil-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {/* ==================== SKILL CATEGORY CARDS ==================== */}
      <div
        className="skills__container container"
        ref={cardsContainerRef}
        style={
          viewMode === 'grid'
            ? {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                overflowX: 'visible',
                gap: '1.5rem',
                justifyItems: 'center'
              }
            : undefined
        }
      >
        <div
          className="skills__grid"
          style={
            viewMode === 'grid'
              ? {
                  display: 'contents'
                }
              : undefined
          }
        >
          {SKILL_CATEGORIES.map((category, idx) => {
            const isFlipped = !!flippedCards[category.id];
            const isCurrent = currentCategoryIndex === idx;

            return (
              <div
                key={category.id}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`skill-card ${isFlipped ? 'is-flipped' : ''} ${isCurrent ? 'animated' : ''}`}
                onClick={() => {
                  setCurrentCategoryIndex(idx);
                  toggleFlip(category.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentCategoryIndex(idx);
                    toggleFlip(category.id);
                  } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    navigateToCategory(idx + 1);
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    navigateToCategory(idx - 1);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Skill category ${category.title}. Press Enter to flip card, Arrow keys to navigate categories.`}
                style={
                  isCurrent && viewMode === 'carousel'
                    ? {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease'
                      }
                    : undefined
                }
              >
                <div className="skill-card__content">
                  {/* Card Front Face */}
                  <div className="skill-card__front">
                    <img
                      src={category.iconImg}
                      className="skill-icon"
                      alt={category.title}
                      width={56}
                      height={56}
                      style={{
                        width: '56px',
                        height: '56px',
                        minWidth: '56px',
                        minHeight: '56px',
                        maxWidth: '56px',
                        maxHeight: '56px',
                        objectFit: 'contain',
                        marginBottom: '1.25rem'
                      }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleShowTooltip(e, {
                          name: category.title,
                          category: "Core Capability",
                          icon: category.iconImg,
                          isDevicon: true,
                          level: "Advanced",
                          percent: 88,
                          experience: `${category.skills.length} Key Technologies`,
                          description: category.summary
                        });
                      }}
                      onMouseLeave={handleHideTooltip}
                    />
                    <h3 className="skills__title">{category.title}</h3>
                    
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: '#94a3b8',
                        marginTop: '0.5rem',
                        textAlign: 'center',
                        lineHeight: 1.4,
                        padding: '0 0.5rem'
                      }}
                    >
                      {category.summary}
                    </p>

                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.75rem',
                        color: '#c084fc',
                        background: 'rgba(168, 85, 247, 0.1)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(168, 85, 247, 0.25)'
                      }}
                    >
                      <i className="uil uil-sync" aria-hidden="true"></i>
                      <span>Hover or click to flip</span>
                    </div>
                  </div>

                  {/* Card Back Face */}
                  <div className="skill-card__back">
                    <div className="skills__list">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="skill__badge"
                          tabIndex={0}
                          role="button"
                          aria-label={`${skill.name} - ${skill.level} proficiency ${skill.percent}%`}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            handleShowTooltip(e, {
                              name: skill.name,
                              category: category.title,
                              icon: skill.icon,
                              isDevicon: skill.isDevicon,
                              level: skill.level,
                              percent: skill.percent,
                              experience: skill.experience,
                              description: skill.description
                            });
                          }}
                          onMouseLeave={handleHideTooltip}
                          onFocus={(e) => {
                            e.stopPropagation();
                            handleShowTooltip(e, {
                              name: skill.name,
                              category: category.title,
                              icon: skill.icon,
                              isDevicon: skill.isDevicon,
                              level: skill.level,
                              percent: skill.percent,
                              experience: skill.experience,
                              description: skill.description
                            });
                          }}
                          onBlur={handleHideTooltip}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              handleShowTooltip(e, {
                                name: skill.name,
                                category: category.title,
                                icon: skill.icon,
                                isDevicon: skill.isDevicon,
                                level: skill.level,
                                percent: skill.percent,
                                experience: skill.experience,
                                description: skill.description
                              });
                            }
                          }}
                        >
                          <div className="skill__badge-header">
                            <span className="skill__name">
                              {skill.isDevicon ? (
                                <img
                                  src={skill.icon}
                                  alt={skill.name}
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    objectFit: 'contain',
                                    display: 'inline-block',
                                    verticalAlign: 'middle'
                                  }}
                                />
                              ) : (
                                <i className={`uil ${skill.icon}`} aria-hidden="true"></i>
                              )}
                              {skill.name}
                            </span>
                            <span className="skill__level">{skill.level}</span>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${skill.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== DOT / PILL PAGINATION ==================== */}
      <div className="category-carousel-dots" role="tablist" aria-label="Skill Category Pagination">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.id}
            type="button"
            className={`category-carousel-dot ${currentCategoryIndex === idx ? 'active' : ''}`}
            tabIndex={0}
            role="tab"
            aria-selected={currentCategoryIndex === idx}
            onClick={() => navigateToCategory(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToCategory(idx);
              }
            }}
            aria-label={`Jump to category ${idx + 1}: ${cat.title}`}
          >
            <span>{idx + 1}.</span>
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* ==================== FLOATING FIXED COSMIC TOOLTIP ==================== */}
      {activeTooltip && (
        <div
          className={`tech-tooltip-portal ${activeTooltip.showBelow ? 'tooltip-below' : ''}`}
          style={{
            left: `${activeTooltip.x}px`,
            top: `${activeTooltip.y}px`
          }}
          role="tooltip"
        >
          <div className="tooltip-header">
            <div className="tooltip-icon-wrap">
              {activeTooltip.isDevicon ? (
                <img
                  src={activeTooltip.icon}
                  alt={activeTooltip.name}
                  className="tooltip-icon-img"
                  width={24}
                  height={24}
                  style={{
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    minHeight: '24px',
                    maxWidth: '24px',
                    maxHeight: '24px',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <i
                  className={`uil ${activeTooltip.icon}`}
                  style={{ fontSize: '1.25rem', color: '#c084fc' }}
                  aria-hidden="true"
                ></i>
              )}
            </div>

            <div className="tooltip-meta">
              <h4 className="tooltip-title">{activeTooltip.name}</h4>
              <span className="tooltip-category">{activeTooltip.category}</span>
            </div>

            <div className="tooltip-badge-pill">
              <i className="uil uil-check-circle" aria-hidden="true"></i>
              <span>{activeTooltip.level}</span>
            </div>
          </div>

          <div className="tooltip-proficiency-row">
            <span style={{ color: '#94a3b8' }}>Proficiency Level</span>
            <span style={{ color: '#c084fc', fontWeight: 700 }}>
              {activeTooltip.percent}%
            </span>
          </div>

          <div className="tooltip-meter-track">
            <div
              className="tooltip-meter-fill"
              style={{ width: `${activeTooltip.percent}%` }}
            ></div>
          </div>

          <p className="tooltip-description">{activeTooltip.description}</p>

          {activeTooltip.experience && (
            <div className="tooltip-experience-tag">
              <i className="uil uil-award" aria-hidden="true"></i>
              <span>{activeTooltip.experience}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
