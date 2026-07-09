// ============================================================
// DATA FILE: certificationsData.js
// Edit these entries to update your Certificate Gallery page.
// Fields:
//   id          — unique key
//   title       — certificate name (overlaid on the image)
//   description — one-line description of what it certifies
//   image       — path under /public (e.g. "/images/certifications/aws-ccp.jpg")
//                 Recommended: 4:3 or 16:9 ratio JPEG/PNG scans
// ============================================================

const certificationsData = [
  {
    id: 1,
    title: "SQL (Intermediate)",
    description: "Intermediate data manipulation and querying.",
    image: "/images/certifications/sq.jpg",
  },
  {
    id: 2,
    title: "Data Fundamentals",
    description: "Core concepts of data analysis.",
    image: "/images/certifications/data fundamental.jpg",
  },
  {
    id: 3,
    title: "Google Data Analytics",
    description: "Data analysis, SQL, Tableau, R programming, and data-driven decision making.",
    image: "/images/certifications/google-data.jpg",
  },
  {
    id: 4,
    title: "Docker Certified Associate",
    description: "Container orchestration, Docker Compose, Swarm, and production deployment strategies.",
    image: "/images/certifications/docker.jpg",
  },
];

export default certificationsData;
