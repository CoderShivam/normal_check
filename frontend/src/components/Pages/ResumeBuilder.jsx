import React, { useState, useEffect } from "react";

const ResumeBuilder = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [userResume, setUserResume] = useState(null);

  const userId = "uniqueUserId123"; // Replace with the actual user ID (e.g., from auth)

  // Fetch user's resume on component mount
  useEffect(() => {
    const fetchUserResume = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-resume/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserResume(data.resumePath);
        } else {
          setUserResume(null); // No resume found for the user
        }
      } catch (error) {
        console.error("Error fetching user resume:", error);
      }
    };

    fetchUserResume();
  }, [userId]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId); // Attach userId to the request

    try {
      const response = await fetch("http://localhost:5000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadMessage("Resume uploaded successfully!");
        setUserResume(data.resumePath); // Update displayed resume
      } else {
        setUploadMessage("Failed to upload resume.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Error occurred while uploading the resume.");
    }
  };

  const handleOverleafRedirect = () => {
    window.open("https://www.overleaf.com", "_blank"); // Opens Overleaf in a new tab
  };

  return (
    <div className="resume-builder">
      <h1>Resume Builder</h1>
      <p>Upload your resume or use Overleaf to create a new one.</p>

      {/* Resume Upload Section */}
      <div className="upload-section">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          id="resume-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="resume-upload" className="upload-button">
          {uploadedFile ? "Change File" : "Upload Resume"}
        </label>
        {uploadedFile && (
          <p className="file-info">
            Uploaded File: <strong>{uploadedFile.name}</strong>
          </p>
        )}
        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
      </div>

      {/* Display User Resume */}
      {userResume && (
        <div className="resume-display">
          <h3>Your Uploaded Resume</h3>
          <a
            href={`http://localhost:5000/${userResume}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
      )}

      {/* Overleaf Redirect Section */}
      <div className="overleaf-section">
        <button onClick={handleOverleafRedirect} className="overleaf-button">
          Go to Overleaf
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;
