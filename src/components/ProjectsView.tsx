import React, { useState, useEffect, useMemo, useRef } from 'react';
import { initialProjects } from '../data/projects';
import { Project } from '../types';
import { ProjectImageWithSkeleton, ProjectCardSkeleton } from './SkeletonLoader';

interface ProjectsViewProps {
  onBackToHome?: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onBackToHome }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'web' | 'fullstack' | 'console'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'az' | 'za'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected project for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTelemetry, setModalTelemetry] = useState<{
    stars: number;
    forks: number;
    language: string;
    updatedAt: string;
    loading: boolean;
  }>({
    stars: 0,
    forks: 0,
    language: 'Code',
    updatedAt: '',
    loading: false,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search, and 'Escape' to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch live GitHub repos to enrich projects
  useEffect(() => {
    fetch('https://api.github.com/users/mhdhamka/repos?per_page=100&sort=updated')
      .then((res) => res.json())
      .then((repos: any[]) => {
        if (!Array.isArray(repos)) return;
        setProjects((prev) => {
          const updated = [...prev];
          repos.forEach((repo) => {
            if (repo.fork) return;
            const existing = updated.find((p) => p.repo.toLowerCase() === repo.full_name.toLowerCase());
            if (existing) {
              existing.stars = repo.stargazers_count;
              existing.updatedAt = repo.updated_at;
              if (repo.homepage) existing.demoUrl = repo.homepage;
            } else {
              let cat: Project['category'] = 'web';
              if (repo.language === 'C++' || repo.language === 'C') cat = 'console';
              else if (repo.language === 'PHP' || repo.language === 'Python') cat = 'fullstack';

              updated.push({
                repo: repo.full_name,
                title: repo.name.replace(/-/g, ' '),
                category: cat,
                categoryLabel: `${(repo.language || 'PROJECT').toUpperCase()}`,
                description: repo.description || 'GitHub open source repository with source files and automated workflows.',
                highlights: [
                  'Live repository synced via GitHub API.',
                  `Primary language: ${repo.language || 'Software'}`,
                  'Inspect commits and branch activity on GitHub.'
                ],
                architecture: `${repo.language || 'Full-Stack'}, Git, GitHub Workflows`,
                tags: [repo.language || 'Code', 'Open Source', 'GitHub API'],
                img: '',
                githubUrl: repo.html_url,
                demoUrl: repo.homepage || undefined,
                updatedAt: repo.updated_at,
                stars: repo.stargazers_count,
              });
            }
          });
          return updated;
        });
      })
      .catch((err) => console.log('GitHub API sync notice:', err))
      .finally(() => {
        setIsLoading(false);
      });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard accessibility: Escape key to close modal
  useEffect(() => {
    if (!selectedProject) return;

    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleModalKeyDown);
    return () => window.removeEventListener('keydown', handleModalKeyDown);
  }, [selectedProject]);

  // Open modal handler with telemetry fetch
  const handleOpenModal = async (project: Project) => {
    setSelectedProject(project);
    setModalTelemetry({
      stars: project.stars || 0,
      forks: 0,
      language: project.tags[0] || 'Code',
      updatedAt: project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : 'Recent',
      loading: true,
    });

    try {
      const res = await fetch(`https://api.github.com/repos/${project.repo}`);
      if (res.ok) {
        const data = await res.json();
        setModalTelemetry({
          stars: data.stargazers_count,
          forks: data.forks_count,
          language: data.language || 'Various',
          updatedAt: new Date(data.pushed_at).toLocaleDateString(),
          loading: false,
        });
      } else {
        setModalTelemetry((prev) => ({ ...prev, loading: false }));
      }
    } catch {
      setModalTelemetry((prev) => ({ ...prev, loading: false }));
    }
  };

  // Filter & Search & Sort logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter =
        filter === 'all' ||
        p.category.toLowerCase().includes(filter) ||
        p.categoryLabel.toLowerCase().includes(filter);

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.architecture.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, searchQuery]);

  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    if (sortBy === 'latest') {
      list.sort((a, b) => {
        const dateA = new Date(a.updatedAt || 0).getTime();
        const dateB = new Date(b.updatedAt || 0).getTime();
        return dateB - dateA;
      });
    } else if (sortBy === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'za') {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }
    return list;
  }, [filteredProjects, sortBy]);

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProjects.slice(start, start + itemsPerPage);
  }, [sortedProjects, currentPage, itemsPerPage]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: projects.length,
      web: projects.filter((p) => p.category.includes('web') || p.categoryLabel.toLowerCase().includes('web')).length,
      fullstack: projects.filter((p) => p.category.includes('fullstack') || p.categoryLabel.toLowerCase().includes('full-stack')).length,
      console: projects.filter((p) => p.category.includes('console') || p.categoryLabel.toLowerCase().includes('console')).length,
    };
  }, [projects]);

  return (
    <div className="projects-page-wrapper">
      <section className="project section" id="project" style={{ paddingTop: '5.5rem' }}>
        <div className="section__header-flex container">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {onBackToHome && (
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="button button--small"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                >
                  <i className="uil uil-arrow-left"></i> Home
                </button>
              )}
              <h2 className="section__title" style={{ margin: 0 }}>Featured Projects</h2>
            </div>
            <span className="section__subtitle">
              A high-performance collection of web apps, systems, and open-source code
            </span>
          </div>

          <div id="github-sync-status" className="sync-badge">
            <span className="sync-dot"></span> Live GitHub Sync
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="project__controls-bar container">
          {/* Search */}
          <div className="project__search">
            <i className="uil uil-search search-icon"></i>
            <input
              ref={searchInputRef}
              type="text"
              id="project-search"
              placeholder="Search repositories or tech stack... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: '0 0.5rem',
                }}
                title="Clear search"
              >
                <i className="uil uil-times"></i>
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="project__sort">
            <select
              id="project-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="latest">Sort: Latest / Recently Updated</option>
              <option value="az">Sort: Name (A-Z)</option>
              <option value="za">Sort: Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="project__filters container" role="region" aria-label="Project Category Filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            tabIndex={0}
            role="button"
            aria-pressed={filter === 'all'}
            onClick={() => {
              setFilter('all');
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFilter('all');
                setCurrentPage(1);
              }
            }}
          >
            All <span className="count-badge">{counts.all}</span>
          </button>
          <button
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            tabIndex={0}
            role="button"
            aria-pressed={filter === 'web'}
            onClick={() => {
              setFilter('web');
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFilter('web');
                setCurrentPage(1);
              }
            }}
          >
            Web <span className="count-badge">{counts.web}</span>
          </button>
          <button
            className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
            tabIndex={0}
            role="button"
            aria-pressed={filter === 'fullstack'}
            onClick={() => {
              setFilter('fullstack');
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFilter('fullstack');
                setCurrentPage(1);
              }
            }}
          >
            Full-Stack <span className="count-badge">{counts.fullstack}</span>
          </button>
          <button
            className={`filter-btn ${filter === 'console' ? 'active' : ''}`}
            tabIndex={0}
            role="button"
            aria-pressed={filter === 'console'}
            onClick={() => {
              setFilter('console');
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFilter('console');
                setCurrentPage(1);
              }
            }}
          >
            Console <span className="count-badge">{counts.console}</span>
          </button>
        </div>

        {/* View Options */}
        <div className="project__view-options container" role="region" aria-label="Layout View Options">
          <span className="view-label">Layout:</span>
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            tabIndex={0}
            role="button"
            aria-pressed={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setViewMode('grid');
              }
            }}
            title="Grid View"
            aria-label="Switch to Grid View"
          >
            <i className="uil uil-apps"></i> Grid Cards
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            tabIndex={0}
            role="button"
            aria-pressed={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setViewMode('list');
              }
            }}
            title="List View"
            aria-label="Switch to List View"
          >
            <i className="uil uil-list-ul"></i> Compact List
          </button>
        </div>

        {/* Projects Display */}
        <div className={`project-grid container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`} id="project-grid">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, idx) => (
              <ProjectCardSkeleton key={idx} />
            ))
          ) : paginatedProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', gridColumn: '1 / -1' }}>
              <i className="uil uil-search-alt" style={{ fontSize: '2.5rem', opacity: 0.5 }}></i>
              <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>No projects match your current filters.</p>
              <button
                type="button"
                className="button button--small"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            paginatedProjects.map((p) => (
              <article
                key={p.repo}
                className="project-card"
                data-category={p.category}
                data-title={p.title}
                data-repo={p.repo}
                tabIndex={0}
                role="article"
                aria-label={`Project: ${p.title}. Press Enter to view technical details.`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target === e.currentTarget) {
                    e.preventDefault();
                    handleOpenModal(p);
                  }
                }}
              >
                {viewMode === 'grid' ? (
                  <div className="card-view-content">
                    <ProjectImageWithSkeleton
                      src={p.img || ''}
                      alt={`${p.title} Preview`}
                      categoryLabel={p.categoryLabel}
                      title={p.title}
                      language={p.tags?.[0]}
                    />
                    <div className="project-content">
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-description">{p.description}</p>
                      <div className="project-tags">
                        {p.tags.map((tag, i) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                      <div className="project-buttons">
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button"
                          tabIndex={0}
                          aria-label={`View repository for ${p.title} on GitHub`}
                        >
                          <i className="uil uil-github" aria-hidden="true"></i> GitHub
                        </a>
                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button"
                            tabIndex={0}
                            aria-label={`View live demo for ${p.title}`}
                          >
                            <i className="uil uil-globe" aria-hidden="true"></i> Live Demo
                          </a>
                        )}
                        <button
                          type="button"
                          className="button open-modal-btn"
                          tabIndex={0}
                          aria-label={`View technical highlights and architecture for ${p.title}`}
                          onClick={() => handleOpenModal(p)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleOpenModal(p);
                            }
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="list-view-content">
                    <div className="list-row__main">
                      <div className="list-row__title-area">
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="list-repo-name"
                          tabIndex={0}
                        >
                          {p.repo}
                        </a>
                        <span className="repo-badge">Public</span>
                      </div>
                      <p className="list-repo-desc">{p.description}</p>
                      <div className="list-repo-meta">
                        <span className="lang-name">{p.tags[0] || 'Code'}</span>
                        {p.updatedAt && (
                          <span className="update-time">
                            Updated {new Date(p.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="list-row__actions">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-pill-btn"
                        tabIndex={0}
                        aria-label={`Star repository on GitHub: ${p.stars ?? 0} stars`}
                      >
                        <i className="uil uil-star"></i> {p.stars ?? 0} Stars
                      </a>
                      <button
                        type="button"
                        className="button open-modal-btn"
                        tabIndex={0}
                        aria-label={`View technical highlights and architecture for ${p.title}`}
                        onClick={() => handleOpenModal(p)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenModal(p);
                          }
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="project__pagination container" id="project-pagination">
            <button
              id="prev-page"
              className="pagination-btn"
              tabIndex={0}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }
              }}
              aria-label="Previous page"
            >
              Previous
            </button>
            <div id="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-num ${page === currentPage ? 'active' : ''}`}
                  tabIndex={0}
                  onClick={() => setCurrentPage(page)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setCurrentPage(page);
                    }
                  }}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              id="next-page"
              className="pagination-btn"
              tabIndex={0}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }
              }}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Interactive Modal Component */}
      {selectedProject && (
        <div
          id="project-modal"
          className="modal active active-modal"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-overlay"
            id="modal-overlay"
            onClick={() => setSelectedProject(null)}
          ></div>

          <div className="modal-container" role="document">
            <button
              className="modal-close"
              id="modal-close"
              aria-label="Close modal"
              tabIndex={0}
              onClick={() => setSelectedProject(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(null);
                }
              }}
            >
              &times;
            </button>

            <div className="modal-header">
              <span id="modal-category" className="project-type modal-category">
                {selectedProject.categoryLabel}
              </span>
              <h3 id="modal-title" className="modal-title">
                {selectedProject.title}
              </h3>

              <a
                id="modal-repo-link"
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-github-link"
              >
                <i className="uil uil-github" style={{ marginRight: '0.4rem' }}></i>
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Live GitHub Stats Banner */}
            <div className="modal-stats" id="modal-github-stats">
              {modalTelemetry.loading ? (
                <span>Loading live GitHub telemetry...</span>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="stat-pill">⭐ {modalTelemetry.stars} Stars</span>
                  <span className="stat-pill">🍴 {modalTelemetry.forks} Forks</span>
                  <span className="stat-pill">💻 {modalTelemetry.language}</span>
                  <span className="stat-pill">📅 Updated: {modalTelemetry.updatedAt}</span>
                </div>
              )}
            </div>

            <div className="modal-body">
              <h4>Key Highlights &amp; Insights</h4>
              <ul id="modal-highlights">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <h4>Tech Stack &amp; Architecture</h4>
              <p id="modal-architecture">{selectedProject.architecture}</p>

              {selectedProject.tags && (
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
