import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/resume/analyze", {
      resumeText,
      jobDescription,
    });
    setResult(res.data.result);
  };

  return (
    <div className="app-container">
      <h1>Smart Resume Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste your resume text here"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          required
        />
        <textarea
          placeholder="Paste the job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div className="result-box">
          <h2>AI Feedback</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
