# KaamSetu

KaamSetu is a local workforce and service platform that connects users with trusted workers like electricians, plumbers, labourers, drivers, and other skilled professionals across India through a simple and mobile-friendly experience.

A rural local worker connection platform where people can find nearby workers like labour, electrician, plumber, mason, painter, driver, tractor/trolley, farm worker, etc.

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS v4
- Supabase (PostgreSQL, Auth)
- Lucide React (Icons)

## Setup Instructions

### 1. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com).
2. Go to **SQL Editor** and run the query provided in `schema.sql`.
3. Go to **Authentication -> Users** and create an admin account (Email & Password) for accessing the admin dashboard.
4. (Optional) In **Authentication -> Policies**, verify the RLS policies are set correctly so public users can only read active workers, but admin can manage.

### 2. Local Environment Setup
1. Clone or open the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Add the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Vercel will automatically build and deploy your Next.js application.

## Features Built
- **Public Home Page:** Clean hero section, search bar, and category cards.
- **Worker Listing:** Filter by category, search, and village.
- **Worker Profiles:** View details and contact directly via Call or WhatsApp.
- **Lead Tracking:** Clicks on Call/WhatsApp are tracked in the database.
- **Admin Dashboard:** Secure login, stats overview, and worker management (Add/Edit/Delete/Verify/Activate).
