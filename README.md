# Productivity+

Productivity+ is a daily planning and reflection web app.

Create tasks with a **difficulty** and **priority** score, mark them complete, and see a **weighted productivity %** for the day. When the calendar day changes, today's tasks are archived into a **365-day heatmap** so you can track productivity over time.

It also includes an **Ideas** area where you can add ideas that come to mind and develop them.

## Features

- Tasks: add, edit, delete, and toggle completion
- Weighted daily productivity score (based on difficulty + priority)
- Automatic day rollover that saves a daily summary to history
- Yearly progress heatmap (last 365 days)
- Ideas: list ideas and add/delete text thoughts per idea
- Theme toggle

## Tech Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Material UI (MUI)

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Data Storage

Currently, there is no backend. All data is stored in your browser via `localStorage`:

- `tasks`
- `dailyHistory`
- `ideas`

Clearing site data in your browser will reset the app.
