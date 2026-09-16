export interface Project {
  repo: string;
  title: string;
  category: 'web' | 'fullstack' | 'console' | string;
  categoryLabel: string;
  description: string;
  highlights: string[];
  architecture: string;
  tags: string[];
  img?: string;
  githubUrl: string;
  demoUrl?: string;
  updatedAt?: string;
  stars?: number;
}

export interface Activity {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
  tags: string[];
  img: string;
  linkText?: string;
  linkUrl?: string;
  secondaryLinkText?: string;
  secondaryLinkUrl?: string;
}

export interface QualificationItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  badge: string;
  badgeType?: string;
  footerLabel: string;
  footerValue: string;
  highlight?: boolean;
  verifyUrl?: string;
  iconClass: string;
}

export interface AnalyticsData {
  totalViews: number;
  uniqueSessions: number;
  todayViews: number;
  lastUpdated: string;
  sectionViews: Record<string, number>;
  activeSeconds: number;
}
