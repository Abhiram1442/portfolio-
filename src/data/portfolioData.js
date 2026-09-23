export const portfolioData = {
  personal: {
    name: "Kurva Abhiram Chandra",
    shortName: "Abhiram",
    title: "AI & Robotics Enthusiast | ECE Undergraduate",
    subtitle: "B.Tech ECE student at MLRIT passionate about building practical AI agents, autonomous robotics with ROS, and scalable cloud solutions.",
    bio: "I am an Electronics & Communication Engineering undergraduate at MLR Institute of Technology with a strong focus on Artificial Intelligence, robotics, and emerging technologies. Skilled in RAG, Machine Learning, Agentic AI, ROS, and AWS cloud ecosystems, I enjoy designing intelligent systems that bridge software intelligence with physical robotics and automation.",
    location: "Hyderabad, Telangana, India",
    email: "abhiabhiram8467@gmail.com",
    availability: "Open to AI/Robotics Projects & Opportunities",
    resumeUrl: "#contact",
    socials: {
      github: "https://github.com/Abhiram1442",
      linkedin: "https://www.linkedin.com/in/abhi-abhiram-5b692936b/",
      email: "mailto:abhiabhiram8467@gmail.com"
    }
  },

  stats: [
    { label: "Institution", value: "MLRIT" },
    { label: "Specialization", value: "ECE & AI" },
    { label: "Key Focus", value: "Agents & ROS" },
    { label: "Cloud Ecosystem", value: "AWS" }
  ],

  skillCategories: [
    {
      category: "Artificial Intelligence & ML",
      skills: [
        { name: "Agentic AI & AI Agents", level: "Specialist", icon: "🤖" },
        { name: "RAG (Retrieval-Augmented Gen)", level: "Advanced", icon: "📚" },
        { name: "Machine Learning Foundations", level: "Advanced", icon: "🧠" },
        { name: "Strands Agents SDK", level: "Advanced", icon: "⚡" },
        { name: "Claude & LLM Prompting", level: "Advanced", icon: "💡" }
      ]
    },
    {
      category: "Robotics & Embedded Systems",
      skills: [
        { name: "ROS (Robot Operating System)", level: "Advanced", icon: "🦾" },
        { name: "Robotics Kinematics & Control", level: "Intermediate", icon: "⚙️" },
        { name: "Automation & Sensor Systems", level: "Intermediate", icon: "📡" },
        { name: "Hardware-Software Integration", level: "Intermediate", icon: "🔌" }
      ]
    },
    {
      category: "Cloud, Languages & Tools",
      skills: [
        { name: "Python", level: "Expert", icon: "🐍" },
        { name: "Amazon Web Services (AWS)", level: "Advanced", icon: "☁️" },
        { name: "Amazon Bedrock", level: "Advanced", icon: "⛰️" },
        { name: "Java & JavaScript", level: "Intermediate", icon: "☕" },
        { name: "MySQL Database", level: "Intermediate", icon: "🐬" },
        { name: "Git & GitHub CI/CD", level: "Advanced", icon: "🐙" }
      ]
    }
  ],

  projects: [
    {
      id: "autonomous-incident-triage",
      title: "Autonomous Incident Triage Agent",
      tagline: "Intelligent autonomous agent powered by Amazon Bedrock and Strands Agents SDK for incident triage and automation.",
      category: "Agentic AI",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
      description: "An AI-powered autonomous agent system engineered for rapid incident diagnosis, triage, and workflow remediation. Utilizing Amazon Bedrock, Claude, and the Strands Agents SDK, the agent autonomously ingests incident telemetry, identifies root causes, and routes remediation actions without human delay.",
      features: [
        "Autonomous multi-step reasoning using the Strands Agents SDK",
        "Deep semantic incident log analysis powered by Claude & Bedrock",
        "Automated severity scoring and escalation ticket dispatching",
        "Seamless cloud integration across AWS serverless infrastructure"
      ],
      tags: ["Amazon Bedrock", "Claude", "Strands Agents SDK", "AWS", "Agentic AI", "Python"],
      liveUrl: "https://github.com/Abhiram1442",
      githubUrl: "https://github.com/Abhiram1442"
    },
    {
      id: "aws-cloud-ai",
      title: "AWS Cloud AI Architecture",
      tagline: "Scalable cloud-native AI pipeline built with Amazon Web Services for high-efficiency ML processing.",
      category: "Cloud & AI",
      featured: true,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      description: "An enterprise-ready cloud-based AI processing platform developed on AWS. Designed for seamless data ingestion, model orchestration, and automated inference with high availability and low latency.",
      features: [
        "Leverages AWS managed AI capabilities and Bedrock models",
        "Serverless microservices architecture for cost-efficient compute",
        "End-to-end security, encryption, and IAM role management",
        "Real-time logging and performance monitoring dashboards"
      ],
      tags: ["AWS", "Amazon Bedrock", "Cloud Computing", "Python", "Automation"],
      liveUrl: "https://github.com/Abhiram1442",
      githubUrl: "https://github.com/Abhiram1442"
    },
    {
      id: "ros-robotics-automation",
      title: "ROS Autonomous Robotics Suite",
      tagline: "Robot Operating System simulation and kinematic control algorithms for autonomous navigation.",
      category: "Robotics",
      featured: true,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
      description: "A robotics development project built on ROS (Robot Operating System). Focuses on node communication, sensor feedback loops, path planning, and simulated robot kinematics for autonomous navigation tasks.",
      features: [
        "Distributed ROS node architecture for real-time sensor processing",
        "Kinematic modeling and trajectory calculation for robotic actuators",
        "Simulation environment testing with obstacle avoidance algorithms",
        "Python and C++ script integration for low-latency control"
      ],
      tags: ["ROS", "Python", "Robotics", "Automation", "Sensor Fusion"],
      liveUrl: "https://github.com/Abhiram1442",
      githubUrl: "https://github.com/Abhiram1442"
    },
    {
      id: "rag-knowledge-engine",
      title: "RAG Semantic Intelligence Engine",
      tagline: "Retrieval-Augmented Generation system providing accurate contextual question answering over complex documents.",
      category: "AI & ML",
      featured: false,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
      description: "A high-precision RAG pipeline that transforms unstructured technical documentation into a searchable knowledge base. Combines vector embeddings with LLMs to eliminate hallucinations and deliver cited answers.",
      features: [
        "Automated PDF and technical document chunking and vectorization",
        "Context re-ranking for ultra-precise prompt synthesis",
        "Hallucination reduction with source paragraph citation",
        "Fast local and cloud vector store querying"
      ],
      tags: ["RAG", "Machine Learning", "Python", "Vector Search", "LLMs"],
      liveUrl: "https://github.com/Abhiram1442",
      githubUrl: "https://github.com/Abhiram1442"
    }
  ],

  experience: [
    {
      period: "Aug 2025 — May 2029",
      role: "B.Tech in Electronics & Communication Engineering",
      company: "MLR Institute of Technology, Hyderabad",
      description: "Pursuing undergraduate degree in ECE with extensive academic and hands-on focus on AI, Robotics, Embedded Systems, Machine Learning, and Cloud Computing. Actively engineering practical systems combining hardware and intelligent software."
    },
    {
      period: "2025 — Present",
      role: "AI & Robotics Developer & Hackathons",
      company: "Independent Projects & Innovation",
      description: "Architected the Autonomous Incident Triage Agent utilizing Amazon Bedrock, Claude, and Strands Agents SDK. Explored ROS for autonomous navigation, implemented RAG pipelines, and actively participated in tech innovation challenges."
    }
  ]
};
