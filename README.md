# Cybersecurity Portfolio

> React-based cybersecurity portfolio featuring an interactive log analysis tool.

## Live Demo

**[View Portfolio →](https://adrian106293.netlify.app/)**

## Features

- **Security Dashboard** — Overview page with stat cards, charts, and threat data visualizations (demo data)
- **Interactive Log Analyzer** — Paste or upload log files to detect brute-force attempts, SQL injection, and suspicious file access. View results in a table and export as CSV
- **Project Showcase** — Cards for each project with stats, tags, and in-browser PDF viewing
- **Skills Display** — Skill bars organized by category (security, technical, soft skills)
- **Incident Response Timeline** — Visual walkthrough of the NIST IR lifecycle from the Incident Handler's Journal project
- **About & Contact** — Profile, certifications, and contact links

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Recharts (charts)
- Framer Motion (animations)
- Lucide React (icons)
- React Router (routing)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Deployment

Deployed on Vercel. Push to `main` to auto-deploy.

## Projects Included

| Project | Description |
|---------|-------------|
| Security Audit | NIST-based mock audit for small business |
| Network Traffic Analysis | Packet capture analysis & incident report |
| Incident Handler's Journal | Full NIST IR lifecycle documentation |
| Log File Analyzer | Python tool detecting brute-force, SQLi, file access |
