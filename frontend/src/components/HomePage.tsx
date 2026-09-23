import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BORDER, GREEN, INK, INK_MUTED, PAPER, WHITE } from "../colors";
import { StoryPreview } from "../types/Story";
import CreateStoryModal from "./CreateStoryModal";

const API = "http://127.0.0.1:5000";

const StoryTile: React.FC<{ story: StoryPreview; onOpen: () => void }> = ({
  story,
  onOpen,
}) => (
  <Box
    as="article"
    role="link"
    tabIndex={0}
    onClick={onOpen}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    }}
    cursor="pointer"
    bg={WHITE}
    borderWidth="1px"
    borderColor={BORDER}
    borderRadius="card"
    p={6}
    height="100%"
    boxShadow="card"
    transition="transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease"
    _hover={{
      transform: "translateY(-3px)",
      boxShadow: "cardHover",
      borderColor: GREEN,
    }}
  >
    <Stack spacing={3} height="100%">
      <Heading as="h3" fontSize="1.25rem" lineHeight="1.25" noOfLines={2}>
        {story.title}
      </Heading>
      <Text
        fontFamily="prose"
        fontSize="0.95rem"
        lineHeight="1.6"
        color={INK_MUTED}
        noOfLines={4}
      >
        {story.intro ?? ""}
      </Text>
      <Box flex="1" />
      <Text
        fontSize="0.8rem"
        fontWeight={600}
        letterSpacing="0.04em"
        textTransform="uppercase"
        color={GREEN}
      >
        Read this one
      </Text>
    </Stack>
  </Box>
);

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<StoryPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<StoryPreview[]>(`${API}/stories`)
      .then((response) => setStories(response.data))
      .catch((error) => console.error("Failed to load stories", error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box bg={PAPER} minH="100vh" color={INK}>
      <Container maxW="1000px" px={6} py={{ base: 12, md: 20 }}>
        <Stack spacing={{ base: 10, md: 14 }}>
          <Stack spacing={4} maxW="620px">
            <Heading as="h1" fontSize={{ base: "2.75rem", md: "3.5rem" }}>
              Kahani
            </Heading>
            <Text
              fontFamily="prose"
              fontSize={{ base: "1.05rem", md: "1.2rem" }}
              lineHeight="1.65"
              color={INK_MUTED}
            >
              Every story here forks. Read a path someone else laid down, or
              write the branch that was not there before.
            </Text>
            <Box pt={2}>
              <CreateStoryModal />
            </Box>
          </Stack>

          <Stack spacing={6}>
            <Flex align="baseline" gap={3}>
              <Heading
                as="h2"
                fontSize="0.85rem"
                fontWeight={600}
                letterSpacing="0.1em"
                textTransform="uppercase"
                color={INK_MUTED}
                fontFamily="body"
              >
                Trending stories
              </Heading>
              <Box flex="1" height="1px" bg={BORDER} />
              {!isLoading && stories.length > 0 && (
                <Text fontSize="0.8rem" color={INK_MUTED} whiteSpace="nowrap">
                  {stories.length} {stories.length === 1 ? "story" : "stories"}
                </Text>
              )}
            </Flex>

            {isLoading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} height="200px" borderRadius="card" />
                ))}
              </SimpleGrid>
            ) : stories.length === 0 ? (
              <Box
                borderWidth="1px"
                borderStyle="dashed"
                borderColor={BORDER}
                borderRadius="card"
                p={10}
                textAlign="center"
              >
                <Text fontFamily="prose" fontSize="1.05rem" color={INK_MUTED}>
                  Nothing here yet. The first story is yours to start.
                </Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {stories.map((story) => (
                  <StoryTile
                    key={story.id}
                    story={story}
                    onOpen={() => navigate(`/story/${story.id}`)}
                  />
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
