const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chat = async (prompt) => {
  const res = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1024,
    temperature: 0.7,
  });
  return res.choices[0].message.content.trim();
};

// POST /api/ai/enhance-summary
const enhanceSummary = async (req, res) => {
  const { summary, jobTitle, skills } = req.body;
  if (!summary) return res.status(400).json({ message: 'Summary is required' });

  try {
    const prompt = `You are a professional resume writer. Rewrite the following professional summary for a ${jobTitle || 'professional'} to make it more compelling, concise, and ATS-friendly. Keep it to 3-4 sentences. Only return the improved summary, nothing else.

Summary: ${summary}
${skills?.length ? `Skills: ${skills.join(', ')}` : ''}`;

    const enhanced = await chat(prompt);
    res.json({ enhanced });
  } catch (err) {
    console.error('AI enhance error:', err);
    res.status(500).json({ message: 'AI error', error: err.message });
  }
};

// POST /api/ai/improve-bullets
const improveBullets = async (req, res) => {
  const { description, role, company } = req.body;
  if (!description) return res.status(400).json({ message: 'Description is required' });

  try {
    const prompt = `You are a professional resume writer. Convert the following job description into 3-4 strong, quantified resume bullet points using action verbs. Each bullet should start with a strong action verb and highlight impact where possible. Return ONLY the bullet points, one per line, starting with "•". Nothing else.

Role: ${role || 'Professional'}
Company: ${company || ''}
Description: ${description}`;

    const improved = await chat(prompt);
    const bullets = improved.split('\n').filter((b) => b.trim().startsWith('•')).map((b) => b.trim());
    res.json({ bullets });
  } catch (err) {
    res.status(500).json({ message: 'AI error', error: err.message });
  }
};

// POST /api/ai/suggest-skills
const suggestSkills = async (req, res) => {
  const { jobTitle, currentSkills } = req.body;
  if (!jobTitle) return res.status(400).json({ message: 'Job title is required' });

  try {
    const prompt = `You are a career advisor. Suggest 8-10 relevant technical skills for a ${jobTitle}. 
${currentSkills?.length ? `They already have: ${currentSkills.join(', ')}. Suggest different ones.` : ''}
Return ONLY a JSON array of skill strings. Example: ["React", "Node.js", "MongoDB"]. Nothing else.`;

    const raw = await chat(prompt);
    const clean = raw.replace(/```json|```/g, '').trim();
    const skills = JSON.parse(clean);
    res.json({ skills });
  } catch (err) {
    res.status(500).json({ message: 'AI error', error: err.message });
  }
};

// POST /api/ai/ats-score
const atsScore = async (req, res) => {
  const { resumeData } = req.body;
  if (!resumeData) return res.status(400).json({ message: 'Resume data is required' });

  try {
    const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume and give:
1. An ATS score out of 100
2. Top 3 strengths
3. Top 3 improvements

Resume data:
Name: ${resumeData.personalInfo?.name}
Title: ${resumeData.personalInfo?.title}
Summary: ${resumeData.personalInfo?.summary}
Skills: ${resumeData.skills?.technical?.join(', ')}
Experience: ${resumeData.experience?.map((e) => e.role + ' at ' + e.company).join(', ')}
Education: ${resumeData.education?.map((e) => e.degree + ' from ' + e.institution).join(', ')}
Projects: ${resumeData.projects?.map((p) => p.name).join(', ')}

Return ONLY a JSON object like:
{
  "score": 85,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"]
}`;

    const raw = await chat(prompt);
    const clean = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'AI error', error: err.message });
  }
};

module.exports = { enhanceSummary, improveBullets, suggestSkills, atsScore };