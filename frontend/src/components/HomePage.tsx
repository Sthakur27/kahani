// src/components/HomePage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { DARK_GREEN, MINT_GREEN } from "../colors";
import { StoryPreview } from "../types/Story";
import KahaniButton from "./KahaniButton";

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<StoryPreview[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/stories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Colors
  const bgColor = MINT_GREEN;
  const textColor = DARK_GREEN;

  return (
    <Flex
      bgColor={bgColor}
      minH="100vh"
      color={textColor}
      align="center"
      justify="center"
    >
      <Box p={5} maxW="800px" width="100%">
        <Stack spacing={5} align="center">
          <Heading as="h1" color={textColor} textAlign="center">
            Kahani
          </Heading>
          <Heading as="h2" fontSize="xl" color={textColor} textAlign="center">
            Trending Stories
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={5}
            width="100%"
            justifyItems="center"
            alignItems="center"
          >
            {stories.map((story) => (
              <KahaniButton
                key={story.id}
                size="lg"
                onClick={() => navigate(`/story/${story.id}`)}
                name={story.title}
                variant="click"
              />
            ))}
          </SimpleGrid>
          <KahaniButton
            size="lg"
            onClick={() => navigate(`/create-story`)}
            name="Create New Story!"
            variant="create"
          />
          <KahaniButton
            size="lg"
            onClick={() => navigate(`/`)}
            name="Back to Home"
            variant="navigate"
          />
        </Stack>
      </Box>
    </Flex>
  );
};

export default HomePage;
