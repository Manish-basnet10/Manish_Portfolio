// ============================================================
// DATA FILE: projectsData.js
// Edit these entries to update your Projects section.
// Fields:
//   id           — unique key
//   name         — project title (shown as card heading)
//   description  — 2–3 sentence description
//   image        — path under /public (e.g. "/images/projects/myapp.jpg")
//   liveDemoLink — URL to the live demo (or "#" placeholder)
//   githubLink   — URL to the GitHub repo (or "#" placeholder)
// ============================================================

const projectsData = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description:
      "A full-featured e-commerce web app with product catalogue, cart, Stripe payments, and an admin dashboard. Built with React, Node.js, MongoDB, and deployed on AWS.",
    image: "/images/projects/ecommerce.jpg",
    liveDemoLink: "#", // TODO: replace with your live URL
    githubLink: "#",  // TODO: replace with your GitHub repo URL
  },
  {
    id: 2,
    name: "Task Management App",
    description:
      "A real-time collaborative task board (Kanban-style) with drag-and-drop, user authentication, WebSocket live updates, and team workspaces. Stack: Next.js, PostgreSQL, Prisma.",
    image: "/images/projects/taskmanager.jpg",
    liveDemoLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    name: "DevOps Dashboard",
    description:
      "An internal observability dashboard that aggregates logs, metrics, and deployment status from AWS CloudWatch and GitHub Actions. Built with React, Express, and Chart.js.",
    image: "/images/projects/devops.jpg",
    liveDemoLink: "#",
    githubLink: "#",
  },
  {
    id: 4,
    name: "AI Chat Assistant",
    description:
      "A conversational AI assistant powered by OpenAI GPT-4, with persistent conversation history, markdown rendering, and a clean chat UI. Stack: React, FastAPI, Redis.",
    image: "/images/projects/aichat.jpg",
    liveDemoLink: "#",
    githubLink: "#",
  },
];

export default projectsData;
