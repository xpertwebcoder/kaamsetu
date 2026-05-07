-- Create workers table
CREATE TABLE public.workers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  whatsapp_number text,
  skill_category text not null,
  village text not null,
  city text,
  experience text,
  daily_rate text,
  availability_status text default 'Available',
  description text,
  is_verified boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create leads table
CREATE TABLE public.leads (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid references public.workers(id) on delete cascade,
  type text not null, -- 'call' or 'whatsapp'
  created_at timestamp with time zone default now()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policies for workers
CREATE POLICY "Public can view active workers" ON public.workers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can do all on workers" ON public.workers
  FOR ALL USING (auth.role() = 'authenticated');

-- Policies for leads
CREATE POLICY "Public can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all leads" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');
