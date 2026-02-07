# Book-A-Yute PRD (Product Requirements Document)

## Overview
Book-A-Yute is a premium talent booking platform powered by Pytch Marketing LLC / Push-A-Yute.

## Problem Statement
Upgrade existing Book-A-Yute application from single-page dashboard layouts to proper multi-portal SaaS with:
- Left sidebar navigation with route-based sections
- AI-assisted workflows
- Cloud Run deployment readiness

## User Personas
1. **Talent (Roster Member)**: Artists/performers who need to manage profiles, view booking inquiries
2. **Admin (Agency Staff)**: Agency representatives who manage talents, leads, and analytics
3. **Booker (Public)**: Event organizers looking to book talent

## Core Requirements (Static)
- Supabase Auth with graceful fallback (demo mode if not configured)
- OpenAI integration via Emergent LLM key
- Route-based dashboard navigation
- AI Studio Suite for talents
- Lead management for admins
- Google Cloud Run deployment support

---

## What's Been Implemented

### Date: 2026-02-07

#### 1. Structural Fix (COMPLETE)
- ✅ Converted Talent Dashboard from single-page to proper SaaS navigation
- ✅ Converted Admin Dashboard from single-page to proper SaaS navigation  
- ✅ Left sidebar navigation with route-based sections
- ✅ Demo mode with quick access buttons

#### 2. Talent Portal Routes (COMPLETE)
- `/dashboard` - Overview with stats, agency info, recent requests
- `/dashboard/requests` - Booking requests inbox
- `/dashboard/profile` - Profile management (name, bio, genres, socials)
- `/dashboard/studio` - AI Studio Suite

#### 3. Admin Portal Routes (COMPLETE)
- `/admin` - Overview with stats, booking pipeline, AI insights
- `/admin/talents` - Talent management (approve/reject, tiers)
- `/admin/leads` - Lead management with AI analysis
- `/admin/analytics` - Performance analytics

#### 4. AI Features (COMPLETE)
**Talent AI Studio:**
- Session Recap Generator ✅
- AI Take Logger ✅
- Follow-Up Script Generator ✅
- Vocal Cleanup (Coming Soon placeholder)
- Reference Matcher (Coming Soon placeholder)
- Vocal Performance Coach (Coming Soon placeholder)

**Admin AI:**
- Lead Summary Generator ✅
- WhatsApp Follow-Up Generator ✅
- Weekly Insights Generator ✅

#### 5. Backend (COMPLETE)
- FastAPI server with AI endpoints
- Emergent LLM integration (GPT-5.2)
- Graceful fallback with stub responses
- Health check endpoint

#### 6. Database (COMPLETE)
- Initial schema migration
- Production schema with ai_notes table
- RLS policies

#### 7. Deployment (COMPLETE)
- Dockerfile for Cloud Run
- README with deployment instructions

---

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Structural dashboard fix
- [x] Route-based navigation
- [x] AI Studio implementation

### P1 (Important) - PENDING
- [ ] Real Supabase integration (when keys provided)
- [ ] File upload for media assets
- [ ] Email notifications for booking requests

### P2 (Nice to Have) - PENDING
- [ ] Vocal Cleanup AI feature
- [ ] Reference Matcher AI feature
- [ ] Vocal Performance Coach AI feature
- [ ] Multi-tenant support
- [ ] Payment integration (Stripe)

---

## Next Tasks
1. User to add Supabase credentials for production auth
2. User to configure Google Cloud Run deployment
3. Consider adding more credits to Emergent LLM key for full AI functionality
4. Implement Phase 2 AI features (audio processing)

---

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + Python
- **Auth/DB**: Supabase (optional - demo mode available)
- **AI**: OpenAI GPT-5.2 via Emergent LLM
- **Deployment**: Google Cloud Run
