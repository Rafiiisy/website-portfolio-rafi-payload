export const SEED_SETTINGS = {
  siteName: "Rafi Syafrinaldi",
  defaultMeta: {
    title: "Rafi Syafrinaldi — AI Specialist",
    description:
      "Rafi Syafrinaldi — AI Specialist & Engineer building intelligent systems that deliver real impact.",
  },
};

export const SEED_HEADER = {
  name: "Rafi Syafrinaldi",
  shortName: "Rafi",
  nav: [
    { sectionId: "projects", label: "Projects" },
    { sectionId: "skills", label: "Skills" },
    { sectionId: "testimonials", label: "Testimonials" },
    { sectionId: "contact", label: "Contact" },
  ],
};

export const SEED_FOOTER = {
  copyright: "© 2026 Rafi Syafrinaldi · Crafted with intent",
};

export const SEED_HOMEPAGE_META = {
  title: "Rafi Syafrinaldi — AI Specialist",
  description:
    "Rafi Syafrinaldi — AI Specialist & Engineer building intelligent systems that deliver real impact.",
};

const bullets = (items: string[]) => items.map((text) => ({ text }));

export function buildHomepageLayout(portraitId: string) {
  return [
    {
      blockType: "block-portfolio-hero",
      sectionID: "top",
      portrait: portraitId,
      role: "AI Specialist & Engineer",
      location: "Indonesia · Available 2026",
      firstName: "Rafi",
      lastName: "Syafrinaldi",
      tagline: "// AI Specialist",
      taglineSub: "Building intelligent systems",
      connectLabel: "Connect",
      scrollLabel: "Scroll to explore",
      social: [
        { label: "LinkedIn", href: "#", icon: "linkedin" },
        { label: "Twitter", href: "#", icon: "twitter" },
        { label: "Instagram", href: "#", icon: "instagram" },
      ],
    },
    {
      blockType: "block-portfolio-projects",
      sectionID: "projects",
      eyebrow: "// Selected work",
      title: "Transformations",
      titleAccent: "deliver impact.",
      subtitle:
        "Each case study flows from a problem state into an AI-native solution — read the gradient left to right.",
      items: [
        {
          number: "01",
          category: "AI Agents",
          metrics: "85% Intent Recognition • 40% Hallucination Reduction",
          title: "Autonomous Customer Support Agent",
          description:
            "Developed a multi-turn AI chatbot with long-term memory, context retention, and conversation analytics.",
          tags: [
            { label: "LangChain" },
            { label: "OpenAI GPT-4" },
            { label: "FAISS" },
            { label: "Redis" },
            { label: "FastAPI" },
            { label: "Python" },
          ],
          before: {
            label: "Before — Manual Support",
            metric: "24h",
            description:
              "Customer support teams struggled to handle growing inquiry volumes while maintaining consistent quality.",
            bullets: bullets([
              "Manual ticket handling",
              "No conversation memory",
              "Repetitive customer questions",
              "Inconsistent responses",
              "Limited scalability",
            ]),
          },
          after: {
            label: "After — AI Support Agent",
            metric: "<1min",
            description:
              "Developed a multi-turn AI chatbot with long-term memory, context retention, and conversation analytics.",
            bullets: bullets([
              "Context-aware conversations",
              "Persistent memory using Redis",
              "Knowledge retrieval with FAISS",
              "Conversation quality monitoring",
              "85% intent recognition accuracy",
              "40% reduction in hallucinations",
            ]),
          },
        },
        {
          number: "02",
          category: "AI Automation",
          metrics: "95% Faster Engagement",
          title: "Social Media Auto Replier",
          description:
            "Built an autonomous reply system that analyzes context and generates brand-aligned responses.",
          tags: [
            { label: "n8n" },
            { label: "OpenAI" },
            { label: "Claude" },
            { label: "Gemini" },
            { label: "Instagram" },
            { label: "Facebook" },
            { label: "LinkedIn" },
          ],
          before: {
            label: "Before — Manual Community Management",
            metric: "6h/day",
            description:
              "Social media managers manually replied to comments and DMs across multiple platforms.",
            bullets: bullets([
              "Slow response times",
              "Missed opportunities",
              "High workload",
              "Inconsistent tone",
              "Limited availability",
            ]),
          },
          after: {
            label: "After — AI Engagement Engine",
            metric: "24/7",
            description:
              "Built an autonomous reply system that analyzes context and generates brand-aligned responses.",
            bullets: bullets([
              "Automatic comment replies",
              "AI-powered DM responses",
              "Brand tone consistency",
              "Multi-platform support",
              "Human approval workflows",
              "24/7 engagement coverage",
            ]),
          },
        },
        {
          number: "03",
          category: "Reporting Automation",
          metrics: "90% Time Savings",
          title: "Automated Marketing Report Generator",
          description:
            "Built an automated workflow that gathers data, generates insights, and creates presentation-ready reports.",
          tags: [
            { label: "n8n" },
            { label: "Google Slides" },
            { label: "Meta API" },
            { label: "Metricool" },
            { label: "OpenAI" },
            { label: "Google Drive" },
          ],
          before: {
            label: "Before — Manual Reporting",
            metric: "8h/report",
            description:
              "Teams manually collected marketing data and built presentation decks every month.",
            bullets: bullets([
              "Copy-pasting metrics",
              "Manual slide creation",
              "Human errors",
              "Delayed reports",
              "Poor scalability",
            ]),
          },
          after: {
            label: "After — AI Reporting Pipeline",
            metric: "10min/report",
            description:
              "Built an automated workflow that gathers data, generates insights, and creates presentation-ready reports.",
            bullets: bullets([
              "Automated data extraction",
              "AI-generated analysis",
              "Auto-generated presentations",
              "Scheduled delivery",
              "Consistent formatting",
              "Near-zero manual effort",
            ]),
          },
        },
        {
          number: "04",
          category: "Content AI",
          metrics: "20x Faster Publishing",
          title: "SEO Article Generation System",
          description:
            "Created a fully automated SEO content pipeline from keyword research to article publishing.",
          tags: [
            { label: "n8n" },
            { label: "OpenAI" },
            { label: "Claude" },
            { label: "Gemini" },
            { label: "Google Search" },
            { label: "Notion" },
          ],
          before: {
            label: "Before — Traditional Content Creation",
            metric: "2–3 days/article",
            description:
              "Content teams spent significant time researching, writing, and optimizing articles.",
            bullets: bullets([
              "Manual keyword research",
              "Slow content production",
              "SEO inconsistencies",
              "High content costs",
              "Publishing bottlenecks",
            ]),
          },
          after: {
            label: "After — AI SEO Factory",
            metric: "15min/article",
            description:
              "Created a fully automated SEO content pipeline from keyword research to article publishing.",
            bullets: bullets([
              "AI keyword clustering",
              "SEO-optimized content",
              "Metadata generation",
              "Internal linking suggestions",
              "Automated publishing",
              "Scalable content production",
            ]),
          },
        },
        {
          number: "05",
          category: "Market Research",
          metrics: "95% Faster Analysis",
          title: "AI Competitor Intelligence Engine",
          description:
            "Built an automated competitor monitoring and intelligence gathering system.",
          tags: [
            { label: "n8n" },
            { label: "Manus AI" },
            { label: "Perplexity" },
            { label: "Claude" },
            { label: "OpenAI" },
          ],
          before: {
            label: "Before — Manual Competitor Research",
            metric: "2–3 days",
            description:
              "Research teams manually investigated competitors across websites, blogs, and social channels.",
            bullets: bullets([
              "Time-consuming analysis",
              "Fragmented information",
              "Incomplete insights",
              "Difficult monitoring",
            ]),
          },
          after: {
            label: "After — AI Competitive Intelligence",
            metric: "10min",
            description:
              "Built an automated competitor monitoring and intelligence gathering system.",
            bullets: bullets([
              "Competitor discovery",
              "Product analysis",
              "Content monitoring",
              "Market positioning reports",
              "Trend identification",
              "Automated summaries",
            ]),
          },
        },
        {
          number: "06",
          category: "AI Media Generation",
          metrics: "10x Faster Asset Creation",
          title: "AI Creative Content Pipeline",
          description:
            "Developed an AI-powered workflow generating branded images and social media creatives.",
          tags: [
            { label: "Recraft" },
            { label: "n8n" },
            { label: "OpenAI" },
            { label: "Claude" },
          ],
          before: {
            label: "Before — Traditional Design Workflow",
            metric: "Several days",
            description:
              "Marketing assets required multiple stakeholders and long revision cycles.",
            bullets: bullets([
              "Designer dependency",
              "Slow turnaround",
              "High production costs",
              "Repetitive revisions",
              "Limited experimentation",
            ]),
          },
          after: {
            label: "After — AI Creative Studio",
            metric: "Minutes",
            description:
              "Developed an AI-powered workflow generating branded images and social media creatives.",
            bullets: bullets([
              "AI image generation",
              "Brand consistency enforcement",
              "Bulk content creation",
              "Automated asset delivery",
              "Rapid experimentation",
            ]),
          },
        },
        {
          number: "07",
          category: "Sales Automation",
          metrics: "5,000+ Leads Processed",
          title: "Lead Generation Intelligence Platform",
          description:
            "Built a lead sourcing and enrichment platform leveraging Apollo and AI.",
          tags: [
            { label: "Apollo" },
            { label: "JavaScript" },
            { label: "n8n" },
            { label: "OpenAI" },
            { label: "Claude" },
          ],
          before: {
            label: "Before — Manual Prospecting",
            metric: "Hours per lead list",
            description:
              "Sales teams manually searched for prospects and gathered company information.",
            bullets: bullets([
              "Manual lead research",
              "Poor enrichment quality",
              "Slow prospecting",
              "Incomplete records",
            ]),
          },
          after: {
            label: "After — AI Lead Engine",
            metric: "Minutes",
            description:
              "Built a lead sourcing and enrichment platform leveraging Apollo and AI.",
            bullets: bullets([
              "Automated prospect discovery",
              "Company enrichment",
              "Decision-maker identification",
              "Personalized outreach generation",
              "5,000+ leads processed",
            ]),
          },
        },
        {
          number: "08",
          category: "Web Development Automation",
          metrics: "80% Faster Delivery",
          title: "AI Website Generation Pipeline",
          description:
            "Created an AI-assisted workflow transforming business requirements into deployable websites.",
          tags: [
            { label: "n8n" },
            { label: "Cursor" },
            { label: "Figma" },
            { label: "Lovable" },
            { label: "Claude" },
            { label: "OpenAI" },
          ],
          before: {
            label: "Before — Traditional Web Development",
            metric: "2–4 weeks",
            description:
              "Building websites required multiple handoffs between designers and developers.",
            bullets: bullets([
              "Design bottlenecks",
              "Repetitive development",
              "Long delivery cycles",
              "Multiple revisions",
            ]),
          },
          after: {
            label: "After — AI Website Factory",
            metric: "1–2 days",
            description:
              "Created an AI-assisted workflow transforming business requirements into deployable websites.",
            bullets: bullets([
              "Requirement analysis",
              "Wireframe generation",
              "Design automation",
              "Code generation",
              "Rapid prototyping",
              "Faster client delivery",
            ]),
          },
        },
        {
          number: "09",
          category: "AI Research",
          metrics: "90% Faster Analysis",
          title: "Financial Due Diligence AI Analyst",
          description:
            "Built an AI-powered due diligence assistant that generates investment research reports.",
          tags: [
            { label: "OpenAI" },
            { label: "Claude" },
            { label: "Python" },
            { label: "FastAPI" },
            { label: "n8n" },
          ],
          before: {
            label: "Before — Manual Due Diligence",
            metric: "Several days",
            description:
              "Analysts manually reviewed company information, financials, and market positioning.",
            bullets: bullets([
              "Extensive manual research",
              "Large document reviews",
              "Slow reporting",
              "Inconsistent findings",
            ]),
          },
          after: {
            label: "After — AI Investment Analyst",
            metric: "<1 hour",
            description:
              "Built an AI-powered due diligence assistant that generates investment research reports.",
            bullets: bullets([
              "Company analysis",
              "Market intelligence",
              "Risk assessment",
              "Executive summaries",
              "Automated report generation",
            ]),
          },
        },
        {
          number: "10",
          category: "Enterprise Search",
          metrics: "Instant Knowledge Retrieval",
          title: "Knowledge Management AI Assistant",
          description:
            "Created a company-wide AI knowledge assistant powered by retrieval-augmented generation.",
          tags: [
            { label: "LangChain" },
            { label: "OpenAI" },
            { label: "FAISS" },
            { label: "Notion" },
            { label: "n8n" },
          ],
          before: {
            label: "Before — Information Silos",
            metric: "15–30 min/search",
            description:
              "Employees struggled to find documents and institutional knowledge.",
            bullets: bullets([
              "Scattered information",
              "Duplicate work",
              "Slow onboarding",
              "Knowledge loss",
            ]),
          },
          after: {
            label: "After — AI Knowledge Hub",
            metric: "Seconds",
            description:
              "Created a company-wide AI knowledge assistant powered by retrieval-augmented generation.",
            bullets: bullets([
              "Natural language search",
              "Internal document retrieval",
              "Instant answers",
              "Context-aware responses",
              "Reduced knowledge fragmentation",
            ]),
          },
        },
      ],
    },
    {
      blockType: "block-portfolio-stack",
      sectionID: "skills",
      title: "Stack &",
      titleAccent: "capabilities",
      subtitle: "A curated toolkit refined across years of shipping production AI systems.",
      categories: [
        {
          title: "AI / ML",
          icon: "brain",
          tags: [
            { label: "PyTorch" },
            { label: "TensorFlow" },
            { label: "LangChain" },
            { label: "LlamaIndex" },
            { label: "Hugging Face" },
            { label: "OpenAI" },
            { label: "Anthropic" },
            { label: "Scikit-learn" },
          ],
        },
        {
          title: "Development",
          icon: "code",
          tags: [
            { label: "Python" },
            { label: "TypeScript" },
            { label: "FastAPI" },
            { label: "Next.js" },
            { label: "React" },
            { label: "Node.js" },
            { label: "Go" },
            { label: "Rust" },
          ],
        },
        {
          title: "Cloud & Infra",
          icon: "cloud",
          tags: [
            { label: "AWS" },
            { label: "GCP" },
            { label: "Azure" },
            { label: "Docker" },
            { label: "Kubernetes" },
            { label: "Terraform" },
            { label: "Vercel" },
            { label: "Cloudflare" },
          ],
        },
        {
          title: "Data Engineering",
          icon: "database",
          tags: [
            { label: "Snowflake" },
            { label: "Databricks" },
            { label: "Airflow" },
            { label: "Kafka" },
            { label: "dbt" },
            { label: "Postgres" },
            { label: "Pinecone" },
            { label: "Weaviate" },
          ],
        },
      ],
    },
    {
      blockType: "block-portfolio-testimonials",
      sectionID: "testimonials",
      title: "What clients",
      titleAccent: "say",
      items: [
        {
          quote:
            '"Rafi transformed our support operations overnight. The autonomous agents he built now handle 80% of our tickets with higher CSAT than our human team."',
          name: "Sarah Mitchell",
          role: "VP Operations, NovaScale",
        },
        {
          quote:
            '"Rare combination of deep ML expertise and product instincts. He shipped a RAG system that became the backbone of our knowledge platform."',
          name: "David Park",
          role: "CTO, Helix Industries",
        },
        {
          quote:
            '"Working with Rafi feels like adding a research lab and a senior engineer to your team — at the same time. Genuinely game-changing."',
          name: "Priya Anand",
          role: "Head of AI, Quantum Forge",
        },
      ],
    },
    {
      blockType: "block-portfolio-contact",
      sectionID: "contact",
      badge: "Open to new collaborations",
      title: "Let's build AI solutions",
      titleAccent: "real impact",
      subtitle:
        "Whether you're scaling a startup or transforming an enterprise, I'd love to hear what you're building.",
      cta: "Contact Me",
      ctaHref: "mailto:hello@rafisyafrinaldi.com",
      copyright: SEED_FOOTER.copyright,
      links: [
        { label: "hello@rafisyafrinaldi.com", href: "mailto:hello@rafisyafrinaldi.com", icon: "mail" },
        { label: "LinkedIn", href: "#", icon: "linkedin" },
        { label: "GitHub", href: "#", icon: "github" },
      ],
    },
  ];
}
