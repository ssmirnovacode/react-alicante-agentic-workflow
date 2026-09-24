import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import { Flex, Text } from "@chakra-ui/react";

export interface SpeakerCardSession {
  id: string;
  title: string;
  startTime: string;
}

export interface SpeakerCardProps {
  name: string;
  sessions: SpeakerCardSession[];
}

/** One speaker with the session(s) they give, built on the `Card` primitive. */
export function SpeakerCard({ name, sessions }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex
                justify="space-between"
                gap="3"
                _hover={{ color: "var(--accent-hex)" }}
              >
                <Text fontSize="sm">{session.title}</Text>
                <Text fontSize="sm" color="var(--text-muted)" flexShrink="0">
                  {session.startTime}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
