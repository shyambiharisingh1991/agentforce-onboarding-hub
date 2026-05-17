# Deployment

## Local Docker

```bash
cp .env.example .env
docker compose up --build
```

Open `http://localhost:3000` for the web app and `http://localhost:4000/health` for the API.

## Vercel + API host

1. Deploy `apps/web` to Vercel.
2. Deploy `apps/api` to a Node host such as Fly.io, Render, Railway, or ECS.
3. Set `NEXT_PUBLIC_API_URL` to the API origin.
4. Configure Supabase URL, anon key, and service role key.
5. Add GitHub and Salesforce OAuth callback URLs.

## Production checklist

- Enable Supabase row-level security.
- Rotate OAuth client secrets and OpenAI keys.
- Configure rate limiting at the API gateway.
- Turn on structured logging and error reporting.
- Add backups and restore drills for PostgreSQL.
- Review generated onboarding plans before distributing them externally.
