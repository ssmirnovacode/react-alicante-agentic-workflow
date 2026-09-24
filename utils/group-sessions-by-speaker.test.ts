import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker, sorted by speaker name", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Zoe" }),
      session({ id: "s2", speaker: "Amy" }),
    ]);

    expect(groups.map((g) => g.speaker)).toEqual(["Amy", "Zoe"]);
  });

  it("collects multiple sessions for the same speaker, sorted by start time", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Amy", startTime: "14:00" }),
      session({ id: "s2", speaker: "Amy", startTime: "09:00" }),
    ]);

    expect(groups).toEqual([
      {
        speaker: "Amy",
        sessions: [
          session({ id: "s2", speaker: "Amy", startTime: "09:00" }),
          session({ id: "s1", speaker: "Amy", startTime: "14:00" }),
        ],
      },
    ]);
  });

  it("excludes the closing panel's 'Full speaker lineup' placeholder", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Amy" }),
      session({ id: "s2", speaker: "Full speaker lineup" }),
    ]);

    expect(groups).toEqual([
      { speaker: "Amy", sessions: [session({ id: "s1", speaker: "Amy" })] },
    ]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
