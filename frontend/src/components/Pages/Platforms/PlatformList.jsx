import React from "react";
import { Link } from "react-router-dom";

const platforms = [
  { id: 1, name: "LeetCode", path: "QuestionsPage" },
  { id: 2, name: "Codeforces", path: "CodeforcesAPI" },
  { id: 3, name: "Contests", path: "ContestsWithLinks" },
];

const PlatformList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Platforms</h1>
      <div style={styles.cardContainer}>
        {platforms.map((platform) => (
          <Link
            key={platform.id}
            to={`/platform/${platform.path}`}
            style={styles.cardLink} // Wrap the entire card
          >
            <div
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(145deg, #2a2a2a, #414141)";
                e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.6)";
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(145deg, #1c1c1c, #333333)";
                e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h2 style={styles.cardTitle}>{platform.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
    color: "#f5f5f5",
    marginBottom: "40px",
    fontWeight: "bold",
    textShadow: "0px 4px 12px rgba(0, 0, 0, 0.8)",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "80%",
  },
  card: {
    background: "linear-gradient(145deg, #1c1c1c, #333333)",
    borderRadius: "16px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
    cursor: "pointer",
    color: "#ffffff",
  },
  cardLink: {
    textDecoration: "none",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#f5f5f5",
    textShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
  },
};

export default PlatformList;
