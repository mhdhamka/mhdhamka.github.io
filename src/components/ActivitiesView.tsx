import React, { useState, useMemo, useEffect } from 'react';
import { activities } from '../data/activities';
import { ActivityImageWithSkeleton, ActivityCardSkeleton } from './common/SkeletonLoader';

interface ActivitiesViewProps {
  onBackToHome?: () => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ onBackToHome }) => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const types = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((a) => {
      set.add(a.type.toUpperCase());
    });
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredActivities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const currentType = selectedType.toUpperCase();

    return activities.filter((act) => {
      const matchesType =
        currentType === 'ALL' || act.type.toUpperCase() === currentType;
      const matchesSearch =
        !query ||
        act.title.toLowerCase().includes(query) ||
        act.description.toLowerCase().includes(query) ||
        act.tags.some((t) => t.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  return (
    <section className="activity section" id="activity" style={{ paddingTop: '5.5rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {onBackToHome && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <button
              type="button"
              onClick={onBackToHome}
              className="button button--small"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onBackToHome();
                }
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
            >
              <i className="uil uil-arrow-left"></i> Home
            </button>
          </div>
        )}
        <h2 className="section__title" style={{ margin: '0 0 0.5rem 0' }}>Leadership &amp; Activities</h2>
        <span className="section__subtitle" style={{ display: 'block' }}>
          Leadership roles, volunteering experiences, and industry exposure
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="container" style={{ marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Type Filter Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {types.map((t) => {
              const isActive = selectedType.toUpperCase() === t.toUpperCase();
              return (
                <button
                  key={t}
                  type="button"
                  tabIndex={0}
                  className="activity-filter-btn"
                  style={{
                    borderRadius: '2rem',
                    padding: '0.45rem 1.15rem',
                    cursor: 'pointer',
                    border: isActive ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.12)',
                    background: isActive ? 'linear-gradient(135deg, #9333ea, #7c3aed)' : 'rgba(30, 27, 75, 0.45)',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.82rem',
                    letterSpacing: '0.3px',
                    boxShadow: isActive ? '0 4px 14px rgba(168, 85, 247, 0.4)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => setSelectedType(t)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedType(t);
                    }
                  }}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${t}`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div
            style={{
              position: 'relative',
              minWidth: '240px',
            }}
          >
            <i
              className="uil uil-search"
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.6,
              }}
            ></i>
            <input
              type="text"
              placeholder="Search activities or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              tabIndex={0}
              aria-label="Search activities by title, description or tag"
              style={{
                width: '100%',
                padding: '0.55rem 1rem 0.55rem 2.2rem',
                borderRadius: '0.5rem',
                background: 'rgba(30, 27, 75, 0.4)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#f8fafc',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      <div className="activity__container container">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <ActivityCardSkeleton key={idx} />
          ))
        ) : filteredActivities.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3.5rem 1.5rem',
              width: '100%',
              background: 'rgba(30, 27, 75, 0.3)',
              borderRadius: '1rem',
              border: '1px solid rgba(168, 85, 247, 0.2)',
            }}
          >
            <i
              className="uil uil-search-alt"
              style={{ fontSize: '2.5rem', color: '#c084fc', display: 'block', marginBottom: '0.75rem' }}
              aria-hidden="true"
            />
            <p style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 500, margin: '0 0 0.5rem' }}>
              No activities match your current filters.
            </p>
            {searchQuery && (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>
                No results found for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
            <button
              type="button"
              className="button button--small"
              tabIndex={0}
              style={{ marginTop: '0.5rem', borderRadius: '2rem' }}
              onClick={() => {
                setSelectedType('ALL');
                setSearchQuery('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedType('ALL');
                  setSearchQuery('');
                }
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div className="activity__card" key={act.id}>
              <ActivityImageWithSkeleton
                src={act.img}
                alt={act.title}
                type={act.type}
              />

              <div className="activity__info">
                <span className="activity__date">
                  <i className="uil uil-calendar-alt" aria-hidden="true"></i> {act.date}
                </span>

                <h3>{act.title}</h3>

                <p>{act.description}</p>

                <div className="activity__tags">
                  {act.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>

                {act.linkUrl && (
                  <a
                    href={act.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button--flex activity__button"
                  >
                    {act.linkText || 'Read More'}
                    <i className="uil uil-arrow-right button__icon" aria-hidden="true"></i>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};