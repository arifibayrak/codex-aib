# VC Discovery Agent (Phase 1 MVP)

Production-lean MVP for discovery-stage startup intake, document collection, structured extraction, QA checks, follow-ups, and investor review.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + lightweight shadcn-style components
- Supabase (Postgres/Auth/Storage) wiring scaffolded
- Zod for runtime validation
- Mock AI services behind interfaces

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env vars:
   ```bash
   cp .env.example .env.local
   ```
3. Run app:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Environment variables
Create `.env.local`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Supabase setup
1. Create a Supabase project.
2. Create a storage bucket (e.g., `submission-files`).
3. Apply SQL migrations from `supabase/migrations`.
4. Add row-level security policies as needed for founder and investor roles.

## API Routes
- `POST /api/submissions`
- `POST /api/files/upload`
- `POST /api/extract/run`
- `POST /api/qa/run`
- `POST /api/followups/generate`
- `POST /api/followups/answer`
- `GET /api/submissions/[id]`
- `GET /api/investor/submissions`

## What is mocked vs real
### Mocked
- PDF parsing and website ingestion (placeholder extraction output)
- Follow-up generation and investor summary generation
- File upload operation currently stores metadata in-memory

### Real-ready interfaces
- `ExtractionService`
- `ValidationService`
- `FollowupService`
- `SummaryService`

These interfaces isolate model/provider dependencies and are safe to replace with OpenAI/Anthropic/other orchestration later.

## Architecture layout
- `lib/schemas`: Zod schemas and canonical extraction contracts
- `lib/services`: model-agnostic service interfaces + mock implementations
- `lib/db`: repository and supabase client
- `lib/validation`: deterministic score engine and QA rules
- `app/api`: route handlers
- `app/founder`, `app/investor`: role-specific pages

## OpenClaw integration (next steps)
1. Expose orchestration endpoints for conversational task routing (submission intake, Q&A).
2. Connect `ExtractionService` and `FollowupService` to OpenClaw agent tool-calling.
3. Add conversation memory linked to `submission_id`.
4. Add investor copilot actions: "explain score", "draft intro questions", "compare startups".

## n8n integration (next steps)
1. Trigger workflows on new file upload and QA completion.
2. Push follow-up emails/slack reminders to founders.
3. Sync investor-ready summaries to CRM/airtable.
4. Add scheduled stale-document checks and data freshness runs.

## Risks / current limitations
- In-memory repository resets on server restart.
- No production auth/RLS enforcement in routes yet.
- Extraction/summary are deterministic mocks, no true OCR/web scraping yet.
- Upload flow uses metadata placeholders; real binary file handling and signed URL lifecycle required.
