import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CodeforcesAPI.css"; // Import custom CSS

const CodeforcesAPI = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Codeforces problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://codeforces.com/api/problemset.problems"
        );
        setProblems(response.data.result.problems.slice(0, 20)); // Fetch first 20 problems
        setLoading(false);
      } catch (err) {
        setError("Error fetching data from Codeforces API");
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div className="loading">Loading problems...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Codeforces Problems</h1>
      <div className="table-container">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index}>
                <td>{problem.index}</td>
                <td>
                  <a
                    href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {problem.name}
                  </a>
                </td>
                <td>{problem.rating ? problem.rating : "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeforcesAPI;
