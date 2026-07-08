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
    title: "AWS Certified Cloud Practitioner",
    description: "Foundational cloud concepts, AWS services, security, and architecture best practices.",
    image: "/images/certifications/aws-ccp.jpg", // TODO: replace with your certificate scan
  },
  {
    id: 2,
    title: "Meta Front-End Developer",
    description: "Professional front-end development with React, JavaScript, and UI/UX design principles.",
    image: "/images/certifications/meta-frontend.jpg",
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
