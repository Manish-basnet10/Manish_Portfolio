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
      "A MERN-stack platform that connects blood donors with hospitals in real time. Features include automated location-based donor matching, live blood-bank inventory tracking, and instant urgent-need alerts.",
    image: "/images/projects/blood_donation.jpg",
    liveDemoLink: "https://blood-donation-ruddy-delta.vercel.app/",
    githubLink: "https://github.com/Manish-basnet10/Blood_Donation",
  },
  {
    id: 2,
    name: "FashionStore",
    description:
      "A full-featured fashion e-commerce app built on the MERN stack. Includes a smooth cart-to-checkout flow, an integrated customer review system, and a powerful admin dashboard for managing products and orders.",
    image: "/images/projects/fashionstore.jpg",
    liveDemoLink: "https://e-commerce-clothing-store-frontend.vercel.app/",
    githubLink: "https://github.com/Manish-basnet10/fashionstore_mern_project",
  },
  {
    id: 3,
    name: "Customer Churn Analysis",
    description:
      "An interactive Power BI dashboard that uncovers customer retention and attrition patterns. Combines multi-source data integration with dynamic visualizations and KPI metrics to pinpoint the key drivers behind churn.",
    image: "/images/projects/churn_analysis.jpg",
    liveDemoLink: "https://github.com/Manish-basnet10/Customer_Churn_Analysis",
    githubLink: "https://github.com/Manish-basnet10/Customer_Churn_Analysis",
  },
  {
    id: 4,
    name: "Parkinson's Disease Prediction",
    description:
      "A Python and Streamlit web app that predicts Parkinson's disease from biomedical voice data. Uses a trained Support Vector Machine model to analyze vocal measurements and deliver instant diagnostic predictions.",
    image: "/images/projects/parkinsons_prediction.jpg",
    liveDemoLink: "https://github.com/Manish-basnet10/Parkinson-s_Disease_Prediction",
    githubLink: "https://github.com/Manish-basnet10/Parkinson-s_Disease_Prediction",
  },
  {
    id: 5,
    name: "Farmer Cooperative System",
    description:
      "A Spring Boot backend system designed for agricultural cooperatives. Manages farmer registrations, tracks shared resources and equipment, and streamlines day-to-day cooperative operations through RESTful APIs.",
    image: "/images/projects/farmer_cooperative.jpg",
    liveDemoLink: "#",
    githubLink: "https://github.com/Manish-basnet10/farmer-cooperative-system",
  },
  {
    id: 7,
    name: "Spam Detection System",
    description:
      "An NLP-powered machine learning app that classifies text messages as spam or legitimate. Built with Python and Scikit-learn, it leverages TF-IDF vectorization and a trained classifier for high-accuracy filtering.",
    image: "/images/projects/spam_detection.jpg",
    liveDemoLink: "#",
    githubLink: "https://github.com/Manish-basnet10/SPAM_DETECTION_PROJECT",
  },
];

export default projectsData;
