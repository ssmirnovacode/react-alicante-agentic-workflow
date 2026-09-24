-- Same reasoning as `track` (see 20260918100000_session_track_enum.sql): an
-- enum keeps the allowed levels in the schema, so `pnpm db:types` generates a
-- union type for them instead of the app hand-writing one.

create type public.session_level as enum ('beginner', 'intermediate', 'advanced');

alter table public.sessions
  add column if not exists level public.session_level;

-- Backfill all 8 existing sessions so the column can be made not-null below.
update public.sessions set level = 'beginner' where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive';
update public.sessions set level = 'advanced' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced' where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner' where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;

-- No RLS change needed: the existing "Sessions are publicly readable" policy
-- and the table-level `grant select` already cover this column, since the
-- policy is per-row, not per-column.
