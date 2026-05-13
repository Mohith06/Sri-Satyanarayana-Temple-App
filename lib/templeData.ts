// Temple operating hours keyed by day of week (0 = Sunday)
export const TEMPLE_HOURS: Record<
  number,
  { open: string; close1: string; reopen: string; close2: string; label: string }
> = {
  0: { open: "8:00 AM", close1: "1:00 PM", reopen: "5:30 PM", close2: "9:00 PM", label: "Sunday" },
  1: { open: "10:00 AM", close1: "12:00 PM", reopen: "6:30 PM", close2: "8:30 PM", label: "Monday" },
  2: { open: "10:00 AM", close1: "12:00 PM", reopen: "6:30 PM", close2: "8:30 PM", label: "Tuesday" },
  3: { open: "10:00 AM", close1: "12:00 PM", reopen: "6:30 PM", close2: "8:30 PM", label: "Wednesday" },
  4: { open: "9:30 AM", close1: "12:00 PM", reopen: "5:30 PM", close2: "8:30 PM", label: "Thursday" },
  5: { open: "9:30 AM", close1: "12:00 PM", reopen: "5:30 PM", close2: "8:30 PM", label: "Friday" },
  6: { open: "8:00 AM", close1: "1:00 PM", reopen: "5:30 PM", close2: "9:00 PM", label: "Saturday" },
};

// Raw numeric hours for open/closed computation
export const TEMPLE_HOURS_RAW: Record<
  number,
  { open: number; close1: number; reopen: number; close2: number }
> = {
  0: { open: 8.0, close1: 13.0, reopen: 17.5, close2: 21.0 },
  1: { open: 10.0, close1: 12.0, reopen: 18.5, close2: 20.5 },
  2: { open: 10.0, close1: 12.0, reopen: 18.5, close2: 20.5 },
  3: { open: 10.0, close1: 12.0, reopen: 18.5, close2: 20.5 },
  4: { open: 9.5, close1: 12.0, reopen: 17.5, close2: 20.5 },
  5: { open: 9.5, close1: 12.0, reopen: 17.5, close2: 20.5 },
  6: { open: 8.0, close1: 13.0, reopen: 17.5, close2: 21.0 },
};

export type Service = {
  id: string;
  name: string;
  schedule: string;
  time: string;
  description: string;
};

export const SERVICES_LIST: Service[] = [
  {
    id: "daily-aarthi",
    name: "Daily Aarthi",
    schedule: "Every day",
    time: "11:00 AM · 11:30 AM · 7:00 PM · 8:00 PM",
    description:
      "Daily worship ceremonies with morning aarthi at 11:00 AM (Sai Baba) and 11:30 AM (Sri Satyanarayana), and evening aarthi at 7:00 PM (Sai Baba) and 8:00 PM (Sri Satyanarayana).",
  },
  {
    id: "satyanarayana-abhishekam",
    name: "Satyanarayana & Lakshmi Abhishekam",
    schedule: "Saturday",
    time: "10:00 AM",
    description:
      "Sacred ritual bathing of Sri Satyanarayana and Lakshmi deities with milk, honey, and other holy substances.",
  },
  {
    id: "hanuman-abhishekam",
    name: "Hanuman Abhishekam",
    schedule: "Sunday",
    time: "8:00 AM",
    description:
      "Weekly sacred bathing ritual dedicated to Lord Hanuman, performed with traditional Vedic ceremonies.",
  },
  {
    id: "ayyappan",
    name: "Ayyappan Abhishekam",
    schedule: "Saturday",
    time: "6:00 PM",
    description:
      "Weekly evening ritual dedicated to Lord Ayyappan, performed with traditional ceremonies.",
  },
  {
    id: "satyanarayana-puja",
    name: "Sri Satyanarayana Puja",
    schedule: "Full moon days & special occasions",
    time: "As scheduled",
    description:
      "Performed on Purnima (full moon) and special occasions like marriages, graduations, new jobs, and home purchases. Prasad can be mailed to your home.",
  },
  {
    id: "hanuman-chalisa",
    name: "Hanuman Chalisa",
    schedule: "Tuesday",
    time: "7:30 PM",
    description:
      "Weekly recitation of the Hanuman Chalisa, a devotional hymn dedicated to Lord Hanuman.",
  },
  {
    id: "vishnu-sahasranamam",
    name: "Vishnu Sahasranamam",
    schedule: "Wednesday",
    time: "7:30 PM",
    description:
      "Recitation of the thousand names of Lord Vishnu, a powerful and sacred prayer.",
  },
  {
    id: "lalitha-sahasranamam",
    name: "Lalitha Sahasranamam",
    schedule: "Friday",
    time: "7:30 PM",
    description:
      "Recitation of the thousand names of Goddess Lalitha, dedicated to the Divine Mother.",
  },
  {
    id: "sai-baba",
    name: "Sai Baba Ceremony",
    schedule: "Monthly (specific dates)",
    time: "As scheduled",
    description:
      "Special monthly ceremony dedicated to Shirdi Sai Baba, a revered saint venerated by millions.",
  },
];

export type DonateCampaign = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const DONATE_CAMPAIGNS: DonateCampaign[] = [
  {
    id: "general",
    title: "General Donation",
    description:
      "Support the temple's daily operations, maintenance, and spiritual programs.",
    icon: "heart",
  },
  {
    id: "bhoomi",
    title: "Bhoomi Danam",
    description:
      "Sacred land donation sponsorship to support the temple's expansion and future development.",
    icon: "earth",
  },
  {
    id: "monthly",
    title: "Monthly Sponsorship",
    description:
      "Become a monthly sponsor and support ongoing puja activities and community programs.",
    icon: "calendar",
  },
  {
    id: "sai-brick",
    title: "Sai Baba Brick Donation",
    description:
      "Contribute a symbolic brick toward the Sai Baba shrine construction campaign.",
    icon: "business",
  },
];

export const VOLUNTEER_INTERESTS = [
  "Cooking / Prasad Preparation",
  "Event Setup & Cleanup",
  "Cultural Programs",
  "Children's Education",
  "Website & Social Media",
  "Music & Devotional Singing",
  "Outreach & Community Service",
  "General Volunteering",
];

export type ManagementMember = {
  name: string;
  role: string;
  group: "trustees" | "directors" | "executive";
};

export const MANAGEMENT_TEAM: ManagementMember[] = [
  { name: "Krishna Bhat", role: "Chairperson", group: "trustees" },
  { name: "Ranjisha Bhat", role: "Vice Chairperson", group: "trustees" },
  { name: "Manickam Bhat", role: "Trustee", group: "trustees" },
  { name: "Sharath Bhat", role: "Trustee", group: "trustees" },
  { name: "Kiran Bhat", role: "Trustee", group: "trustees" },
  { name: "Sudhakar Manoharan", role: "President", group: "directors" },
  { name: "Raj Venkatachalam", role: "Vice President", group: "directors" },
  { name: "Sunil Kumar", role: "Executive Director", group: "directors" },
  { name: "Suchi Karthik", role: "Secretary", group: "directors" },
  { name: "Bindu Raghu", role: "Treasurer", group: "directors" },
  { name: "Venkatraman Lakshmanan", role: "Religious", group: "directors" },
  { name: "Kiran Racha", role: "CEO", group: "directors" },
  { name: "Hari Gampa", role: "Outreach", group: "directors" },
  { name: "Aruna Bashyam", role: "Food", group: "executive" },
  { name: "Jisha Iyer", role: "Religious", group: "executive" },
  { name: "Megna Gopu", role: "Cultural", group: "executive" },
  { name: "Parthiban Ravikumar", role: "Education", group: "executive" },
  { name: "Vasugy V Louis", role: "Program Manager", group: "executive" },
  { name: "Karthik Sankaran", role: "Assistant Treasurer", group: "executive" },
  { name: "Venkanna", role: "Operations", group: "executive" },
  { name: "Sushil Swarnapuri", role: "Digital Officer", group: "executive" },
];

export const EVENT_TYPE_COLORS: Record<string, string> = {
  puja: "#E8833A",
  festival: "#D4AF37",
  special: "#8B1A1A",
  class: "#2D7D46",
  default: "#6B6B6B",
};

export const EVENT_TYPE_LABELS: Record<string, string> = {
  puja: "Puja",
  festival: "Festival",
  special: "Special",
  class: "Class",
};
