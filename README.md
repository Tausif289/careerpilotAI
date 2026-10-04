<div align="center">

# 🚀 CareerPilot AI

### Your AI-powered co-pilot for resumes, interviews, and career decisions

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen?style=for-the-badge&logo=vercel)](https://careerpilot-ai-alpha.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)

[Live Demo](https://careerpilot-ai-alpha.vercel.app/) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started)

</div>

---

## 📖 Overview

**CareerPilot AI** is a full-stack AI career platform that helps job seekers build ATS-friendly resumes, prepare for interviews, write tailored cover letters, and make data-driven career decisions — all from one dashboard.

Instead of juggling separate tools, CareerPilot AI combines **AI personalization**, **industry intelligence**, and **end-to-end job preparation** in a single place.

## 🔗 Try It Live

👉 **[careerpilot-ai-alpha.vercel.app](https://careerpilot-ai-alpha.vercel.app/)**

Sign up, upload your resume, and get your ATS score, interview prep, and cover letter in minutes.

---

> 📸 **Screenshots:** add images to a `/screenshots` folder and reference them here.
>
> `![Dashboard](./screenshots/dashboard.png)`

---

## ✨ Features

### 📄 Resume & ATS Optimization
- Calculates an **ATS compatibility score** for your resume
- Suggests **missing keywords** based on the target job description
- Generates **AI-written resume content** tailored to specific roles

### 🎯 Interview Preparation
- Personalized, role-specific interview questions
- AI-generated suggestions to improve your answers
- Industry-specific preparation guidance

### 📊 Industry Insights
- Market trends and role insights
- AI-driven career recommendations

### ✉️ Cover Letter Generator
- Job-specific cover letters in seconds
- Tone aligned with company culture and role expectations

### 📌 Dashboard & Personalization
- Track job applications and resumes
- Save insights and preparation material
- Centralized career management

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 13+, React 18, Tailwind CSS |
| **Backend** | Node.js, Next.js Server Actions |
| **Database** | PostgreSQL with Prisma ORM |
| **AI** | Google Gemini API |
| **Deployment** | Vercel |

---

## 🏗 Architecture

```text
User ──► Next.js (React UI) ──► Server Actions ──┬──► Prisma ──► PostgreSQL
                                                 └──► Google Gemini API
```

- **Server Actions** handle business logic without a separate API layer
- **Prisma** provides type-safe database access
- **Gemini** powers resume content, ATS suggestions, interview prep, insights, and cover letters

---

## ⚡ Impact

- ⏱️ Reduces manual effort in tailoring resumes to each job
- ✅ Improves chances of passing ATS screening
- 🎓 Delivers personalized career guidance at scale

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database
- A [Google Gemini API key](https://aistudio.google.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Tausif289/careerpilot-ai.git
cd careerpilot-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
# create a .env file (see Environment Variables below)

# 4. Run database migrations
npx prisma migrate dev

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
GEMINI_API_KEY="your_gemini_api_key"
```

> Add any other keys your project uses (e.g., authentication provider keys).

---

## 📁 Project Structure

```text
careerpilot-ai/
├── actions/          # Server Actions (AI + database logic)
├── app/              # Next.js routes, pages, and layouts
├── components/       # Reusable UI components
├── data/             # Static data used across the app
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
├── middleware.js     # Route middleware
├── components.json   # UI component configuration
├── next.config.mjs   # Next.js configuration
└── package.json
```

---

## 🧠 What I Learned

- Building and shipping an **AI-powered SaaS** application
- Integrating **LLM APIs** for real-world use cases
- Designing a **scalable full-stack architecture** with Next.js and Prisma
- Improving UX through **personalization**

---

## 🌟 Why This Project Stands Out

CareerPilot AI goes beyond basic resume tools by combining:

- 🤖 **AI personalization**
- 📈 **Industry intelligence**
- 🧭 **End-to-end job preparation**

It's a complete career growth platform, not just a resume checker.

---

## 🗺 Roadmap

- [ ] Resume export to PDF
- [ ] Mock interview mode with scoring
- [ ] Job application reminders

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 📬 Contact

Built by **Your Name** · [LinkedIn](https://linkedin.com/in/your-profile) · [GitHub](https://github.com/Tausif289)

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

</div>
