import { Publication } from "./types";

export const RESEARCH_DATA: Publication[] = [
  {
    id: "adhoc-link-prediction",
    title: "Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications",
    venue: "Department of Computer Science & Engineering, Netaji Subhas University of Technology",
    affiliation: "Netaji Subhas University of Technology, New Delhi",
    author: "Dhruv Upadhyay",
    status: "Technical Report",
    year: "2026",
    abstract:
      "Decentralized wireless systems such as MANETs and VANETs face persistent communication drops caused by unpredictable node motion, physical shielding, and finite device energy. Standard reactive protocols attempt route repair only after paths fail, creating latency surges and control packet saturation. This research examines proactive topology management through kinematic forecasting, time-series signal filtering, lightweight AEAD authentication, and behavioral trust evaluation for resilient, high-throughput routing.",
    mathHighlights: [
      {
        formula: "r̂_t = α · r_t + (1 - α) · r̂_{t-1}",
        description: "Exponential signal strength smoothing filter mitigating short-term multipath fading.",
      },
      {
        formula: "LET = (-ab + √(a² + b²) · R² - (ad - bc)²) / (a² + b²)",
        description: "Kinematic Link Expiration Time estimation based on velocity vectors and transmission radius R.",
      },
      {
        formula: "T_node(t) = w_1 · S_success + w_2 · S_delay - w_3 · S_drop",
        description: "Continuous behavioral trust scoring mitigating Byzantine and black-hole routing attacks.",
      },
    ],
    benchmarks: [
      { metric: "Route Breakage Rate", proposed: "3.2 / min", reactiveBaseline: "8.9 / min (AODV)" },
      { metric: "Control Packet Overhead", proposed: "14.2 KB/s", reactiveBaseline: "36.8 KB/s" },
      { metric: "p99 End-to-End Latency", proposed: "28 ms", reactiveBaseline: "94 ms" },
      { metric: "Throughput (High Mobility)", proposed: "4.8 Mbps", reactiveBaseline: "2.9 Mbps" },
    ],
    bibtex: `@article{upadhyay2026link,
  title={Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications},
  author={Upadhyay, Dhruv},
  institution={Netaji Subhas University of Technology (NSUT)},
  year={2026},
  address={New Delhi, India}
}`,
  },
];
