import React, { useState } from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Base generic Skeleton placeholder component with shimmer animation.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '0.5rem',
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
      aria-hidden="true"
    />
  );
};

export interface ProjectImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  categoryLabel?: string;
  height?: string | number;
  title?: string;
  language?: string;
}

/**
 * Image wrapper for Project Cards that displays an animated skeleton
 * loader until the image successfully loads, and renders a sleek,
 * dark-tech repository banner if the image fails or is absent.
 */
export const ProjectImageWithSkeleton: React.FC<ProjectImageWithSkeletonProps> = ({
  src,
  alt,
  className = 'project-img',
  categoryLabel,
  height = '160px',
  title,
  language
}) => {
  const isDefaultOrMissing = !src || src.includes('default-project') || src.trim() === '';
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(isDefaultOrMissing);

  const displayTitle = title || alt.replace(/\s*Preview$/i, '');
  const displayLang = language || (categoryLabel ? categoryLabel.split(' ')[0] : 'Code');

  if (hasError) {
    return (
      <div
        className="project-image-wrapper project-fallback-banner"
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height,
          borderRadius: '0.75rem',
          background: 'radial-gradient(ellipse at top, #241442 0%, #0d0c1d 100%)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem 1rem',
          boxSizing: 'border-box',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {/* Subtle decorative grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(168, 85, 247, 0.18) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Center glowing code icon */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(168, 85, 247, 0.2)',
            border: '1px solid rgba(192, 132, 252, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.6rem',
            boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)',
          }}
        >
          <i
            className="uil uil-brackets-curly"
            style={{ fontSize: '1.4rem', color: '#e9d5ff' }}
            aria-hidden="true"
          />
        </div>

        {/* Project repository title */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '0.92rem',
            fontWeight: 600,
            color: '#f8fafc',
            maxWidth: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '0.3px',
          }}
          title={displayTitle}
        >
          {displayTitle}
        </span>

        {/* Subtle language badge */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.45rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.15rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            color: '#cbd5e1',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#a855f7',
            }}
          />
          <span>{displayLang}</span>
        </div>

        {categoryLabel && (
          <span
            className="project-type"
            style={{
              position: 'absolute',
              top: '0.6rem',
              right: '0.6rem',
              zIndex: 2,
            }}
          >
            {categoryLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="project-image-wrapper"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height,
        borderRadius: '0.75rem',
        backgroundColor: 'rgba(30, 27, 75, 0.3)'
      }}
    >
      {!isLoaded && (
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '0.75rem',
            zIndex: 1
          }}
          aria-hidden="true"
        />
      )}

      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.35s ease-in-out'
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />

      {categoryLabel && <span className="project-type">{categoryLabel}</span>}
    </div>
  );
};

export interface ActivityImageWithSkeletonProps {
  src: string;
  alt: string;
  type?: string;
  className?: string;
}

/**
 * Image wrapper for Activity Cards with skeleton placeholder during asset load.
 */
export const ActivityImageWithSkeleton: React.FC<ActivityImageWithSkeletonProps> = ({
  src,
  alt,
  type,
  className = 'activity__img'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="activity__image-wrapper"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        backgroundColor: 'rgba(30, 27, 75, 0.3)'
      }}
    >
      {!isLoaded && (
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minHeight: '280px',
            borderRadius: '1.2rem',
            zIndex: 1
          }}
          aria-hidden="true"
        />
      )}

      <img
        src={hasError ? '/assets/img/preview.jpg' : src}
        alt={alt}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '280px',
          objectFit: 'cover',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.35s ease-in-out'
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />

      {type && <span className="activity__type">{type.toUpperCase()}</span>}
    </div>
  );
};

/**
 * Full card skeleton for Project Cards.
 */
export const ProjectCardSkeleton: React.FC = () => {
  return (
    <article
      className="project-card skeleton-card"
      aria-hidden="true"
      style={{
        minHeight: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <Skeleton height="160px" borderRadius="0.75rem" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <Skeleton width="30%" height="0.85rem" borderRadius="0.35rem" />
        <Skeleton width="80%" height="1.4rem" borderRadius="0.45rem" />
        <Skeleton width="100%" height="3rem" borderRadius="0.45rem" />

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <Skeleton width="60px" height="22px" borderRadius="1rem" />
          <Skeleton width="75px" height="22px" borderRadius="1rem" />
          <Skeleton width="65px" height="22px" borderRadius="1rem" />
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
          <Skeleton width="90px" height="34px" borderRadius="0.5rem" />
          <Skeleton width="80px" height="34px" borderRadius="0.5rem" />
        </div>
      </div>
    </article>
  );
};

/**
 * Full card skeleton for Activity Cards.
 */
export const ActivityCardSkeleton: React.FC = () => {
  return (
    <div
      className="activity__card skeleton-card"
      aria-hidden="true"
      style={{
        opacity: 0.9
      }}
    >
      <div className="activity__image-wrapper" style={{ minHeight: '280px' }}>
        <Skeleton height="100%" borderRadius="1.2rem" style={{ minHeight: '280px' }} />
      </div>

      <div className="activity__info" style={{ gap: '0.9rem' }}>
        <Skeleton width="30%" height="1.1rem" borderRadius="1rem" />
        <Skeleton width="85%" height="1.75rem" borderRadius="0.45rem" />
        <Skeleton width="100%" height="4rem" borderRadius="0.45rem" />

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
          <Skeleton width="85px" height="24px" borderRadius="1rem" />
          <Skeleton width="95px" height="24px" borderRadius="1rem" />
          <Skeleton width="115px" height="24px" borderRadius="1rem" />
          <Skeleton width="75px" height="24px" borderRadius="1rem" />
        </div>

        <Skeleton
          width="130px"
          height="40px"
          borderRadius="0.6rem"
          style={{ marginTop: '0.75rem' }}
        />
      </div>
    </div>
  );
};
