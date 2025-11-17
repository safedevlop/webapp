# Fleet Monitoring Dashboard

A modern web application for monitoring and managing fleet vehicles and their maintenance schedules with real-time database integration.

## Features

- **User Authentication** - Secure login/signup with Supabase
- **Vehicle Management** - Track fleet vehicles with status monitoring
- **Service Records** - Complete maintenance history and scheduling
- **Real-time Dashboard** - Live metrics and data visualization
- **Status Management** - Update service status directly in tables
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React.js, Vite, React Router
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Custom CSS with organized architecture
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd webproject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

Run the SQL files in your Supabase dashboard:
1. `supabase-schema.sql` - Main database schema
2. `add-update-policy.sql` - RLS policy for updates

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Docker Deployment

```bash
docker build -t fleet-dashboard .
docker run -p 80:80 fleet-dashboard
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── contexts/      # React contexts
├── lib/          # Utility libraries
├── css/          # Organized CSS files
└── data/         # Static fallback data
```

## License

MIT License