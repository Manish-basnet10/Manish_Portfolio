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
    name: "BloodBond: Life Saving Network",
    description:
      "A real-time platform connecting blood donors with hospitals. Built on the MERN stack, it features automated location-based donor matching, live inventory tracking, and urgent alerts.",
    image: "/images/projects/blood_donation.jpg",
    liveDemoLink: "https://blood-donation-ruddy-delta.vercel.app/", // TODO: replace with your live URL
    githubLink: "https://github.com/Manish-basnet10/Blood_Donation",  // TODO: replace with your GitHub repo URL
  },
  {
    id: 3,
    name: "FashionStore",
    description:
      "A complete fashion e-commerce platform built with the MERN stack. It features a seamless order flow, an integrated customer review system, and a comprehensive admin dashboard for store management.",
    image: "/images/projects/fashionstore.jpg",
    liveDemoLink: "https://e-commerce-clothing-store-frontend.vercel.app/",
    githubLink: "https://github.com/Manish-basnet10/fashionstore_mern_project",
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
