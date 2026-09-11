export * from "./types";
export * from "./research";
export * from "./projects";
export * from "./skills";
export * from "./certifications";

import { RESEARCH_DATA } from "./research";
import { PROJECTS_DATA } from "./projects";
import { SKILLS_DATA } from "./skills";
import { CERTIFICATIONS_DATA } from "./certifications";

export const PROFILE_DATA = {
  name: "Dhruv Upadhyay",
  title: "M.Tech in Computer Science & Engineering",
  specialization: "Information Security, Ad-Hoc Networks & Systems",
  institution: "Netaji Subhas University of Technology (NSUT), New Delhi",
  previousInstitution: "Acropolis Institute of Technology and Research (AITR), Indore",
  email: "dhruvupadhyay708937@gmail.com",
  academicEmail: "dhruv.upadhyay.pg26@nsut.ac.in",
  phone: "+91 7489221051",
  github: "https://github.com/Dhruvdev-Codes",
  linkedin: "https://linkedin.com/in/dhruv-upadhyay",
  location: "New Delhi / Indore, India",
  headline: "M.Tech CSE Scholar @ NSUT Delhi | Wireless Systems, Applied AI & Cloud Architecture",
  bio: "M.Tech CSE scholar specializing in Information Security, Wireless Ad-Hoc Networks, and Distributed Systems at Netaji Subhas University of Technology (NSUT), New Delhi. 2x AWS Academy Graduate & Google Cybersecurity Certified.",

  metrics: [
    { label: "Research Domain", value: "Ad-Hoc Link Predictability" },
    { label: "Route Failure Reduction", value: "-61% Overhead" },
    { label: "AWS Credentials", value: "2x Academy Graduate" },
    { label: "Security & Protocols", value: "AEAD & Trust Models" },
  ],

  research: RESEARCH_DATA,
  projects: PROJECTS_DATA,
  skills: SKILLS_DATA,
  certifications: CERTIFICATIONS_DATA,
};
