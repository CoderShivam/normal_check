import React, { useEffect, useState } from "react";
import axios from "axios";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Adzuna API configuration
    const fetchCompanies = async () => {
      const app_id = "cfbfabc7"; // Replace with your Adzuna app_id
      const app_key = "a700d05fe039b682970b7685a9494564"; // Replace with your Adzuna app_key

      try {
        const response = await axios.get(
          `https://api.adzuna.com/v1/api/jobs/us/search/1`, // Adzuna endpoint
          {
            params: {
              app_id: app_id,
              app_key: app_key,
              results_per_page: 10,
              what: "software engineer", // Job title filter
              where: "California", // Location filter
            },
          }
        );

        // Map the API response to extract companies/job data
        const jobs = response.data.results.map((job) => ({
          id: job.id,
          company: job.company.display_name,
          title: job.title,
          location: job.location.display_name,
        }));

        setCompanies(jobs);
      } catch (error) {
        console.error("Error fetching companies from Adzuna API:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Available Job Profiles</h1>
      <ul>
        {companies.map((job) => (
          <li key={job.id}>
            <strong>{job.company}</strong> - {job.title} ({job.location})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesPage;
