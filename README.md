<div align="center">

# 🚀 CareerPilot AI

### Your AI-powered co-pilot for resumes, interviews, and career decisions

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen?style=for-the-badge&logo=vercel)](https://careerpilot-ai-alpha.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)

[Live Demo](https://careerpilot-ai-alpha.vercel.app/) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure)

</div>

---

## 📖 Overview

**CareerPilot AI** is a full-stack AI career platform that helps job seekers build ATS-friendly resumes, prepare for interviews, write tailored cover letters, and make data-driven career decisions, all from one dashboard.

Instead of juggling separate tools, CareerPilot AI combines **AI personalization**, **industry intelligence**, and **end-to-end job preparation** in a single place.

## 🔗 Try It Live

👉 **[careerpilot-ai-alpha.vercel.app](https://careerpilot-ai-alpha.vercel.app/)**

Sign up, complete onboarding, and start building your resume, checking your ATS score, and practicing interviews.

---

> 📸 **Screenshots:** add images to a `/screenshots` folder and reference them here.
>
> `![Dashboard](./screenshots/dashboard.png)`

---

## ✨ Features

### 📄 Resume Builder & ATS Checker
- Build your resume with a guided, entry-based **resume builder**
- Calculate an **ATS compatibility score** against a job description
- Get **missing keyword** suggestions
- Generate **AI-written resume content** tailored to specific roles

### 🎯 Interview Preparation
- Personalized, role- and industry-specific **quizzes**
- **Mock interview** mode with results after each attempt
- AI-generated suggestions to improve your answers
- **Performance chart and stats** to track progress over time

### 📊 Industry Insights Dashboard
- Market trends and role insights for your industry
- AI-driven career recommendations
- Personalized after a short **onboarding** (industry, experience, skills)

### ✉️ AI Cover Letter Generator
- Job-specific cover letters in seconds
- Tone aligned with company culture and role expectations
- Save, list, preview, and revisit past cover letters

### 📌 Personalization
- Secure sign-up and sign-in
- Saved resumes, cover letters, quiz results, and insights in one account

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 13+ (App Router), React 18, Tailwind CSS, shadcn/ui |
| **Backend** | Node.js, Next.js Server Actions |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | Clerk |
| **Background Jobs** | Inngest |
| **AI** | Google Gemini API |
| **Deployment** | Vercel |

---

## 🏗 Architecture

```text
                    ┌──────────────► Clerk (auth)
                    │
User ──► Next.js (React UI) ──► Server Actions ──┬──► Prisma ──► PostgreSQL
                    │                            └──► Google Gemini API
                    │
                    └──► /api/inngest ──► Inngest (background jobs)
```

- **Server Actions** (`/actions`) hold the business logic: ATS, cover letters, dashboard insights, interview, resume, and user management
- **Prisma** provides type-safe database access
- **Clerk + middleware** protect private routes
- **Inngest** runs background jobs through the `/api/inngest` route
- **Gemini** powers resume content, ATS suggestions, interview prep, insights, and cover letters

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database
- A [Google Gemini API key](https://aistudio.google.com/)
- A [Clerk](https://clerk.com/) application

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Tausif289/careerpilot-ai.git
cd careerpilot-ai

# 2. Install dependencies
npm install

# 3. Create a .env file (see Environment Variables below)

# 4. Generate the Prisma client and run migrations
npx prisma generate
npx prisma migrate dev

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To run background jobs locally, start the Inngest dev server in a second terminal:

```bash
npx inngest-cli@latest dev
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# AI
GEMINI_API_KEY="your_gemini_api_key"

# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

---

## 📁 Project Structure

```text
careerpilot-ai/
├── actions/                 # Server Actions
│   ├── ats.js               #   ATS score and keyword analysis
│   ├── cover-letter.js      #   Cover letter generation and storage
│   ├── dashboard.js         #   Industry insights
│   ├── interview.js         #   Quiz and mock interview logic
│   ├── resume.js            #   Resume saving and AI improvements
│   └── user.js              #   User and onboarding data
├── app/
│   ├── (auth)/              # Sign-in and sign-up (Clerk)
│   ├── (main)/
│   │   ├── ai-cover-letter/ # Generate, list, and preview cover letters
│   │   ├── ats-checker/     # ATS checker page
│   │   ├── dashboard/       # Industry insights dashboard
│   │   ├── interview/       # Quizzes, mock interview, performance stats
│   │   ├── onboarding/      # First-time profile setup
│   │   └── resume/          # Resume builder
│   ├── api/inngest/         # Inngest endpoint
│   └── lib/                 # Validation schemas and helpers
├── components/              # Shared components (header, hero, footer)
│   └── ui/                  #   shadcn/ui components
├── data/                    # Static content (FAQs, features, industries)
├── hooks/                   # Custom hooks (use-fetch)
├── lib/                     # Prisma client, Inngest, user check, utils
├── prisma/                  # Prisma schema and migrations
├── public/                  # Static assets
└── middleware.js            # Route protection
```

---

## ⚡ Impact

- ⏱️ Reduces manual effort in tailoring resumes to each job
- ✅ Improves chances of passing ATS screening
- 🎓 Delivers personalized career guidance at scale

---

## 🧠 What I Learned

- Building and shipping an **AI-powered SaaS** application
- Integrating **LLM APIs** for real-world use cases
- Adding **authentication** and protected routes with Clerk
- Running **background jobs** with Inngest
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
- [ ] Smarter mock interviews with scoring
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
