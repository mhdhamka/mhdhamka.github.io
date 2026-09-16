import React, { useState, useEffect } from 'react';
import '../../assets/css/github.css';

interface GitHubProfileData {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  bio: string | null;
}

interface GitHubRepoItem {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const FALLBACK_REPOS: GitHubRepoItem[] = [
  {
    id: 101,
    name: 'job-market',
    description: 'Automated data pipeline and analysis tool for extracting job market trends and skill requirements.',
    html_url: 'https://github.com/mhdhamka/job-market',
    language: 'Python',
    stargazers_count: 3,
    forks_count: 1,
    updated_at: '2025-02-14T00:00:00Z',
  },
  {
    id: 102,
    name: 'sine-mok-makan-oi',
    description: 'Sarawakian food finder and culinary recommendation web app tailored for local cuisine exploration.',
    html_url: 'https://github.com/mhdhamka/sine-mok-makan-oi',
    language: 'TypeScript',
    stargazers_count: 4,
    forks_count: 0,
    updated_at: '2025-01-20T00:00:00Z',
  },
  {
    id: 103,
    name: 'CubeAI',
    description: 'Intelligent computer vision and machine learning algorithm to detect and solve Rubik’s cube configurations.',
    html_url: 'https://github.com/mhdhamka/CubeAI',
    language: 'Python',
    stargazers_count: 5,
    forks_count: 2,
    updated_at: '2024-11-18T00:00:00Z',
  },
  {
    id: 104,
    name: 'webslinger',
    description: 'Fast, modular web scraping and reactive scraping toolkit built with modern TypeScript workflows.',
    html_url: 'https://github.com/mhdhamka/webslinger',
    language: 'TypeScript',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: '2024-09-10T00:00:00Z',
  },
  {
    id: 105,
    name: 'jerebu',
    description: 'Real-time Air Pollutant Index (API/AQI) tracker and environmental monitoring dashboard.',
    html_url: 'https://github.com/mhdhamka/jerebu',
    language: 'Vue',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: '2024-08-05T00:00:00Z',
  },
  {
    id: 106,
    name: 'grandline',
    description: 'Dynamic media tracking application with modern UI components and state persistence.',
    html_url: 'https://github.com/mhdhamka/grandline',
    language: 'TypeScript',
    stargazers_count: 3,
    forks_count: 1,
    updated_at: '2024-06-25T00:00:00Z',
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Shell: '#89e051',
};

export const GitHub: React.FC = () => {
  const [profile, setProfile] = useState<GitHubProfileData>({
    login: 'mhdhamka',
    name: 'Mohd Hamka',
    avatar_url: 'https://github.com/mhdhamka.png',
    public_repos: 29,
    followers: 1,
    following: 3,
    html_url: 'https://github.com/mhdhamka',
    bio: 'Software Engineer • Open-Source Developer',
  });
  const [repos, setRepos] = useState<GitHubRepoItem[]>(FALLBACK_REPOS);
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'repos' | 'timeline'>('stats');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch user profile stats
    fetch('https://api.github.com/users/mhdhamka')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then((data) => {
        if (data && data.login) {
          setProfile((prev) => ({
            ...prev,
            login: data.login,
            name: data.name || 'Mohd Hamka',
            avatar_url: data.avatar_url || prev.avatar_url,
            public_repos: data.public_repos ?? prev.public_repos,
            followers: data.followers ?? prev.followers,
            following: data.following ?? prev.following,
            bio: data.bio || prev.bio,
          }));
        }
      })
      .catch(() => {
        // Silently use defaults
      });

    // Fetch active repositories
    fetch('https://api.github.com/users/mhdhamka/repos?sort=updated&per_page=6')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted: GitHubRepoItem[] = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description || 'Open-source software project by mhdhamka.',
            html_url: r.html_url,
            language: r.language || 'Code',
            stargazers_count: r.stargazers_count || 0,
            forks_count: r.forks_count || 0,
            updated_at: r.updated_at || new Date().toISOString(),
          }));
          setRepos(formatted);
        }
      })
      .catch(() => {
        // Fallback to FALLBACK_REPOS
      });
  }, []);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText('mhdhamka');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="github section" id="github">
      <div className="section__header">
        <span className="section__badge">
          <i className="uil uil-github-alt" aria-hidden="true"></i> Open Source Hub
        </span>
        <h2 className="section__title">GitHub Activity</h2>
        <p className="section__subtitle">
          Explore open-source repositories, developer metrics, and code contribution timeline
        </p>
      </div>

      <div className="github-section-wrapper">
        {/* Elevated Profile Header Card */}
        <div className="gh-profile-card">
          <div className="gh-profile-left">
            <div className="gh-avatar-container">
              <img
                src={profile.avatar_url}
                alt="mhdhamka GitHub avatar"
                className="gh-avatar-img"
              />
              <span className="gh-live-dot" title="Active Developer" aria-label="Active Developer"></span>
            </div>

            <div className="gh-profile-meta">
              <div className="gh-profile-title-bar">
                <h3 className="gh-profile-username">@{profile.login}</h3>
                <span className="gh-pill-badge">
                  <i className="uil uil-check-circle" aria-hidden="true"></i> Verified
                </span>
                <span className="gh-pill-badge gh-pill-badge--active">
                  <i className="uil uil-circle" aria-hidden="true"></i> Active
                </span>
              </div>
              <p className="gh-profile-bio-text">
                Building scalable full-stack applications, automated pipelines, and intelligent tools.
              </p>
            </div>
          </div>

          <div className="gh-profile-actions">
            <button
              type="button"
              className="gh-btn-copy"
              onClick={handleCopyUsername}
              title="Copy GitHub Username"
            >
              <i className={`uil ${copied ? 'uil-check' : 'uil-copy'}`} aria-hidden="true"></i>
              <span>{copied ? 'Copied @mhdhamka' : 'Copy Username'}</span>
            </button>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-btn-follow"
            >
              <span>Follow on GitHub</span>
              <i className="uil uil-external-link-alt" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {/* Live GitHub Metrics 4-Card Grid */}
        <div className="gh-metrics-grid">
          <div className="gh-metric-card">
            <div className="gh-metric-icon-box">
              <i className="uil uil-folder-open" aria-hidden="true"></i>
            </div>
            <div className="gh-metric-text-group">
              <span className="gh-metric-number">{profile.public_repos}</span>
              <span className="gh-metric-desc">Public Repos</span>
            </div>
          </div>

          <div className="gh-metric-card">
            <div className="gh-metric-icon-box">
              <i className="uil uil-brackets-curly" aria-hidden="true"></i>
            </div>
            <div className="gh-metric-text-group">
              <span className="gh-metric-number">Python / TS</span>
              <span className="gh-metric-desc">Primary Stacks</span>
            </div>
          </div>

          <div className="gh-metric-card">
            <div className="gh-metric-icon-box">
              <i className="uil uil-users-alt" aria-hidden="true"></i>
            </div>
            <div className="gh-metric-text-group">
              <span className="gh-metric-number">{profile.followers}</span>
              <span className="gh-metric-desc">Followers</span>
            </div>
          </div>

          <div className="gh-metric-card">
            <div className="gh-metric-icon-box">
              <i className="uil uil-fire" aria-hidden="true"></i>
            </div>
            <div className="gh-metric-text-group">
              <span className="gh-metric-number">Continuous</span>
              <span className="gh-metric-desc">Commit Cadence</span>
            </div>
          </div>
        </div>

        {/* Interactive Sub-navigation Tabs */}
        <div className="gh-subnav-tabs" role="tablist">
          <button
            type="button"
            className={`gh-tab-pill ${activeSubTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('stats')}
            role="tab"
            aria-selected={activeSubTab === 'stats'}
          >
            <i className="uil uil-chart-pie" aria-hidden="true"></i>
            <span>Overview &amp; Metrics</span>
          </button>

          <button
            type="button"
            className={`gh-tab-pill ${activeSubTab === 'repos' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('repos')}
            role="tab"
            aria-selected={activeSubTab === 'repos'}
          >
            <i className="uil uil-code-branch" aria-hidden="true"></i>
            <span>Featured Repositories ({repos.length})</span>
          </button>

          <button
            type="button"
            className={`gh-tab-pill ${activeSubTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('timeline')}
            role="tab"
            aria-selected={activeSubTab === 'timeline'}
          >
            <i className="uil uil-calendar-alt" aria-hidden="true"></i>
            <span>Contribution Matrix</span>
          </button>
        </div>

        {/* SUBTAB 1: STATS & INSIGHTS */}
        {activeSubTab === 'stats' && (
          <div className="gh-tab-panel">
            <div className="gh-stats-row">
              <div className="gh-stats-card-frame">
                <img
                  src="https://github-readme-stats-eight-theta.vercel.app/api?username=mhdhamka&show_icons=true&theme=tokyonight&hide_border=true&count_private=true"
                  alt="GitHub Stats"
                  className="gh-stats-img"
                  loading="lazy"
                />
              </div>

              <div className="gh-stats-card-frame">
                <img
                  src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=mhdhamka&layout=compact&theme=tokyonight&hide_border=true"
                  alt="Top Languages"
                  className="gh-stats-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Streak Card */}
            <div className="gh-streak-frame">
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=mhdhamka&theme=tokyonight&hide_border=true&background=0D1117"
                alt="GitHub Streak"
                className="gh-stats-img"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* SUBTAB 2: FEATURED REPOSITORIES GRID */}
        {activeSubTab === 'repos' && (
          <div className="gh-tab-panel">
            <div className="gh-repos-grid">
              {repos.map((repo) => {
                const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#a855f7' : '#a855f7';
                return (
                  <div key={repo.id} className="gh-repo-item-card">
                    <div>
                      <div className="gh-repo-top">
                        <div className="gh-repo-title-wrapper">
                          <i className="uil uil-book-alt gh-repo-title-icon" aria-hidden="true"></i>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gh-repo-name-link"
                          >
                            {repo.name}
                          </a>
                        </div>
                        <span className="gh-repo-public-tag">Public</span>
                      </div>

                      <p className="gh-repo-desc-text">
                        {repo.description || 'Open-source repository hosted on GitHub.'}
                      </p>
                    </div>

                    <div className="gh-repo-bottom-bar">
                      <div className="gh-repo-tags-left">
                        {repo.language && (
                          <span className="gh-repo-lang-chip">
                            <span
                              className="gh-repo-lang-circle"
                              style={{ backgroundColor: langColor }}
                            />
                            {repo.language}
                          </span>
                        )}

                        {repo.stargazers_count > 0 && (
                          <span className="gh-repo-star-stat">
                            <i className="uil uil-star" aria-hidden="true"></i>
                            {repo.stargazers_count}
                          </span>
                        )}

                        {repo.forks_count > 0 && (
                          <span className="gh-repo-star-stat">
                            <i className="uil uil-code-branch" aria-hidden="true"></i>
                            {repo.forks_count}
                          </span>
                        )}
                      </div>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gh-repo-link-btn"
                      >
                        <span>Code</span>
                        <i className="uil uil-arrow-up-right" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBTAB 3: CONTRIBUTION MATRIX / SNAKE */}
        {activeSubTab === 'timeline' && (
          <div className="gh-tab-panel">
            <div className="gh-matrix-container">
              <div className="gh-matrix-header">
                <span>GitHub Contribution Snake Activity</span>
              </div>
              <img
                src="https://raw.githubusercontent.com/mhdhamka/mhdhamka/output/github-contribution-grid-snake-dark.svg"
                alt="GitHub Contribution Snake"
                className="gh-snake-image"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="gh-cta-container">
          <a
            href="https://github.com/mhdhamka"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-cta-button"
          >
            <span>Explore All 29 Repositories on GitHub</span>
            <i className="uil uil-github" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
};
