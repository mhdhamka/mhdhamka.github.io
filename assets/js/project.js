document.addEventListener('DOMContentLoaded', async () => {
    // ==================== CONFIG & STATE ====================
    const GITHUB_USERNAME = 'mhdhamka';
    const CACHE_KEY = `github_repos_${GITHUB_USERNAME}`;
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache expiry

    let currentFilter = 'all';
    let searchQuery = '';
    let currentPage = 1;
    const itemsPerPage = 6;

    // ==================== DOM ELEMENTS ====================
    const grid = document.getElementById('project-grid');
    const searchInput = document.getElementById('project-search');
    const searchBtn = document.getElementById('project-search-btn');
    const sortSelect = document.getElementById('project-sort');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const pageNumbersContainer = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    const modalViews = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const statusEl = document.getElementById('github-sync-status');

    if (grid) grid.classList.add('grid-view');

    // ==================== GITHUB API FETCH & CACHING ====================
    async function fetchGitHubProjects() {
        // Check local storage cache first to prevent rate-limiting
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(`${CACHE_KEY}_time`);
        
        if (cachedData && cachedTime && (Date.now() - cachedTime < CACHE_DURATION)) {
            try {
                const repos = JSON.parse(cachedData);
                updateSyncStatus(true, repos.length, 'Cached');
                return repos;
            } catch (e) {
                console.warn('Cache parse failed, fetching fresh data.');
            }
        }

        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const repos = await response.json();
            
            // Save to cache
            localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
            localStorage.setItem(`${CACHE_KEY}_time`, Date.now());

            updateSyncStatus(true, repos.length, 'Live');
            return repos;
        } catch (error) {
            console.warn('GitHub API fetch failed, using fallback or empty array:', error.message);
            updateSyncStatus(false, 0, 'Offline');
            
            // Return cached data as ultimate fallback if available, otherwise empty
            return cachedData ? JSON.parse(cachedData) : [];
        }
    }

    function updateSyncStatus(isLive, count, mode) {
        if (!statusEl) return;
        if (isLive) {
            statusEl.innerHTML = `<span class="sync-dot active"></span> Live GitHub Sync (${count} Repos - ${mode})`;
        } else {
            statusEl.innerHTML = `<span class="sync-dot offline"></span> Offline Mode (Static Fallback)`;
        }
    }

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

    // ==================== DYNAMIC RENDERING ====================
    async function loadDynamicProjects() {
        const repos = await fetchGitHubProjects();
        if (!grid || repos.length === 0) return;

        grid.innerHTML = '';
        let cardsHtmlArray = [];

        repos.forEach(repo => {
            if (repo.fork) return; // Skip forks

            let category = 'web';
            if (repo.language === 'C++' || repo.language === 'C') category = 'console';
            if (repo.language === 'PHP') category = 'fullstack web';

            const description = repo.description || 'No description provided for this repository.';
            const language = repo.language || 'Code';
            const updatedDate = new Date(repo.updated_at).toLocaleDateString();

            const cardHtml = `
                <article class="project-card card-hidden" data-category="${category}" data-title="${repo.name}" data-repo="${repo.full_name}" data-updated="${repo.updated_at}">
                    <div class="card-view-content">
                        <div class="project-content">
                            <span class="project-type">${repo.language ? repo.language.toUpperCase() + ' PROJECT' : 'PROJECT'}</span>
                            <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
                            <p class="project-description">${description}</p>
                            <div class="project-tags">
                                <span>${language}</span>
                                <span>GitHub API</span>
                            </div>
                            <div class="project-buttons">
                                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="button">GitHub</a>
                                <a href="${repo.homepage || repo.html_url}" target="_blank" rel="noopener noreferrer" class="button">Live Demo</a>
                                <button type="button" class="button open-modal-btn">Details</button>
                            </div>
                        </div>
                    </div>
                    <div class="list-view-content">
                        <div class="list-row__main">
                            <div class="list-row__title-area">
                                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="list-repo-name">${repo.full_name}</a>
                                <span class="repo-badge">${repo.private ? 'Private' : 'Public'}</span>
                            </div>
                            <p class="list-repo-desc">${description}</p>
                            <div class="list-repo-meta">
                                <span class="lang-name">${language}</span>
                                <span class="update-time">Updated ${updatedDate}</span>
                            </div>
                        </div>
                        <div class="list-row__actions">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-pill-btn">
                                <i class="uil uil-star"></i> ${repo.stargazers_count} Stars
                            </a>
                            <button type="button" class="button open-modal-btn">Details</button>
                        </div>
                    </div>
                </article>
            `;
            cardsHtmlArray.push(cardHtml);
        });

        grid.innerHTML = cardsHtmlArray.join('');
        
        // Re-initialize core listeners after cards are injected
        initializeProjectApp();
    }

    // ==================== CORE CONTROLS & LOGIC ====================
    function initializeProjectApp() {
        const cards = Array.from(document.querySelectorAll('.project-card'));

        function updateCounts() {
            const allCount = cards.length;
            const webCount = cards.filter(c => c.dataset.category?.includes('web')).length;
            const fullstackCount = cards.filter(c => c.dataset.category?.includes('fullstack')).length;
            const consoleCount = cards.filter(c => c.dataset.category?.includes('console')).length;

            setCountText('count-all', allCount);
            setCountText('count-web', webCount);
            setCountText('count-fullstack', fullstackCount);
            setCountText('count-console', consoleCount);
        }

        function setCountText(id, val) {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        }

        function updateProjects() {
            let filtered = cards.filter(card => {
                const matchesFilter = currentFilter === 'all' || card.dataset.category?.includes(currentFilter);
                const matchesSearch = card.innerText.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesFilter && matchesSearch;
            });

            const sortVal = sortSelect ? sortSelect.value : 'latest';
            filtered.sort((a, b) => {
                if (sortVal === 'latest') {
                    const dateA = new Date(a.dataset.updated || 0);
                    const dateB = new Date(b.dataset.updated || 0);
                    return dateB - dateA; // Newest first
                }
                const titleA = a.dataset.title || '';
                const titleB = b.dataset.title || '';
                return sortVal === 'az' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
            });

            // Hide all cards first using the forced CSS class
            cards.forEach(card => card.classList.add('card-hidden'));

            const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
            if (currentPage > totalPages) currentPage = totalPages;

            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedCards = filtered.slice(start, end);

            paginatedCards.forEach(card => {
                if (grid) grid.appendChild(card);
                card.classList.remove('card-hidden');
            });

            updateCounts();
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

        // Attach Event Listeners
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                currentFilter = e.currentTarget.dataset.filter;
                currentPage = 1;
                updateProjects();
            });
        });

        if (searchInput) {
            searchInput.removeEventListener('input', handleSearchInput);
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchQuery = searchInput.value;
                    currentPage = 1;
                    updateProjects();
                }
            });
        }

        if (searchBtn) {
            searchBtn.replaceWith(searchBtn.cloneNode(true)); // remove old listeners
            const freshSearchBtn = document.getElementById('project-search-btn');
            freshSearchBtn.addEventListener('click', () => {
                if (searchInput) searchQuery = searchInput.value;
                currentPage = 1;
                updateProjects();
            });
        }

        if (sortSelect) sortSelect.addEventListener('change', updateProjects);
        if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; updateProjects(); } });
        if (nextBtn) nextBtn.addEventListener('click', () => { currentPage++; updateProjects(); });

        updateProjects();
    }

    function handleSearchInput(e) {
        searchQuery = e.target.value;
        currentPage = 1;
    }

    // ==================== VIEW TOGGLE & SHORTCUTS ====================
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const viewType = btn.getAttribute('data-view');
            if (grid) {
                grid.classList.toggle('list-view', viewType === 'list');
                grid.classList.toggle('grid-view', viewType !== 'list');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput?.focus();
        }
        if (e.key === 'Escape') closeModal();
    });

    // ==================== MODAL & TELEMETRY LOGIC ====================
    if (grid) {
        grid.addEventListener('click', async (e) => {
            const openBtn = e.target.closest('.open-modal-btn');
            if (!openBtn) return;
            const card = openBtn.closest('.project-card');
            if (!card) return;

            const modalTitleEl = document.getElementById('modal-title');
            const modalCategoryEl = document.getElementById('modal-category') || document.getElementById('modal-type');
            const modalRepoLink = document.getElementById('modal-repo-link');
            const modalHighlightsEl = document.getElementById('modal-highlights');
            const modalArchitectureEl = document.getElementById('modal-architecture');
            const modalDescEl = document.getElementById('modal-description');
            const modalTagsEl = document.getElementById('modal-tags');
            const modalStatsEl = document.getElementById('modal-github-stats');

            const title = card.querySelector('.project-title')?.textContent || card.dataset.title;
            const type = card.querySelector('.project-type')?.textContent || card.dataset.category;
            const tags = card.querySelector('.project-tags')?.innerHTML || '';
            const repoPath = card.dataset.repo;

            if (modalTitleEl) modalTitleEl.textContent = title;
            if (modalCategoryEl) modalCategoryEl.textContent = type;
            if (modalTagsEl) modalTagsEl.innerHTML = tags;
            if (modalRepoLink) modalRepoLink.href = repoPath ? `https://github.com/${repoPath}` : '#';

            const localInsight = projectsData.find(p => p.repo === repoPath);
            if (localInsight) {
                if (modalCategoryEl) modalCategoryEl.textContent = localInsight.category;
                if (modalArchitectureEl) modalArchitectureEl.textContent = localInsight.architecture;
                if (modalHighlightsEl) {
                    modalHighlightsEl.innerHTML = localInsight.highlights.map(h => `<li>${h}</li>`).join('');
                }
            } else {
                if (modalHighlightsEl) modalHighlightsEl.innerHTML = `<li>Live repository synced via GitHub API. Check out source files and commits directly.</li>`;
                if (modalArchitectureEl) modalArchitectureEl.textContent = "Standard repository architecture with automated deployment configurations.";
                if (modalDescEl) modalDescEl.textContent = card.querySelector('.project-description')?.textContent || 'No description provided.';
            }

            if (modalStatsEl) modalStatsEl.innerHTML = `<span>Fetching telemetry...</span>`;
            if (modalViews) modalViews.classList.add('active', 'active-modal');

            if (repoPath) {
                try {
                    const res = await fetch(`https://api.github.com/repos/${repoPath}`);
                    if (!res.ok) throw new Error();
                    const data = await res.json();
                    modalStatsEl.innerHTML = `
                        <span class="stat-pill">⭐ ${data.stargazers_count} Stars</span>
                        <span class="stat-pill">🍴 ${data.forks_count} Forks</span>
                        <span class="stat-pill">💻 ${data.language || 'Various'}</span>
                        <span class="stat-pill">📅 Updated: ${new Date(data.pushed_at).toLocaleDateString()}</span>
                    `;
                } catch {
                    modalStatsEl.innerHTML = `<span>GitHub stats temporarily unavailable</span>`;
                }
            }
        });
    }

    const closeModal = () => {
        if (modalViews) modalViews.classList.remove('active', 'active-modal');
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal); // Fixed event listener arguments

    // Initial Execution
    await loadDynamicProjects();
});