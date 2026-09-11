import { Project } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "adhoc-simulator",
    title: "Adaptive MANET/VANET Link Predictor & Topology Simulator",
    subtitle: "Kinematic Trajectory & Signal Smoothing Engine",
    category: "Systems",
    summary:
      "Engineered an ad-hoc routing and signal simulation pipeline in Python & C++ to model mobility-induced path breakage and preemptively switch routes.",
    problem:
      "Standard ad-hoc routing suffers severe packet drops during dynamic topological shifts because routes are only re-computed post-disconnection.",
    architecture: [
      "Node mobility generator modeling Gauss-Markov and Random Waypoint dynamics",
      "Signal processing layer applying Kalman and Exponential RSSI filtering",
      "Proactive link expiration time (LET) predictor triggering route pre-caching",
      "Lightweight AEAD authentication layer securing control headers",
    ],
    bottlenecksSolved: [
      "Eliminated route discovery storm overhead by pre-computing alternative graph paths",
      "Dampened transient RSSI dips from physical shadowing using moving exponential filters",
    ],
    metrics: [
      { label: "Overhead Reduction", value: "61%" },
      { label: "Packet Delivery Ratio", value: "96.4%" },
    ],
    techStack: ["C++", "Python", "NumPy", "Network Modeling", "AEAD Ciphers"],
    githubUrl: "https://github.com/Dhruvdev-Codes",
  },
  {
    id: "workvibe",
    title: "WorkVibe – Mentor-Mentee Collaborative Network",
    subtitle: "Full-Stack Guidance & Real-time Collaboration Platform",
    category: "Full-Stack",
    summary:
      "Engineered a full-stack mentor-mentee networking platform to streamline academic guidance, scheduling, and peer connectivity.",
    problem:
      "University students often lack structured, direct channels to connect with senior mentors and schedule real-time technical guidance.",
    architecture: [
      "Express / Node.js API with JWT authentication and role-based authorization",
      "Normalized MongoDB document models with composite index lookup",
      "Responsive, accessible front-end interface built with modern JavaScript and Tailwind",
    ],
    bottlenecksSolved: [
      "Optimized mentor search query response from 120ms to 14ms through targeted indexing",
      "Implemented structured session request lifecycle to prevent scheduling collisions",
    ],
    metrics: [
      { label: "Search Latency", value: "<15ms" },
      { label: "Concurrency", value: "1,000+ Users" },
    ],
    techStack: ["JavaScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Dhruvdev-Codes",
  },
  {
    id: "skillxchange",
    title: "SkillXchange – Campus Peer Skill Marketplace",
    subtitle: "High-Concurrency Student Discussion & Collaboration Engine",
    category: "Full-Stack",
    summary:
      "A campus-exclusive digital community platform inspired by Discord and LinkedIn for peer technical discussions and project team formation.",
    problem:
      "Cross-department student skill matching for hackathons and research projects was fragmented across scattered chat groups.",
    architecture: [
      "Channel-based project rooms with real-time state synchronization",
      "Peer skill validation matrix and verified student credentialing",
      "High-performance MongoDB aggregation pipeline for interest matchmaking",
    ],
    bottlenecksSolved: [
      "Reduced redundant socket broadcast overhead with room-level pub/sub boundaries",
      "Enforced zero-spam rate limits on student message feeds",
    ],
    metrics: [
      { label: "Active Channels", value: "50+ Topics" },
      { label: "Query Speed", value: "Sub-20ms" },
    ],
    techStack: ["JavaScript", "MongoDB", "Node.js", "HTML5/CSS3", "Tailwind CSS"],
    githubUrl: "https://github.com/Dhruvdev-Codes",
  },
  {
    id: "travel-world",
    title: "Travel World – High-Throughput Itinerary Platform",
    subtitle: "Dynamic Tourism & Package Reservation Web App",
    category: "Full-Stack",
    summary:
      "Designed a responsive travel and tourism portal offering dynamic package filtering, destination guidance, and booking workflows.",
    problem:
      "Complex relational queries for customized multi-destination tours caused slow UI re-renders on low-bandwidth mobile networks.",
    architecture: [
      "Relational MySQL database with 3NF relational integrity",
      "Lightweight client bundle for rapid initial contentful paint",
      "Fast server-side query processing for itinerary calculation",
    ],
    bottlenecksSolved: [
      "Streamlined DOM rendering pipeline, achieving a 99 Lighthouse performance score",
      "Implemented parameterized SQL queries preventing injection vulnerabilities",
    ],
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Bundle Size", value: "<45 KB" },
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "MySQL", "UI/UX Design"],
    githubUrl: "https://github.com/Dhruvdev-Codes",
  },
];
