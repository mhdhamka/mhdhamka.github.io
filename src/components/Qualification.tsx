import React, { useState } from 'react';
import '../assets/css/qualification.css';

interface QualificationItem {
  id: string;
  category: 'experience' | 'education' | 'certification';
  title: string;
  subtitle: string;
  location?: string;
  date: string;
  typeBadge: string;
  isLive?: boolean;
  isFeatured?: boolean;
  summary: string;
  scoreOrStatus: {
    label: string;
    value: string;
    highlight?: boolean;
    isLink?: boolean;
    url?: string;
  };
  skills: string[];
  icon: string;
}

const qualificationsData: QualificationItem[] = [
  // EXPERIENCE
  {
    id: 'xfab-metrology',
    category: 'experience',
    title: 'Metrology Engineer',
    subtitle: 'X-FAB Sarawak',
    location: 'Kuching, Sarawak',
    date: '2025 – Present',
    typeBadge: 'Full-time',
    isLive: true,
    isFeatured: true,
    summary: 'Silicon wafer metrology analysis, critical dimension inspection, and statistical yield optimization.',
    scoreOrStatus: {
      label: 'Domain',
      value: 'Semiconductor Fabrication',
      highlight: true,
    },
    skills: ['Metrology Analysis', 'SPC Monitoring', 'Yield Optimization', 'Thin-Film Inspection', 'Cleanroom Fab', 'Data Analytics'],
    icon: 'uil-processor',
  },
  {
    id: 'sarawak-energy-soc',
    category: 'experience',
    title: 'SOC Analyst Intern',
    subtitle: 'Sarawak Energy Berhad',
    location: 'Kuching, Sarawak',
    date: '2023',
    typeBadge: 'Internship',
    isFeatured: false,
    summary: 'Critical utility infrastructure defense, SIEM telemetry monitoring, and incident triage.',
    scoreOrStatus: {
      label: 'Focus',
      value: 'SIEM & Cyber Defense',
      highlight: false,
    },
    skills: ['SIEM Telemetry', 'Threat Triage', 'Log Correlation', 'Incident Response', 'Network Defense', 'Security Compliance'],
    icon: 'uil-shield-check',
  },

  // EDUCATION
  {
    id: 'unimas-degree',
    category: 'education',
    title: 'B.Sc. Software Engineering (Hons)',
    subtitle: 'Universiti Malaysia Sarawak (UNIMAS)',
    location: 'Kota Samarahan, Sarawak',
    date: '2020 – 2024',
    typeBadge: 'Bachelor Degree',
    isFeatured: true,
    summary: 'Upper Class Honours graduate specializing in modern web architecture, distributed systems, and ML.',
    scoreOrStatus: {
      label: 'CGPA',
      value: '3.65 / 4.00 (Dean’s List)',
      highlight: true,
    },
    skills: ['Software Architecture', 'Distributed Systems', 'Applied ML', 'Algorithms & Data Structures', 'Agile & DevOps'],
    icon: 'uil-graduation-cap',
  },
  {
    id: 'unimas-foundation',
    category: 'education',
    title: 'Foundation in Physical Science',
    subtitle: 'Pre-University Studies, UNIMAS',
    location: 'Kota Samarahan, Sarawak',
    date: '2019 – 2020',
    typeBadge: 'Pre-University',
    isFeatured: false,
    summary: 'Core computing principles, engineering physics, advanced calculus, and computational logic.',
    scoreOrStatus: {
      label: 'CGPA',
      value: '3.27 / 4.00',
      highlight: false,
    },
    skills: ['Advanced Calculus', 'Computing Principles', 'Engineering Physics', 'Analytical Logic'],
    icon: 'uil-atom',
  },

  // CERTIFICATIONS
  {
    id: 'comptia-cloud',
    category: 'certification',
    title: 'CompTIA Cloud Essentials+',
    subtitle: 'CompTIA Global Certification',
    date: 'Issued 2023',
    typeBadge: 'Certification',
    isFeatured: true,
    summary: 'Cloud architecture principles, cloud security governance, resource management, and business compliance.',
    scoreOrStatus: {
      label: 'Credential',
      value: 'Verified on Credly',
      highlight: true,
      isLink: true,
      url: 'https://www.credly.com/badges/8cff42c7-08b2-4dbe-9bb9-63a2c00ae3f0/public_url',
    },
    skills: ['Cloud Architecture', 'Security & Risk', 'Cloud Governance', 'Cost Management', 'Infrastructure Ops'],
    icon: 'uil-cloud-computing',
  },
  {
    id: 'scrum-sfc',
    category: 'certification',
    title: 'Scrum Fundamentals Certified (SFC™)',
    subtitle: 'SCRUMstudy Certification Authority',
    date: 'Issued 2024',
    typeBadge: 'Certification',
    isFeatured: false,
    summary: 'Agile framework implementation, sprint planning ceremonies, product backlog management, and team velocity.',
    scoreOrStatus: {
      label: 'Credential ID',
      value: '1014169 • Verified',
      highlight: true,
      isLink: true,
      url: 'https://www.scrumstudy.com/certification/verify?type=SFC&number=1014169',
    },
    skills: ['Scrum Framework', 'Sprint Planning', 'Backlog Refinement', 'Daily Standups', 'Agile Ceremonies'],
    icon: 'uil-sync',
  },
];

export const Qualification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education' | 'certification'>('all');

  const filteredItems = activeTab === 'all'
    ? qualificationsData
    : qualificationsData.filter((item) => item.category === activeTab);

  const counts = {
    all: qualificationsData.length,
    experience: qualificationsData.filter((i) => i.category === 'experience').length,
    education: qualificationsData.filter((i) => i.category === 'education').length,
    certification: qualificationsData.filter((i) => i.category === 'certification').length,
  };

  return (
    <section className="qualification section" id="qualification">
      <div className="section__header">
        <span className="section__badge">
          <i className="uil uil-chart-line" aria-hidden="true"></i> Career Track
        </span>
        <h2 className="section__title">Professional Journey</h2>
        <p className="section__subtitle">
          Engineering experience, academic background, and industry credentials
        </p>
      </div>

      <div className="qualification-wrapper">
        {/* Category Filter Tabs (Pill Buttons) */}
        <div className="qual-tabs" role="tablist">
          <button
            type="button"
            className={`qual-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            role="tab"
            aria-selected={activeTab === 'all'}
          >
            <i className="uil uil-apps" aria-hidden="true"></i>
            <span>All</span>
            <span className="qual-tab-count">{counts.all}</span>
          </button>

          <button
            type="button"
            className={`qual-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
            role="tab"
            aria-selected={activeTab === 'experience'}
          >
            <i className="uil uil-briefcase-alt" aria-hidden="true"></i>
            <span>Experience</span>
            <span className="qual-tab-count">{counts.experience}</span>
          </button>

          <button
            type="button"
            className={`qual-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
            role="tab"
            aria-selected={activeTab === 'education'}
          >
            <i className="uil uil-graduation-cap" aria-hidden="true"></i>
            <span>Education</span>
            <span className="qual-tab-count">{counts.education}</span>
          </button>

          <button
            type="button"
            className={`qual-tab-btn ${activeTab === 'certification' ? 'active' : ''}`}
            onClick={() => setActiveTab('certification')}
            role="tab"
            aria-selected={activeTab === 'certification'}
          >
            <i className="uil uil-award" aria-hidden="true"></i>
            <span>Certifications</span>
            <span className="qual-tab-count">{counts.certification}</span>
          </button>
        </div>

        {/* Tech Stack-Style Cards Grid */}
        <div className="qual-grid">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`qual-card ${item.isFeatured ? 'qual-card--featured' : ''}`}
            >
              <div>
                {/* Header Row: Icon + Role Title + Badges */}
                <div className="qual-card-top">
                  <div className="qual-icon-box">
                    <i className={`uil ${item.icon}`} aria-hidden="true"></i>
                  </div>

                  <div className="qual-title-group">
                    <div className="qual-badges-row">
                      <span className={`qual-type-badge ${item.isLive ? 'qual-type-badge--live' : ''}`}>
                        {item.isLive && <span className="qual-pulse-dot" aria-hidden="true"></span>}
                        {item.typeBadge}
                      </span>
                      <span className="qual-date-tag">
                        <i className="uil uil-calendar-alt" aria-hidden="true"></i>
                        {item.date}
                      </span>
                    </div>

                    <h3 className="qual-role-title">{item.title}</h3>
                    <div className="qual-org-subtitle">
                      <span>{item.subtitle}</span>
                      {item.location && (
                        <span className="qual-location-text">• {item.location}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Crisp 1-sentence summary - No essay! */}
                <p className="qual-summary-text">{item.summary}</p>

                {/* Tech Stack-Style Skills & Competencies Chips */}
                <div className="qual-skills-grid">
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="qual-tech-chip">
                      <span className="qual-chip-dot"></span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="qual-card-footer">
                <span className="qual-metric-label">{item.scoreOrStatus.label}</span>
                {item.scoreOrStatus.isLink && item.scoreOrStatus.url ? (
                  <a
                    href={item.scoreOrStatus.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qual-link-action"
                  >
                    <span>{item.scoreOrStatus.value}</span>
                    <i className="uil uil-external-link-alt" aria-hidden="true"></i>
                  </a>
                ) : (
                  <span
                    className={`qual-metric-val ${
                      item.scoreOrStatus.highlight ? 'qual-metric-val--highlight' : ''
                    }`}
                  >
                    {item.scoreOrStatus.value}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
