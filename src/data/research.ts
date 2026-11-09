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
  headline: 'Applied research and technical inquiries.',
  subheadline: 'Empirical evaluations in cloud security, Web Application Firewall efficacy, and multi-modal accessibility interfaces.',
  featuredDirection: {
    title: 'Evaluating the Effectiveness of Web Application Firewalls in Detecting and Mitigating Attacks Against Web Applications',
    status: 'Active Technical Investigation',
    description: 'An empirical investigation measuring detection efficacy, false-positive latency overhead, and rule resilience across modern Web Application Firewalls (WAFs) under adversarial attack vectors targeting distributed cloud workloads.',
    methodology: 'Deploying controlled benchmark environments comparing open-source rulesets (OWASP ModSecurity Core Rule Set) against managed cloud WAF configurations under SQL injection, cross-site scripting (XSS), and automated encoding evasion payloads in containerized clusters.',
    anticipatedOutcomes: 'Establishing reproducible empirical metrics on latency trade-offs, payload evasion vulnerabilities, and automated rule tuning strategies for resource-constrained engineering teams.',
    keywords: ['Web Application Firewalls', 'Cloud Security', 'OWASP Top 10', 'Evasion Analysis', 'Benchmarking']
  },
  interests: [
    {
      topic: 'Accessibility Engineering',
      category: 'Human-Centered Systems',
      description: 'Empirical WCAG 2.2 AAA compliance audits, semantic DOM resilience, and assistive multi-modal feedback loops for screen-reader users.'
    },
    {
      topic: 'Cloud Infrastructure Security',
      category: 'Security Engineering',
      description: 'Threat modeling, web application defense against OWASP Top 10 vectors, and automated vulnerability scanning in containerized environments.'
    },
    {
      topic: 'Distributed Systems & Microservices',
      category: 'System Architecture',
      description: 'Fault-tolerant consensus protocols, asynchronous messaging topologies, and high-throughput data processing across decentralized nodes.'
    },
    {
      topic: 'Applied Machine Learning & LLMs',
      category: 'Intelligent Systems',
      description: 'Structured tool-calling pipelines, LLM agent guardrails, and deterministic evaluation workflows for production conversational interfaces.'
    },
    {
      topic: 'Container Orchestration & Linux',
      category: 'Infrastructure',
      description: 'Immutable container runtimes, declarative cluster configurations, Nginx reverse proxy tuning, and automated CI/CD deployment routines.'
    },
    {
      topic: 'Zero Trust Network Architecture',
      category: 'Network & Identity',
      description: 'Least-privilege service-to-service authentication, identity-driven microsegmentation, and continuous verification mechanisms.'
    }
  ]
};
