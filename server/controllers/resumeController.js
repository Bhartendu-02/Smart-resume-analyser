const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.analyzeResume = async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  // Stronger, clear prompt
  const prompt = `
You are a career coach and resume expert.
Compare the resume and job description below:
1. Give a match score out of 100.
2. Highlight 3 key strengths in the resume.
3. Suggest 5 specific improvements to tailor the resume better to the job.
Make the tone helpful and clear.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o", // ✅ or "gpt-4" if preferred
      messages: [{ role: "user", content: prompt }],
    });

    const result = chatCompletion.choices[0].message.content;
    res.json({ result });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: err.message });
  }
};
