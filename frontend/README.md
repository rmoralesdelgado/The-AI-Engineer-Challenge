# Supportive Mental Coach — Frontend

A simple chat interface for the supportive mental coach API. Built with Next.js for local development and Vercel deployment.

## Prerequisites

- **Node.js** 18+ and **npm**
- The backend running (see project root README for backend setup)

## Quick Start

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start the backend (in a separate terminal)

From the project root:

```bash
export OPENAI_API_KEY=sk-your-key-here
uv run uvicorn api.index:app --reload
```

The backend runs at `http://localhost:8000`.

### 3. Start the frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. (Optional) Custom API URL

If your backend runs on a different URL, create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Copy from `.env.local.example` and adjust as needed.

## Scripts

| Command       | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start dev server (port 3000)   |
| `npm run build` | Build for production         |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint                    |

## Deployment (Vercel)

1. Deploy the backend (FastAPI) to Vercel as configured in the project root.
2. Deploy this frontend by pointing Vercel at the `frontend` directory.
3. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL in Vercel environment variables.
