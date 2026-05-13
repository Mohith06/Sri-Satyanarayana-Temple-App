export type ProjectStatus = "ongoing" | "completed" | "upcoming";

export type CommunityProject = {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  description: string;
  impact: string;
  icon: string;
  color: string;
};

export const COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: "annadanam",
    title: "Annadanam — Free Food Service",
    category: "Food & Nourishment",
    status: "ongoing",
    description:
      "The temple provides free meals (Annadanam) to devotees and visitors every weekend. Annadanam — the gift of food — is considered one of the greatest acts of charity in Hindu tradition, as it nurtures both body and spirit.",
    impact: "Hundreds of meals served every weekend to devotees and community members.",
    icon: "restaurant-outline",
    color: "#E8833A",
  },
  {
    id: "education-scholarships",
    title: "Youth Education & Scholarships",
    category: "Education",
    status: "ongoing",
    description:
      "The temple supports local Hindu youth through educational outreach, cultural programs, and scholarship initiatives. Children's classes cover Hindu culture, Sanskrit basics, classical music, and classical dance to preserve heritage for the next generation.",
    impact: "Empowering the next generation of Hindu-Americans with cultural roots and academic excellence.",
    icon: "school-outline",
    color: "#2D7D46",
  },
  {
    id: "cultural-programs",
    title: "Cultural Festivals & Programs",
    category: "Culture & Arts",
    status: "ongoing",
    description:
      "The temple organizes annual cultural festivals celebrating major Hindu occasions including Navaratri, Diwali, Janmashtami, and Ugadi. These events feature classical music, Bharatanatyam dance performances, storytelling, and community competitions open to all.",
    impact: "Bringing the greater Houston community together to celebrate India's rich cultural heritage.",
    icon: "musical-notes-outline",
    color: "#7B6CF6",
  },
  {
    id: "build-your-temple",
    title: "Build Your Own Temple Program",
    category: "Community Outreach",
    status: "ongoing",
    description:
      "Sri Satyanarayana Temple of Greater Houston offers guidance and support to other Hindu communities across the US who wish to establish their own temples. Drawing on the experience of building SSTGH, the program shares knowledge on land acquisition, construction, deity installation, and temple governance.",
    impact: "Helping Hindu communities across the United States establish their own sacred spaces.",
    icon: "home-outline",
    color: "#D4AF37",
  },
  {
    id: "disaster-relief",
    title: "Disaster Relief & Community Aid",
    category: "Community Service",
    status: "ongoing",
    description:
      "The temple mobilizes volunteers and resources during natural disasters and community crises affecting the Greater Houston area. Past efforts have included Hurricane Harvey relief, food drives, and supply distribution to affected families regardless of religious background.",
    impact: "Standing with the Houston community in times of need — serving all people, not just devotees.",
    icon: "heart-outline",
    color: "#C2185B",
  },
  {
    id: "temple-expansion",
    title: "Temple Expansion & Development",
    category: "Infrastructure",
    status: "ongoing",
    description:
      "Following the historic Pradista (deity consecration) ceremony in February 2023, the temple continues to expand its facilities. Current projects include the Sai Baba shrine construction, improved parking, landscaping, and a dedicated community hall to host larger gatherings.",
    impact: "Growing our sacred space to serve the spiritual needs of an expanding community.",
    icon: "construct-outline",
    color: "#0078D4",
  },
];

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  upcoming: "Coming Soon",
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  ongoing: "#2D7D46",
  completed: "#6B6B6B",
  upcoming: "#E8833A",
};
