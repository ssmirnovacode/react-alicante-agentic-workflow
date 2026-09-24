import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { SpeakerCard } from "./speaker-card";

describe("SpeakerCard", () => {
  it("shows the speaker name and each session's title and start time", () => {
    render(
      <SpeakerCard
        name="Marta Fernandez"
        sessions={[
          {
            id: "opening-keynote",
            title: "Opening Keynote",
            startTime: "09:00",
          },
          {
            id: "rsc-payload-budget",
            title: "Keeping Your RSC Payload on a Diet",
            startTime: "11:15",
          },
        ]}
      />,
    );

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(
      screen.getByText("Keeping Your RSC Payload on a Diet"),
    ).toBeInTheDocument();
    expect(screen.getByText("11:15")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(
      <SpeakerCard
        name="Marta Fernandez"
        sessions={[
          {
            id: "opening-keynote",
            title: "Opening Keynote",
            startTime: "09:00",
          },
        ]}
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("gives each session link an unambiguous accessible name", () => {
    render(
      <SpeakerCard
        name="Marta Fernandez"
        sessions={[
          {
            id: "opening-keynote",
            title: "Opening Keynote",
            startTime: "09:00",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Opening Keynote, 09:00" }),
    ).toBeInTheDocument();
  });
});
