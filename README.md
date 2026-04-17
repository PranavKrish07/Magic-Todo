# Magic Todo

A full-stack task management app with AI-powered suggestions, built with Django REST Framework and React.

🔗 **Live Demo**: [frontend](https://magic-todo-rouge.vercel.app) [backend](https://magic-todo-rouge.vercel.app)


---

## What it does

Magic Todo goes beyond a basic to-do list — tasks can be prioritized, categorized, and managed through a clean React frontend that communicates with a Django REST API backend. Designed with a decoupled architecture to mirror real-world production setups.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, JavaScript, CSS |
| Backend | Django, Django REST Framework |
| Deployment | Vercel (frontend) · Render (backend) |

## Features

- Create, update, and delete tasks via REST API
- Responsive React UI with real-time state updates
- JWT / session-based authentication
- Decoupled frontend-backend architecture
- Production deployment with CORS configured

## Local Setup

```bash
# Backend
git clone https://github.com/PranavKrish07/Magic-Todo.git
cd Magic-Todo
pip install -r requirements.txt

# Create .env with your SECRET_KEY and DB settings
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
```

## Author

**Pranav Krishna** — [GitHub](https://github.com/PranavKrish07)
