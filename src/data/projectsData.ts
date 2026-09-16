import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    repo: "mhdhamka/DevSandBox",
    title: "DevSandBox Engine",
    category: "web",
    categoryLabel: "INTERACTIVE PORTFOLIO PLATFORM",
    description: "An interactive, terminal-inspired portfolio platform featuring a cyberpunk dark aesthetic, live spec telemetry, AI Copilot smart filters, source code snippet inspection, dynamic theme engines, and real-time architecture deep-dives.",
    highlights: [
      "Interactive, terminal-inspired workspace showcasing live spec telemetry and custom dynamic UI themes.",
      "Embedded AI Copilot smart filter allowing natural language project discovery and quick preset queries.",
      "Built-in Project Modal Inspector featuring live code snippets, automated logic breakdowns, and architecture visual maps."
    ],
    architecture: "React 18, JavaScript, Tailwind CSS, Bootstrap 5, Framer Motion, Context API",
    tags: ["React 18", "JavaScript", "Tailwind CSS", "Bootstrap 5", "Framer Motion", "Context API"],
    img: "/assets/img/sandbox.png",
    githubUrl: "https://github.com/mhdhamka/DevSandBox",
    updatedAt: "2025-02-15"
  },
  {
    repo: "mhdhamka/Price-Checker-System",
    title: "Price Checker System",
    category: "fullstack",
    categoryLabel: "FULL-STACK WEB APP",
    description: "A price comparison & analytics platform enabling students to compare grocery prices across stores with interactive dashboards and reporting.",
    highlights: [
      "Grocery price comparison platform designed for student budgeting.",
      "Interactive data visualization built with Chart.js.",
      "Automated PDF/Excel report export engine and audit logging."
    ],
    architecture: "PHP, MySQL, JavaScript / AJAX, Bootstrap 5, Chart.js",
    tags: ["PHP", "MySQL", "JavaScript / AJAX", "Bootstrap 5", "Chart.js"],
    img: "/assets/img/pcs.png",
    githubUrl: "https://github.com/mhdhamka/Price-Checker-System",
    updatedAt: "2024-11-20"
  },
  {
    repo: "mhdhamka/Tree-Pacific-Database-System",
    title: "PacificTree: Enterprise GIS & Forestry Platform",
    category: "fullstack",
    categoryLabel: "FULL-STACK WEB & GIS",
    description: "An enterprise forestry platform featuring real-time spatial mapping with Leaflet.js, tree inventory tracking, and role-based client portals.",
    highlights: [
      "Real-time spatial mapping with Leaflet.js for commercial forestry.",
      "Role-Based Access Control (RBAC) client portal.",
      "Automated document generation and tree inventory tracking."
    ],
    architecture: "PHP (OOP), Leaflet.js, MySQL, Chart.js, Vanilla JS",
    tags: ["PHP (OOP)", "MySQL", "JavaScript", "Leaflet.js", "Chart.js"],
    img: "/assets/img/tree.png",
    githubUrl: "https://github.com/mhdhamka/Tree-Pacific-Database-System",
    updatedAt: "2024-10-10"
  },
  {
    repo: "mhdhamka/Ultimate-Athletic-Gym-Management-System",
    title: "Ultimate Athletic Gym Management System",
    category: "web",
    categoryLabel: "WEB APPLICATION",
    description: "A comprehensive web-based gym management system developed using PHP and MySQL for members and trainers with automated attendance and payments.",
    highlights: [
      "End-to-end management for gym members, trainers, and staff.",
      "Automated member attendance tracking and payment processing.",
      "Robust relational database schema for membership cycles."
    ],
    architecture: "PHP, MySQL, JavaScript, Bootstrap",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    img: "/assets/img/uagms.png",
    githubUrl: "https://github.com/mhdhamka/Ultimate-Athletic-Gym-Management-System",
    updatedAt: "2024-08-14"
  },
  {
    repo: "mhdhamka/Arngren-e-Commerce-System",
    title: "Arngren e-Commerce System",
    category: "web",
    categoryLabel: "WEB APPLICATION",
    description: "Full e-commerce shopping cart workflow and user authentication with real-time inventory management.",
    highlights: [
      "Full e-commerce shopping cart workflow and user authentication.",
      "Real-time product inventory sync and order processing.",
      "Admin analytics dashboard for store inventory controls."
    ],
    architecture: "PHP, MySQL, Vanilla JavaScript, CSS3",
    tags: ["PHP", "MySQL", "JavaScript", "CSS3"],
    img: "/assets/img/arngren.png",
    githubUrl: "https://github.com/mhdhamka/Arngren-e-Commerce-System",
    updatedAt: "2024-06-25"
  },
  {
    repo: "mhdhamka/Smart-Health-Consulting-System",
    title: "SmartHealth Consulting System",
    category: "console",
    categoryLabel: "C++ OOP CONSOLE APP",
    description: "Modular C++ OOP medical consulting platform featuring multi-role access for Patients, Doctors, and Admins with custom file persistence.",
    highlights: [
      "Modular C++ OOP architecture with clear header separation.",
      "Multi-role access for Patients, Doctors, and Admins.",
      "File-based data persistence with custom File I/O algorithms."
    ],
    architecture: "C++, Object-Oriented Architecture, Header Separation, File I/O",
    tags: ["C++", "OOP", "File I/O", "Data Structures"],
    img: "/assets/img/smart.png",
    githubUrl: "https://github.com/mhdhamka/Smart-Health-Consulting-System",
    updatedAt: "2023-12-05"
  },
  {
    repo: "mhdhamka/Rakyat-Electronic-System",
    title: "Rakyat Electronic Sales Tracker",
    category: "console",
    categoryLabel: "CONSOLE APPLICATION",
    description: "Demonstrates core Data Structures & Algorithms in pure C++ with custom Linked List implementations for inventory order handling.",
    highlights: [
      "Demonstrates core Data Structures & Algorithms in pure C++.",
      "Custom Linked List implementations for inventory order handling.",
      "Efficient sorting and searching algorithms for transaction records."
    ],
    architecture: "C++, Custom Linked Lists, Sorting/Searching Algorithms",
    tags: ["C++", "Linked Lists", "Algorithms"],
    img: "/assets/img/rest.png",
    githubUrl: "https://github.com/mhdhamka/Rakyat-Electronic-System",
    updatedAt: "2023-09-18"
  },
  {
    repo: "mhdhamka/TKF-Restaurant-Payment-System",
    title: "TKF Restaurant Payment System",
    category: "console",
    categoryLabel: "CONSOLE POS APPLICATION",
    description: "Low-level C console POS terminal simulating live food ordering, discounts, member tiers, and persistent transaction logging.",
    highlights: [
      "Low-level C console POS terminal simulating live food ordering.",
      "Cart management, discount calculations, and member tier checks.",
      "Persistent transaction logging using custom memory structures."
    ],
    architecture: "C (GCC / MSYS2), Custom Structs, Modular C, File Handling",
    tags: ["C", "GCC", "Memory Structs", "File Handling"],
    img: "/assets/img/tkf.png",
    githubUrl: "https://github.com/mhdhamka/TKF-Restaurant-Payment-System",
    updatedAt: "2023-04-12"
  }
];
