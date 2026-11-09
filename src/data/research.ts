export interface ResearchInterest {
  topic: string;
  category: string;
  description: string;
}

export interface FeaturedResearch {
  title: string;
  status: string;
  description: string;
  methodology: string;
  anticipatedOutcomes: string;
  keywords: string[];
}

export interface ResearchContent {
  sectionNumber: string;
  sectionTitle: string;
  headline: string;
  subheadline: string;
  featuredDirection: FeaturedResearch;
  interests: ResearchInterest[];
}

export const researchContent: ResearchContent = {
  sectionNumber: '05',
  sectionTitle: 'RESEARCH',
  headline: 'Exploring what comes next.',
  subheadline: 'Investigating emerging intersections in cloud infrastructure security, machine intelligence, and accessible computing.',
  featuredDirection: {
    title: 'Evaluating the Effectiveness of Web Application Firewalls in Detecting and Mitigating Attacks Against Web Applications',
    status: 'Ongoing Technical Investigation',
    description: 'An ongoing experimental evaluation analyzing the detection efficacy, false-positive overhead, and latency implications of modern Web Application Firewalls (WAFs) under adversarial attack vectors targeting distributed cloud workloads.',
    methodology: 'Deploying controlled benchmark environments comparing open-source rulesets (such as OWASP ModSecurity Core Rule Set) and managed cloud WAFs against SQL injection, cross-site scripting (XSS), and zero-day payload evasions in containerized clusters.',
    anticipatedOutcomes: 'Establishing reproducible empirical metrics on latency trade-offs, evasion vulnerabilities, and automated rule tuning strategies for resource-constrained engineering teams.',
    keywords: ['Web Application Firewalls', 'Cloud Security', 'OWASP Top 10', 'Evasion Analysis', 'Benchmarking']
  },
  interests: [
    {
      topic: 'Artificial Intelligence',
      category: 'Applied Intelligence',
      description: 'Designing robust inference pipelines, LLM agent tool-calling patterns, and verifiable reasoning guardrails.'
    },
    {
      topic: 'Distributed Systems',
      category: 'Architecture',
      description: 'Fault-tolerant consensus protocols, event streaming topologies, and high-throughput data processing across nodes.'
    },
    {
      topic: 'Kubernetes & Containers',
      category: 'Infrastructure',
      description: 'Declarative cluster orchestration, service mesh routing, automated autoscaling, and immutable container runtimes.'
    },
    {
      topic: 'Deep Reinforcement Learning',
      category: 'Machine Learning',
      description: 'Agent decision optimization in dynamic environments, policy gradients, and algorithmic state-space exploration.'
    },
    {
      topic: 'Cybersecurity',
      category: 'Security Engineering',
      description: 'Threat modeling, web application defense against OWASP Top 10 vulnerabilities, and automated security scanning.'
    },
    {
      topic: 'Zero Trust Security',
      category: 'Network & Identity',
      description: 'Identity-driven microsegmentation, least-privilege service-to-service authentication, and continuous verification architectures.'
    },
    {
      topic: 'Cloud Cost Optimization',
      category: 'Systems & FinOps',
      description: 'Resource rightsizing, cold-start mitigation in serverless compute, and architectural efficiency metrics.'
    },
    {
      topic: 'Accessibility Engineering',
      category: 'Human-Centered Tech',
      description: 'Empirical WCAG compliance audits, assistive multi-modal feedback loops, and semantic DOM resilience for non-visual computing.'
    }
  ]
};
