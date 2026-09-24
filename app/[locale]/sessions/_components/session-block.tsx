import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  const t = useTranslations("SessionLevel");
  const levelLabel = t(session.level);

  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Text fontWeight="medium" color="var(--text-primary)" truncate>
            {session.title}
          </Text>
          {/*
           * Level comes right after the time, ahead of the speaker name, so
           * truncation on long speaker names clips the speaker — not this
           * new content — first.
           */}
          <Text color="var(--text-muted)" truncate>
            {session.startTime} · {levelLabel} · {session.speaker}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
