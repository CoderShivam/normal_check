import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/companies/${id}`)
      .then((response) => setCompany(response.data))
      .catch((error) => console.error("Error fetching company details:", error));
  }, [id]);

  if (!company) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>
        <strong>Industry:</strong> {company.industry}
      </p>
      <p>
        <strong>Location:</strong> {company.location}
      </p>
      <p>
        <strong>Description:</strong> {company.description}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {company.website}
        </a>
      </p>
    </div>
  );
};

export default CompanyDetails;
