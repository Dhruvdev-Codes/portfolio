export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Systems" | "Full-Stack" | "Research" | "Cloud";
  summary: string;
  problem: string;
  architecture: string[];
  bottlenecksSolved: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  affiliation: string;
  author: string;
  status: "Published" | "Under Review" | "Technical Report";
  year: string;
  abstract: string;
  mathHighlights: {
    formula: string;
    description: string;
  }[];
  benchmarks: {
    metric: string;
    proposed: string;
    reactiveBaseline: string;
  }[];
  bibtex: string;
  pdfUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  category: "Cloud" | "Security" | "Leadership";
  skills: string[];
  date: string;
}

export interface SkillItem {
  name: string;
  level: "Specialist" | "Advanced" | "Proficient" | "Certified";
  desc: string;
}
