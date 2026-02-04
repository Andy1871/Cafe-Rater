# Local Cafe & Coffee Rater — CURRENTLY WIP ☕️

A **Next.js cafe rating app** built for locals to discover, filter, and rate independent cafés in their area.  
Browse cafés by location and name, view detailed ratings per drink, and leave comments — all wrapped in a clean, responsive UI.

This project is actively under development and evolving feature-by-feature.

---

## Overview

Local Cafe & Coffee Rater is a frontend-focused project exploring **UI state management, filtering logic, modals, and client/server boundaries in Next.js**.

The app currently uses **static cafe data** to prototype features such as:
- multi-select filters
- animated modals
- per-drink star ratings
- dynamic route pages for individual cafés

Backend persistence and authentication are planned next.


![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-18181B?style=for-the-badge)

---

## Features

### Implemented
- **Cafe grid view** — browse all cafes at a glance
- **Multi-select filters**
  - Filter by **location**
  - Filter by **café name**
  - Filter by **rating**
- **Animated modal (Quick View) - WIP**
  - Accessible
  - Keyboard & click-outside support
  - Smooth open/close transitions
- **Dynamic café pages**
  - Individual routes per café using slug-based routing
- **Per-drink star ratings**
  - Flat White, Cappuccino, Americano, Espresso, Iced Latte
  - Interactive UI with immediate feedback including cafe rating updating immediately
- **Comments system (local state)**
  - Add new comments instantly (name, title not yet ready)
- **Dark mode toggle**
  - Persists theme preference in `localStorage`
- **Fully responsive design**
  - Mobile, tablet, and desktop friendly

---

### In Progress / Planned
- Persist ratings & comments (Supabase)
- User authentication
- Average rating recalculation & persistence
- Image uploads per café
- Edit / delete comments

---

## Tech Stack 

| Category     | Technology |
|--------------|------------|
| Framework    | Next.js 14 (App Router) |
| Language     | TypeScript |
| Styling      | Tailwind CSS, shadcn/ui |
| State        | React hooks |
| Routing      | Dynamic routes (`/cafes/[slug]`) |
| Deployment   | Vercel (planned) |
| Backend      | Supabase + Prisma (planned) |


---

## Getting Started (Local)

```bash
git clone https://github.com/your-username/local-cafe-rater.git
cd local-cafe-rater
npm install
npm run dev
```

---

## Images

**Home Page with Location Filtering - light mode**

<img width="1131" height="769" alt="Homepage with dropdown filter" src="https://github.com/user-attachments/assets/799b55fe-9080-4807-afc4-8582ea43ad98" />


**Cafe Page - dark mode**

<img width="902" height="1169" alt="Cafe page - dark mode" src="https://github.com/user-attachments/assets/cb7c48c8-fbf5-45e4-9d59-0424e33793cd" />







