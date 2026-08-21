# Selezione

Selezione is a monorepo application designed to manage photo galleries and client selections for photographers.

## 🏗 Architecture

The project is structured as a monorepo containing the following workspaces:

- `/client`: The frontend application (Single Page Application).
- `/api`: The backend Node.js API (In Development).
- `/db`: Database schemas and migrations (In Development).

## 🛠 Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (CSS Modules / Custom Properties)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router (CSR)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Running the Frontend Locally (`/client`)

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The application will be available at `http://localhost:5173`.

### Running the Backend API (`/api`)

```bash
# Navigate to the api directory
cd api

# Install dependencies
npm install

# Copy the example environment file and configure your variables
cp .env.example .env

# Start the development server (uses node --watch)
npm run dev
```

### Database & Migrations

The database uses PostgreSQL (`pg`). Migrations are managed via the API workspace.

```bash
# From the /api directory, run migrations to setup your database
npm run db:migrate
```

## 📦 Deployment

### Vercel (Frontend)
The `/client` directory is optimized for deployment on Vercel. 
Since it is a Vite-based Single Page Application (SPA), a `vercel.json` file is included in the `client` directory to handle client-side routing. This ensures that all requests are rewritten to `index.html`, allowing React to handle 404s and dynamic routes correctly instead of Vercel returning a 404 error.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
