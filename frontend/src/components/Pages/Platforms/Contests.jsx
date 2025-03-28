import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContestsWithLinks.css"; // Import the dark theme CSS

const ContestsWithLinks = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://clist.by/api/v2/contest/", {
          params: {
            username: "hsp12", // Replace with your Clist username
            api_key: "901f776b5275e09893757943d56916ca31b05580", // Replace with your Clist API key
            upcoming: "true",
            order_by: "start",
          },
        });

        setContests(response.data.objects);
        setLoading(false);
      } catch (err) {
        setError("Error fetching contests from Clist API");
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <div className="loading">Loading contests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Contests</h1>
      <div className="table-container">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Platform</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={index}>
                <td>{contest.event}</td>
                <td>{contest.resource.name}</td>
                <td>{new Date(contest.start).toLocaleString()}</td>
                <td>{Math.round(contest.duration / 3600)} hours</td>
                <td>
                  <a
                    href={contest.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Contest
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestsWithLinks;
