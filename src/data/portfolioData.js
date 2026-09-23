export const portfolioData = {
  personal: {
    name: "Abhiram",
    title: "Full-Stack Engineer & AI Builder",
    subtitle: "Crafting scalable web systems, intuitive interfaces, and AI-powered solutions that make a meaningful impact.",
    bio: "I am a passionate software engineer with expertise in modern web technologies, distributed cloud architectures, and machine learning integration. I focus on building high-performance, accessible, and delight-inducing digital experiences from concept to production.",
    location: "Open to Worldwide Remote",
    email: "abhiram.dev@example.com",
    availability: "Available for freelance & full-time roles",
    resumeUrl: "#resume",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:abhiram.dev@example.com"
    }
  },

  stats: [
    { label: "Years Experience", value: "4+" },
    { label: "Completed Projects", value: "30+" },
    { label: "Open Source Stars", value: "1.2k+" },
    { label: "Client Satisfaction", value: "100%" }
  ],

  skillCategories: [
    {
      category: "Frontend Development",
      skills: [
        { name: "React / Next.js", level: "Advanced", icon: "⚛️" },
        { name: "TypeScript / JavaScript", level: "Advanced", icon: "🔷" },
        { name: "Modern CSS & Tailwind", level: "Expert", icon: "🎨" },
        { name: "Vue.js", level: "Intermediate", icon: "🟢" },
        { name: "HTML5 & Accessibility", level: "Expert", icon: "🌐" },
        { name: "Three.js / Canvas", level: "Intermediate", icon: "✨" }
      ]
    },
    {
      category: "Backend & Cloud",
      skills: [
        { name: "Node.js & Express", level: "Advanced", icon: "🚀" },
        { name: "Python & FastAPI", level: "Advanced", icon: "🐍" },
        { name: "PostgreSQL & Prisma", level: "Advanced", icon: "🐘" },
        { name: "MongoDB & Redis", level: "Intermediate", icon: "🍃" },
        { name: "Docker & Containerization", level: "Intermediate", icon: "🐳" },
        { name: "AWS & Vercel Edge", level: "Intermediate", icon: "☁️" }
      ]
    },
    {
      category: "AI, Tools & Architecture",
      skills: [
        { name: "Gemini & LLM APIs", level: "Advanced", icon: "🧠" },
        { name: "Git & CI/CD Pipelines", level: "Advanced", icon: "🐙" },
        { name: "REST & GraphQL APIs", level: "Expert", icon: "⚡" },
        { name: "Figma UI/UX Design", level: "Intermediate", icon: "🎯" },
        { name: "Jest / Vitest Testing", level: "Intermediate", icon: "🧪" },
        { name: "System Architecture", level: "Advanced", icon: "🏗️" }
      ]
    }
  ],

  projects: [
    {
      id: "ai-copilot",
      title: "OmniAI Knowledge Assistant",
      tagline: "Intelligent workspace companion for synthesizing complex docs and automating workflows.",
      category: "AI & ML",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
      description: "An enterprise-grade document intelligence platform powered by modern LLMs. It features semantic search over private documents, streaming interactive responses, and automated multi-modal task execution with a snappy dark glassmorphism interface.",
      features: [
        "Real-time streaming responses with citation tracking",
        "Vector search integration with sub-second retrieval",
        "Encrypted local-first document parser and chunker",
        "Multi-tenant team collaboration workspaces"
      ],
      tags: ["TypeScript", "Next.js", "Python", "FastAPI", "Gemini API", "Pinecone"],
      liveUrl: "https://example.com/demo-ai",
      githubUrl: "https://github.com/example/ai-knowledge-copilot"
    },
    {
      id: "hyper-saas",
      title: "PulseFlow Analytics Engine",
      tagline: "Real-time user engagement telemetry and predictive retention modeling dashboard.",
      category: "Full-Stack",
      featured: true,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      description: "A high-throughput observability platform designed for engineering and growth teams. Captures millions of frontend events, generates instant heatmaps, and predicts user drop-off using lightweight anomaly detection algorithms.",
      features: [
        "Processes over 15,000 events/sec with zero latency degradation",
        "Custom interactive WebGL charting and funnel visualizations",
        "Automated Slack & Discord webhook alerting system",
        "Role-based access control (RBAC) with audit logs"
      ],
      tags: ["React", "Node.js", "PostgreSQL", "Redis", "TimescaleDB", "Tailwind CSS"],
      liveUrl: "https://example.com/demo-analytics",
      githubUrl: "https://github.com/example/pulseflow-analytics"
    },
    {
      id: "nexus-commerce",
      title: "Aura Minimalist E-Commerce",
      tagline: "Headless 3D e-commerce storefront with instantaneous page transitions and cart sync.",
      category: "Web Apps",
      featured: true,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      description: "A bespoke modern shopping experience built for direct-to-consumer luxury brands. Leverages micro-animations, headless Shopify Storefront API, and Stripe Checkout for seamless, frictionless customer conversion.",
      features: [
        "Sub-100ms page transitions with optimistic UI state updates",
        "Interactive 3D product showcase powered by Three.js",
        "Complete localized currency and tax calculation engine",
        "Seamless Stripe Payment Sheet integration"
      ],
      tags: ["Next.js 14", "Tailwind CSS", "Shopify API", "Stripe", "Three.js"],
      liveUrl: "https://example.com/demo-ecommerce",
      githubUrl: "https://github.com/example/aura-storefront"
    },
    {
      id: "mobile-finance",
      title: "Zenith Crypto & Portfolio Tracker",
      tagline: "Decentralized asset management suite with zero-latency price tickers.",
      category: "Mobile & Web",
      featured: false,
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1000&q=80",
      description: "A cross-platform financial tracking dashboard connecting Web2 investment accounts and Web3 wallets in a single unified privacy-focused dashboard.",
      features: [
        "Live WebSocket feeds with sub-50ms price updates",
        "Local-only biometric encryption for wallet addresses",
        "Automated tax-loss harvesting calculations and PDF reports"
      ],
      tags: ["React Native", "TypeScript", "WebSockets", "Ethers.js", "Chart.js"],
      liveUrl: "https://example.com/demo-finance",
      githubUrl: "https://github.com/example/zenith-finance"
    },
    {
      id: "dev-toolkit",
      title: "DevSprint CLI & Extension",
      tagline: "Developer productivity tool for automated PR summaries and test scaffolding.",
      category: "Tools & DevOps",
      featured: false,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      description: "An open-source CLI and VS Code extension that analyzes local Git diffs to draft human-readable conventional commits, generate unit test skeletons, and flag potential memory leaks.",
      features: [
        "Zero configuration plug-and-play CLI binary",
        "Integrates directly with Git pre-commit hooks",
        "Over 5,000 active monthly installations"
      ],
      tags: ["Node.js", "TypeScript", "Rust", "VS Code API", "GitHub Actions"],
      liveUrl: "https://example.com/demo-tools",
      githubUrl: "https://github.com/example/devsprint-cli"
    }
  ],

  experience: [
    {
      period: "2023 — Present",
      role: "Senior Full-Stack Engineer",
      company: "Apex Tech Labs",
      description: "Leading frontend and backend architecture for AI-powered SaaS products. Mentored 5 junior engineers and boosted application load performance by 45% across all core platforms."
    },
    {
      period: "2021 — 2023",
      role: "Software Engineer",
      company: "Vanguard Digital",
      description: "Built scalable microservices and customer-facing web apps with React and Node.js. Designed automated CI/CD deployment pipelines reducing release turnaround from days to hours."
    },
    {
      period: "2019 — 2021",
      role: "Frontend Developer",
      company: "PixelCraft Media",
      description: "Developed interactive, accessible, and responsive user interfaces for global enterprise brands. Standardized company-wide component library and design system."
    }
  ]
};
