import React from 'react';
import { initialProjects } from '../data/projects';
import { ProjectImageWithSkeleton } from './common/SkeletonLoader';

interface FeaturedProjectsProps {
  onViewAllProjects: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onViewAllProjects }) => {
  const featured = initialProjects.slice(0, 3);

  return (
    <section className="project section" id="project">
      <h2 className="section__title">Featured Projects</h2>
      <span className="section__subtitle">
        A selection of projects showcasing my web development, programming, and problem-solving skills.
      </span>

      <div className="project-grid container">
        {featured.map((p) => (
          <article
            key={p.repo}
            className="project-card"
            data-category={p.category}
            data-title={p.title}
            data-repo={p.repo}
            tabIndex={0}
            role="article"
            aria-label={`Project: ${p.title}. Press Enter to view full projects catalog.`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target === e.currentTarget) {
                e.preventDefault();
                onViewAllProjects();
              }
            }}
          >
            <ProjectImageWithSkeleton
              src={p.img}
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
                  className="button button--small"
                  tabIndex={0}
                  aria-label={`View repository for ${p.title} on GitHub`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.open(p.githubUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <i className="uil uil-github" aria-hidden="true"></i> GitHub
                </a>
                <button
                  type="button"
                  className="button button--small open-modal-btn"
                  tabIndex={0}
                  onClick={onViewAllProjects}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onViewAllProjects();
                    }
                  }}
                  aria-label={`Explore all details for ${p.title}`}
                >
                  Explore Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="project__more"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}
      >
        <button
          type="button"
          onClick={onViewAllProjects}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewAllProjects();
            }
          }}
          tabIndex={0}
          className="button button--flex"
          aria-label="View all portfolio projects"
        >
          View All Projects
          <i className="uil uil-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </section>
  );
};
