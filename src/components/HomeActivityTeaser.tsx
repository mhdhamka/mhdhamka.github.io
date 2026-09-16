import React from 'react';
import { ActivityImageWithSkeleton } from './common/SkeletonLoader';

interface HomeActivityTeaserProps {
  onViewAllActivities: () => void;
}

export const HomeActivityTeaser: React.FC<HomeActivityTeaserProps> = ({ onViewAllActivities }) => {
  return (
    <section className="activity section" id="activity">
      <h2 className="section__title">Leadership &amp; Activities</h2>
      <span className="section__subtitle">
        Leadership roles, volunteering experiences, and industry exposure
      </span>

      <div className="activity__container container">
        <div className="activity__card">
          <ActivityImageWithSkeleton
            src="/assets/img/preview.jpg"
            alt="Activities Preview"
            type="ACTIVITIES"
          />

          <div className="activity__info">
            <span className="activity__date">
              <i className="uil uil-calendar-alt" aria-hidden="true"></i> 2021-Present
            </span>

            <h3>Leadership, Volunteering &amp; Professional Development</h3>

            <p>
              A showcase of my leadership roles, volunteer work, technology events,
              bootcamps, and professional development activities that have strengthened
              my leadership, teamwork, and communication skills.
            </p>

            <div className="activity__tags">
              <span>#Leadership</span>
              <span>#Volunteerism</span>
              <span>#ProfessionalDevelopment</span>
              <span>#Technology</span>
              <span>#CommunityEngagement</span>
            </div>

            <button
              type="button"
              onClick={onViewAllActivities}
              className="button button--flex activity__button"
            >
              View My Activities
              <i className="uil uil-arrow-right button__icon" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
