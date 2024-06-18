// src/components/StoryView.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Story } from "../types/Story";
import CreateOption from "./CreateOption";

const StoryView: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/stories/${storyId}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => console.log(error));
  }, [storyId]);

  if (!story) return <Box>Loading...</Box>;

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>
        {story.title}
      </Heading>
      <Text mb={4}>{story.intro}</Text>

      <Heading as="h4" size="md" mb={4}>
        Options:
      </Heading>
      <List spacing={3} mb={4}>
        {story.options.map((option) => (
          <ListItem key={option.id}>
            <Link as={RouterLink} to={`/option/${option.id}`} color="teal.500">
              {option.text}
            </Link>
          </ListItem>
        ))}
      </List>

      <CreateOption storyId={story.id} />

      <Button as={RouterLink} to="/" colorScheme="teal" mt={5}>
        Back to Home
      </Button>
    </Box>
  );
};

export default StoryView;
