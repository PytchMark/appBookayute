# Book-A-Yute

> Premium talent booking platform powered by Pytch Marketing LLC / Push-A-Yute.

## Overview

Book-A-Yute is a multi-portal SaaS application for managing talent bookings:

- **Public Storefront**: Browse and request talent bookings
- **Talent Portal**: Dashboard for roster members to manage profiles and view inquiries
- **Admin Portal**: Full agency management with AI-powered insights

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Auth & DB**: Supabase (optional - works in demo mode)
- **AI**: OpenAI GPT via Emergent LLM (optional - uses stubs if not configured)
- **Backend**: FastAPI (Python) for AI endpoints
- **Deployment**: Google Cloud Run

## Local Development

### Prerequisites

- Node.js 20+
- Python 3.11+
- Yarn

### Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd book-a-yute
```

2. Install frontend dependencies:
```bash
yarn install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/
cd ..
```

4. Configure environment variables (optional):

**Frontend** (`.env`):
```env
# Supabase (optional - app works in demo mode without these)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# AI Backend URL (optional - uses stub responses without)
VITE_API_URL=http://localhost:8001
```

**Backend** (`backend/.env`):
```env
# Required for AI features
EMERGENT_LLM_KEY=your-emergent-key
PORT=8001
```

5. Start development servers:

**Frontend:**
```bash
yarn dev
```

**Backend:**
```bash
cd backend
python server.py
```

### Demo Mode

The app works fully in demo mode without Supabase:
- Use any email to login as talent
- Use `admin@pushayute.com` for admin access
- Quick demo buttons available on login page

## Supabase Setup

1. Create a new Supabase project
2. Run the migrations:
```bash
# In Supabase SQL Editor, run:
# - supabase/migrations/20250124_initial_schema.sql
# - supabase/migrations/20260207_production_schema.sql
```
3. Configure Auth (Email/Password enabled)
4. Copy URL and anon key to `.env`

## AI Features

### Talent Portal (AI Studio)
- **Session Recap Generator**: Convert notes to structured summaries
- **Take Logger**: Transform session notes into take logs
- **Follow-Up Script Generator**: WhatsApp-ready messages

### Admin Portal
- **Lead Summary Generator**: AI analysis of booking leads
- **WhatsApp Follow-Up Suggestions**: Quick message generation
- **Weekly Insights**: AI-powered performance analysis

### AI Fallback Behavior

If the AI backend is unavailable or `EMERGENT_LLM_KEY` is not set:
- AI features return helpful stub responses
- UI remains fully functional
- Demo watermarks indicate mock data

## Google Cloud Run Deployment

### Build and Deploy

1. Build the Docker image:
```bash
docker build -t book-a-yute .
```

2. Tag for Google Container Registry:
```bash
docker tag book-a-yute gcr.io/[PROJECT_ID]/book-a-yute
```

3. Push to GCR:
```bash
docker push gcr.io/[PROJECT_ID]/book-a-yute
```

4. Deploy to Cloud Run:
```bash
gcloud run deploy book-a-yute \
  --image gcr.io/[PROJECT_ID]/book-a-yute \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="VITE_SUPABASE_URL=...,VITE_SUPABASE_ANON_KEY=..."
```

### Environment Variables for Cloud Run

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | No | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `VITE_API_URL` | No | AI backend URL |
| `EMERGENT_LLM_KEY` | No | For AI features |
| `PORT` | Auto | Set automatically by Cloud Run |

## Project Structure

```
/
├── App.tsx                 # Main app with routing
├── components/
│   ├── dashboard/          # Shared dashboard components
│   ├── Navigation.tsx      # Public nav
│   ├── Footer.tsx          # Public footer
│   └── TalentCard.tsx      # Talent display card
├── pages/
│   ├── dashboard/          # Talent portal pages
│   ├── admin/              # Admin portal pages
│   ├── HomePage.tsx        # Landing page
│   ├── RosterPage.tsx      # Public roster
│   ├── LoginPage.tsx       # Authentication
│   └── ...                 # Other public pages
├── lib/
│   ├── supabase.ts         # Supabase client with fallback
│   ├── store.ts            # Zustand auth store
│   └── ai.ts               # AI service with stubs
├── backend/
│   ├── server.py           # FastAPI AI endpoints
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Backend config
└── supabase/
    └── migrations/         # Database migrations
```

## UI Changes Made

- Converted dashboards from single-page scroll to proper SaaS navigation
- Added left sidebar navigation with route-based sections
- Implemented stat cards and data visualizations
- Added empty states with guidance
- Integrated AI Studio Suite with functional UI
- Added demo mode indicators and quick access buttons
- Enhanced login page with role-based demo access

## License

Proprietary - Pytch Marketing LLC
