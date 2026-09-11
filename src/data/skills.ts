import { SkillItem } from "./types";

export interface SkillsGroup {
  languages: SkillItem[];
  systemsAndSecurity: SkillItem[];
  cloudAndDevOps: SkillItem[];
  webAndDatabases: SkillItem[];
}

export const SKILLS_DATA: SkillsGroup = {
  languages: [
    { name: "C++", level: "Advanced", desc: "STL, Systems programming, Memory management, Network simulation" },
    { name: "Python", level: "Advanced", desc: "Scientific computing, NumPy, ML algorithms, Automation" },
    { name: "JavaScript / TypeScript", level: "Advanced", desc: "ES6+, Next.js, Node.js, Async/Await, Streaming" },
    { name: "Java", level: "Proficient", desc: "OOP, Concurrency, Enterprise software architectures" },
    { name: "SQL", level: "Advanced", desc: "MySQL, Relational schema design, Query optimization, Indexing" },
    { name: "Bash / Shell", level: "Proficient", desc: "Linux automation, CLI tooling, System scripting" },
  ],
  systemsAndSecurity: [
    { name: "Wireless & Ad-Hoc Routing", level: "Specialist", desc: "MANET/VANET, Kinematic trajectory modeling, RSSI filtering" },
    { name: "Information & Network Security", level: "Specialist", desc: "Lightweight AEAD cryptography, Intrusion detection, Trust scoring" },
    { name: "Operating Systems & Internals", level: "Advanced", desc: "POSIX, Process scheduling, Virtual memory, Concurrency primitives" },
    { name: "Data Structures & Algorithms", level: "Advanced", desc: "Graph theory, Dynamic programming, Tree architectures, Complexity analysis" },
  ],
  cloudAndDevOps: [
    { name: "AWS Cloud Architecting", level: "Certified", desc: "VPC multi-tier design, High availability, IAM security, S3, RDS, Cost optimization" },
    { name: "Docker", level: "Proficient", desc: "Containerization, Multi-stage builds, Microservice isolation" },
    { name: "Linux / Unix", level: "Advanced", desc: "System administration, Daemon configuration, Network troubleshooting" },
    { name: "Git & GitHub Actions", level: "Advanced", desc: "CI/CD pipelines, Branch workflows, Release management" },
    { name: "n8n & Workflow Automation", level: "Proficient", desc: "Webhook orchestration, Low-code ETL pipelines" },
    { name: "Power BI", level: "Proficient", desc: "Data modeling, DAX queries, Telemetry analytics" },
  ],
  webAndDatabases: [
    { name: "Next.js / React", level: "Advanced", desc: "App Router, Server Components, Streaming UI, Hook design" },
    { name: "Node.js & Express", level: "Advanced", desc: "RESTful APIs, Custom middleware, JWT auth, WebSockets" },
    { name: "MongoDB", level: "Advanced", desc: "Document modeling, Indexing, Aggregation pipelines" },
    { name: "MySQL", level: "Advanced", desc: "Relational modeling, Transactions, ACID guarantees, Stored procedures" },
    { name: "Tailwind CSS", level: "Advanced", desc: "Responsive UX, Dark-mode first, Custom design systems" },
  ],
};
