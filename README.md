# My Portfolio

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

A modern, server-first portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. Features a complete CRUD system for managing projects with a clean, responsive interface.

## Features

- **Server-First Architecture** - Built with Next.js 15 App Router and Server Components
- **Full CRUD Operations** - Create, Read, Update, and Delete projects via Server Actions
- **Modern UI** - Clean, responsive design with Tailwind CSS 4
- **Dark Mode Support** - Automatic dark mode based on system preferences
- **SEO Friendly** - Server-side rendering for better search engine optimization
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Type-Safe** - Built with TypeScript for enhanced developer experience
- **Database Integration** - PostgreSQL database via Supabase
- **Tag System** - Organize projects with custom tags
- **Visibility Control** - Hide/show projects from public view
- **Image Support** - Add cover images to projects

## Table of Contents

- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Phase 2: Authentication](#phase-2-authentication)
- [Contributing](#contributing)
- [License](#license)

## Demo

**Public Portfolio View**: Browse all published projects  
**Admin Interface**: Manage projects with full CRUD capabilities

## Tech Stack

**Frontend:**

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript 5](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework

**Backend:**

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - Server-side mutations
- [Supabase](https://supabase.com/) - PostgreSQL database and authentication
- [Supabase SSR](https://supabase.com/docs/guides/auth/server-side/nextjs) - Server-side rendering support

**Development:**

- [ESLint](https://eslint.org/) - Code linting
- [PostCSS](https://postcss.org/) - CSS processing

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- A Supabase account (free tier available)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/docentDavid/my-portfolio.git
cd my-portfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)

   b. In the SQL Editor, run the following schema:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  tags TEXT[],
  cover_url TEXT,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for Phase 1 (open access)
CREATE POLICY "Allow all for now" ON projects
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under API.

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-portfolio/
├── app/
│   ├── actions/
│   │   └── projects.ts          # Server Actions for CRUD operations
│   ├── admin/
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx # Edit project page
│   │   │   └── new/
│   │   │       └── page.tsx     # Create project page
│   │   ├── layout.tsx           # Admin layout with navigation
│   │   └── page.tsx             # Admin dashboard
│   ├── project/
│   │   └── [slug]/
│   │       └── page.tsx         # Individual project page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── lib/
│   └── supabase/
│       ├── client.ts            # Supabase client for browser
│       └── server.ts            # Supabase client for server
├── public/                      # Static assets
├── .env.local                   # Environment variables (not committed)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Database Schema

### Projects Table

| Column      | Type        | Description                      |
| ----------- | ----------- | -------------------------------- |
| id          | UUID        | Primary key                      |
| slug        | TEXT        | URL-friendly identifier (unique) |
| title       | TEXT        | Project title                    |
| summary     | TEXT        | Short description                |
| content     | TEXT        | Full project description         |
| tags        | TEXT[]      | Array of tags                    |
| cover_url   | TEXT        | URL to cover image               |
| is_hidden   | BOOLEAN     | Visibility flag                  |
| order_index | INT         | Display order                    |
| created_at  | TIMESTAMPTZ | Creation timestamp               |
| updated_at  | TIMESTAMPTZ | Last update timestamp            |

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service Role Key (for admin operations in Phase 2)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Important:** Never commit `.env.local` to version control!

## Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Build
npm run build        # Build for production with Turbopack

# Production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Deployment

### Deploying to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Configure environment variables in Vercel:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy!

Vercel will automatically deploy on every push to your main branch.

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Next.js 15:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [DigitalOcean](https://www.digitalocean.com/)
- Self-hosted with Docker

## Phase 2: Authentication

Currently, the portfolio is in **Phase 1** with open CRUD access. Phase 2 will add:

- Email/password authentication via Supabase
- Protected admin routes
- Row Level Security policies
- Session management

### Implementing Phase 2

1. **Update RLS Policies**

```sql
-- Remove open policy
DROP POLICY "Allow all for now" ON projects;

-- Public can view non-hidden projects
CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT
  USING (is_hidden = false);

-- Authenticated users can see all projects
CREATE POLICY "Authenticated can view all projects" ON projects
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can manage projects
CREATE POLICY "Authenticated can create projects" ON projects
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can update projects" ON projects
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete projects" ON projects
  FOR DELETE
  USING (auth.uid() IS NOT NULL);
```

2. **Create Auth Helper**

Create `lib/supabase/auth.ts`:

```typescript
import { createServer } from "./server";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
```

3. **Protect Admin Routes**

Update `app/admin/layout.tsx`:

```typescript
import { requireAuth } from "@/lib/supabase/auth";

export default async function AdminLayout({ children }) {
  await requireAuth();
  // ... rest of layout
}
```

4. **Create Login Page**

Create `app/login/page.tsx` with Supabase authentication form.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**docentDavid**

- GitHub: [@docentDavid](https://github.com/docentDavid)

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel](https://vercel.com) for hosting

## Support

If you have any questions or run into issues, please:

1. Check the existing [Issues](https://github.com/docentDavid/my-portfolio/issues)
2. Create a new issue with detailed information
3. Check the documentation for Next.js, Supabase, and Tailwind CSS

---

Made with ❤️ by docentDavid
