-- Book-A-Yute Production Schema Enhancement
-- Migration: 20260207_production_schema.sql
-- Adds AI notes table and enhances existing schema

-- AI Notes table for storing AI-generated content
CREATE TABLE IF NOT EXISTS public.ai_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  talent_id uuid REFERENCES public.talents(id) ON DELETE SET NULL,
  lead_id uuid REFERENCES public.booking_requests(id) ON DELETE SET NULL,
  type text CHECK (type IN ('session_recap', 'take_log', 'follow_up', 'lead_summary', 'weekly_insight')) NOT NULL,
  input_data jsonb,
  output_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on ai_notes
ALTER TABLE public.ai_notes ENABLE ROW LEVEL SECURITY;

-- Policies for ai_notes
CREATE POLICY "Users can view own AI notes" ON public.ai_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own AI notes" ON public.ai_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins full access AI notes" ON public.ai_notes
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_notes_user_id ON public.ai_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_notes_talent_id ON public.ai_notes(talent_id);
CREATE INDEX IF NOT EXISTS idx_ai_notes_lead_id ON public.ai_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_ai_notes_type ON public.ai_notes(type);
CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON public.booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_talents_status ON public.talents(status);
CREATE INDEX IF NOT EXISTS idx_talents_featured ON public.talents(featured);

-- Add agent_notes column to booking_requests if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'booking_requests' AND column_name = 'agent_notes') THEN
    ALTER TABLE public.booking_requests ADD COLUMN agent_notes text;
  END IF;
END $$;

-- Add last_contacted column to booking_requests if not exists  
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'booking_requests' AND column_name = 'last_contacted') THEN
    ALTER TABLE public.booking_requests ADD COLUMN last_contacted timestamptz;
  END IF;
END $$;
