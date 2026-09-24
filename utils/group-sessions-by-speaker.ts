import type { Session } from "@/types/session";

/**
 * Seeded as the speaker for the closing panel session (see
 * `supabase/migrations/20260917090100_seed_sessions.sql`) — a placeholder,
 * not a real person, so it must never surface as its own speaker card.
 */
const NON_SPEAKER_PLACEHOLDER = "Full speaker lineup";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * Groups sessions by speaker, sorted by speaker name, with each speaker's
 * own sessions sorted by start time. Excludes the "Full speaker lineup"
 * placeholder used by the closing panel session.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === NON_SPEAKER_PLACEHOLDER) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: [...speakerSessions].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
