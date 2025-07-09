const express = require("express");
const cors = require("cors");
require("dotenv").config(); // ✅ Must be before accessing process.env

const resumeRoutes = require("./routes/resumeroutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// console.log("OpenAI Key:", process.env.OPENAI_API_KEY);
