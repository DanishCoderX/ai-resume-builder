# ✨ AI Resume Builder

> An AI-powered resume builder that helps job seekers create professional, ATS-optimized resumes in minutes.

**🌐 Live Demo:** [ats-ai-resume-builder.netlify.app](https://ats-ai-resume-builder.netlify.app)

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq-AI-f55036?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)


---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **6 Pro Templates** | Executive, Creative, Corporate, Modern, Classic, Minimal |
| 🤖 **AI Summary** | Groq AI rewrites your summary to be compelling and ATS-friendly |
| ⚡ **AI Bullets** | Converts job descriptions into strong action-point bullet points |
| 💡 **AI Skills** | Suggests relevant technical skills based on your job title |
| ✨ **Polish Resume** | One-click AI enhancement of your entire resume at once |
| 🎯 **ATS Scoring** | Scores your resume out of 100 with strengths and improvements |
| 📷 **Photo Upload** | Add a professional photo to your resume |
| 🔗 **Contact Section** | Portfolio, LinkedIn, GitHub, Twitter, WhatsApp, custom links |
| 🖨️ **PDF Export** | Download a print-ready PDF instantly |
| 📱 **Responsive** | Works perfectly on desktop and mobile |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + React Router v6
- Tailwind CSS 3 (custom design system)
- react-to-print (PDF generation)
- react-toastify, Axios

**Backend**
- Node.js + Express.js
- Groq AI SDK (llama-3.3-70b-versatile)
- CORS configured for production

---

## 📁 Project Structure

```
ai-resume-builder/
├── server/
│   ├── server.js
│   ├── controllers/
│   │   ├── aiController.js        # Groq AI — enhance, bullets, skills, ATS
│   │   └── pdfController.js       # PDF generation
│   └── routes/
│       ├── ai.js
│       └── pdf.js
└── client/
    └── src/
        ├── components/
        │   ├── StepWizard.jsx      # 7-step guided form
        │   ├── ResumePreview.jsx   # Live preview + template switcher
        │   ├── PolishResume.jsx    # One-click AI enhancement modal
        │   └── steps/             # PersonalInfo, Education, Skills,
        │                          # Projects, Experience, Certifications, Contact
        ├── templates/             # Executive, Creative, Corporate,
        │                          # Modern, Classic, Minimal
        ├── context/
        │   └── ResumeContext.jsx  # Global resume state
        └── pages/
            ├── Home.jsx           # Landing page
            └── Builder.jsx        # Split-screen builder
```

---

## 🧙 Builder Wizard Steps

```
Step 1 → Personal Info    Name, title, email, photo, summary + AI enhance
Step 2 → Education        Institution, degree, year, GPA
Step 3 → Skills           Technical & soft skills + AI suggest
Step 4 → Projects         Name, description, tech stack, links    (optional)
Step 5 → Experience       Company, role, duration + AI bullets     (optional)
Step 6 → Certifications   Name, issuer, year                       (optional)
Step 7 → Contact          Portfolio, LinkedIn, GitHub, socials      (optional)
```

---

## 🤖 AI Features

| Endpoint | What it does |
|---|---|
| `POST /api/ai/enhance-summary` | Rewrites summary to be professional and ATS-friendly |
| `POST /api/ai/improve-bullets` | Converts job description to action-point bullets |
| `POST /api/ai/suggest-skills` | Suggests relevant skills based on job title |
| `POST /api/ai/ats-score` | Scores resume out of 100 with feedback |

---

## 🚀 Run Locally

### Prerequisites
- Node.js ≥ 18
- Groq API key — free at [console.groq.com](https://console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/DanishCoderX/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env
```

Fill in `.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5001
CLIENT_URL=http://localhost:3000
```

```bash
npm start
```

### 3. Frontend setup
```bash
cd client
npm install
npm start
```

App runs at `http://localhost:3000`

---

## ☁️ Deployment

| Service | Platform |
|---|---|
| Frontend | [Netlify](https://netlify.com) — set `REACT_APP_API_URL` env var |
| Backend | [Railway](https://railway.app) — set `GROQ_API_KEY` env var |

---

## 👤 Author

**Daanish Saeed**

[![GitHub](https://img.shields.io/badge/GitHub-DanishCoderX-181717?style=flat-square&logo=github)](https://github.com/DanishCoderX)
[![Email](https://img.shields.io/badge/Email-daanishsaeed593@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:daanishsaeed593@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-DanishCoderX.github.io-0A66C2?style=flat-square&logo=globe&logoColor=white)](https://DanishCoderX.github.io)

---

## 📄 License

MIT — feel free to use this project as inspiration for your own work.
