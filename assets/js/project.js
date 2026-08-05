document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search');
    const sortSelect = document.getElementById('project-sort');
    const grid = document.getElementById('project-grid');
    const pageNumbersContainer = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    // Modal Elements
    const modalViews = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    let currentFilter = 'all';
    let searchQuery = '';
    let currentPage = 1;
    const itemsPerPage = 6;

    // ==================== EMBEDDED PROJECT INSIGHTS DATA ====================
    const projectsData = [
        {
            "repo": "mhdhamka/DevSandBox",
            "title": "DevSandBox Engine",
            "category": "INTERACTIVE PORTFOLIO PLATFORM",
            "highlights": [
                "Interactive, terminal-inspired workspace showcasing live spec telemetry and custom dynamic UI themes.",
                "Embedded AI Copilot smart filter allowing natural language project discovery and quick preset queries.",
                "Built-in Project Modal Inspector featuring live code snippets, automated logic breakdowns, and architecture visual maps."
            ],
            "architecture": "React 18, JavaScript, Tailwind CSS, Bootstrap 5, Framer Motion, Context API"
        },
        {
            "repo": "mhdhamka/Price-Checker-System",
            "title": "Price Checker System",
            "category": "FULL-STACK WEB APP",
            "highlights": [
                "Grocery price comparison platform designed for student budgeting.",
                "Interactive data visualization built with Chart.js.",
                "Automated PDF/Excel report export engine and audit logging."
            ],
            "architecture": "PHP, MySQL, JavaScript / AJAX, Bootstrap 5, Chart.js"
        },
        {
            "repo": "mhdhamka/Ultimate-Athletic-Gym-Management-System",
            "title": "Ultimate Athletic Gym Management System",
            "category": "WEB APPLICATION",
            "highlights": [
                "End-to-end management for gym members, trainers, and staff.",
                "Automated member attendance tracking and payment processing.",
                "Robust relational database schema for membership cycles."
            ],
            "architecture": "PHP, MySQL, JavaScript, Bootstrap"
        },
        {
            "repo": "mhdhamka/Tree-Pacific-Database-System",
            "title": "PacificTree: Enterprise GIS & Forestry Platform",
            "category": "FULL-STACK WEB & GIS",
            "highlights": [
                "Real-time spatial mapping with Leaflet.js for commercial forestry.",
                "Role-Based Access Control (RBAC) client portal.",
                "Automated document generation and tree inventory tracking."
            ],
            "architecture": "PHP (OOP), Leaflet.js, MySQL, Chart.js, Vanilla JS"
        },
        {
            "repo": "mhdhamka/Arngren-e-Commerce-System",
            "title": "Arngren e-Commerce System",
            "category": "WEB APPLICATION",
            "highlights": [
                "Full e-commerce shopping cart workflow and user authentication.",
                "Real-time product inventory sync and order processing.",
                "Admin analytics dashboard for store inventory controls."
            ],
            "architecture": "PHP, MySQL, Vanilla JavaScript, CSS3"
        },
        {
            "repo": "mhdhamka/Smart-Health-Consulting-System",
            "title": "SmartHealth System",
            "category": "C++ OOP CONSOLE APP",
            "highlights": [
                "Modular C++ OOP architecture with clear header separation.",
                "Multi-role access for Patients, Doctors, and Admins.",
                "File-based data persistence with custom File I/O algorithms."
            ],
            "architecture": "C++, Object-Oriented Architecture, Header Separation, File I/O"
        },
        {
            "repo": "mhdhamka/Rakyat-Electronic-System",
            "title": "Rakyat Electronic Sales Tracker",
            "category": "CONSOLE APPLICATION",
            "highlights": [
                "Demonstrates core Data Structures & Algorithms in pure C++.",
                "Custom Linked List implementations for inventory order handling.",
                "Efficient sorting and searching algorithms for transaction records."
            ],
            "architecture": "C++, Custom Linked Lists, Sorting/Searching Algorithms"
        },
        {
            "repo": "mhdhamka/TKF-Restaurant-Payment-System",
            "title": "TKF Restaurant Payment System",
            "category": "CONSOLE POS APPLICATION",
            "highlights": [
                "Low-level C console POS terminal simulating live food ordering.",
                "Cart management, discount calculations, and member tier checks.",
                "Persistent transaction logging using custom memory structures."
            ],
            "architecture": "C (GCC / MSYS2), Custom Structs, Modular C, File Handling"
        }
    ];

    // ==================== FILTER, SEARCH & SORT LOGIC ====================
    function updateProjects() {
        let filtered = cards.filter(card => {
            const matchesFilter = currentFilter === 'all' || card.dataset.category?.includes(currentFilter);
            const matchesSearch = card.innerText.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        const sortVal = sortSelect ? sortSelect.value : 'az';
        if (sortVal === 'az') {
            filtered.sort((a, b) => (a.dataset.title || '').localeCompare(b.dataset.title || ''));
        } else if (sortVal === 'za') {
            filtered.sort((a, b) => (b.dataset.title || '').localeCompare(a.dataset.title || ''));
        }

        cards.forEach(card => card.style.display = 'none');

        const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedCards = filtered.slice(start, end);

        paginatedCards.forEach(card => {
            grid.appendChild(card);
            card.style.display = 'block';
        });

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        if (!pageNumbersContainer) return;
        
        pageNumbersContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-num ${i === currentPage ? 'active' : ''}`;
            pageBtn.innerText = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                updateProjects();
            });
            pageNumbersContainer.appendChild(pageBtn);
        }

        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    // Event Listeners for Filters & Controls
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            currentPage = 1;
            updateProjects();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            currentPage = 1;
            updateProjects();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', updateProjects);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateProjects();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPage++;
            updateProjects();
        });
    }

    // ==================== GITHUB API & MODAL LOGIC ====================
    if (grid) {
        grid.addEventListener('click', async (e) => {
            const openBtn = e.target.closest('.open-modal-btn');
            if (!openBtn) return;

            const card = openBtn.closest('.project-card');
            if (!card) return;

            // Modal Target UI Elements
            const modalTitleEl = document.getElementById('modal-title');
            const modalCategoryEl = document.getElementById('modal-category') || document.getElementById('modal-type');
            const modalRepoLink = document.getElementById('modal-repo-link');
            const modalHighlightsEl = document.getElementById('modal-highlights');
            const modalArchitectureEl = document.getElementById('modal-architecture');
            const modalDescEl = document.getElementById('modal-description');
            const modalTagsEl = document.getElementById('modal-tags');

            // Metric UI Elements
            const statStars = document.getElementById('stat-stars');
            const statForks = document.getElementById('stat-forks');
            const statLang = document.getElementById('stat-lang');
            const statUpdated = document.getElementById('stat-updated');
            const modalStatsEl = document.getElementById('modal-github-stats');

            // Card DOM Fallbacks
            const title = card.querySelector('.project-title')?.textContent || card.dataset.title || 'Project Details';
            const type = card.querySelector('.project-type')?.textContent || card.dataset.category || 'Repository';
            const tags = card.querySelector('.project-tags')?.innerHTML || '';
            const repoPath = card.dataset.repo; // e.g. "mhdhamka/DevSandBox"

            // Set static fallback text on UI
            if (modalTitleEl) modalTitleEl.textContent = title;
            if (modalCategoryEl) modalCategoryEl.textContent = type;
            if (modalTagsEl) modalTagsEl.innerHTML = tags;
            if (modalRepoLink) modalRepoLink.href = repoPath ? `https://github.com/${repoPath}` : '#';

            // Find matching static insights from projectsData array
            const localInsight = projectsData.find((p) => p.repo === repoPath);

            if (localInsight) {
                if (modalCategoryEl) modalCategoryEl.textContent = localInsight.category;
                if (modalArchitectureEl) modalArchitectureEl.textContent = localInsight.architecture;
                if (modalHighlightsEl) {
                    modalHighlightsEl.innerHTML = localInsight.highlights
                        .map((item) => `<li>${item}</li>`)
                        .join('');
                }
            } else {
                // General fallback if repo isn't present in projectsData
                const fallbackText = card.querySelector('.project-description')?.textContent || 'No additional details available.';
                if (modalDescEl) modalDescEl.textContent = fallbackText;
            }

            // Set Loading States for Live GitHub Metrics
            if (statStars) statStars.textContent = 'Loading...';
            if (statForks) statForks.textContent = 'Loading...';
            if (statLang) statLang.textContent = 'Loading...';
            if (statUpdated) statUpdated.textContent = 'Loading...';
            if (modalStatsEl) modalStatsEl.innerHTML = `<span>Loading live GitHub stats...</span>`;

            // Open Modal
            if (modalViews) {
                modalViews.classList.add('active', 'active-modal');
                modalViews.setAttribute('aria-hidden', 'false');
            }

            // Fetch live metrics from GitHub API
            if (repoPath) {
                try {
                    const repoRes = await fetch(`https://api.github.com/repos/${repoPath}`);
                    if (!repoRes.ok) throw new Error('Repository not found or rate limit hit');
                    const githubData = await repoRes.json();

                    const pushDate = new Date(githubData.pushed_at).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                    });

                    // Update metrics if individual metric elements exist
                    if (statStars) statStars.textContent = githubData.stargazers_count;
                    if (statForks) statForks.textContent = githubData.forks_count;
                    if (statLang) statLang.textContent = githubData.language || 'N/A';
                    if (statUpdated) statUpdated.textContent = pushDate;

                    // Combined fallback container if using single stat element
                    if (modalStatsEl) {
                        modalStatsEl.innerHTML = `
                            <span style="margin-right: 1rem;">⭐ ${githubData.stargazers_count} Stars</span>
                            <span style="margin-right: 1rem;">🍴 ${githubData.forks_count} Forks</span>
                            <span style="margin-right: 1rem;">💻 ${githubData.language || 'Code'}</span>
                            <span>📅 Updated: ${pushDate}</span>
                        `;
                    }
                } catch (err) {
                    console.warn('GitHub API fetch failed or offline:', err);
                    if (statStars) statStars.textContent = '-';
                    if (statForks) statForks.textContent = '-';
                    if (statLang) statLang.textContent = 'N/A';
                    if (statUpdated) statUpdated.textContent = 'Offline';
                    if (modalStatsEl) modalStatsEl.innerHTML = `<span>GitHub Stats Unavailable</span>`;
                }
            }
        });
    }

    // ==================== MODAL CLOSE HANDLERS ====================
    const closeModal = () => {
        if (modalViews) {
            modalViews.classList.remove('active', 'active-modal');
            modalViews.setAttribute('aria-hidden', 'true');
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (modalViews && e.target === modalViews) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalViews && (modalViews.classList.contains('active') || modalViews.classList.contains('active-modal'))) {
            closeModal();
        }
    });

    // Initial render call
    updateProjects();
});