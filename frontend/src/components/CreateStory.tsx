import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import KahaniButton from "./toolkit/KahaniButton";
import KahaniTextArea from "./toolkit/KahaniTextArea";
import {
  WHITE,
  TEAL,
  DARK_GRAY,
  PLACEHOLDER_GRAY,
  MINT_GREEN,
  DARK_GREEN,
} from "../colors";
import BackToHomeButton from "./toolkit/BackToHomeButton";

const CreateStory: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/stories", {
        title,
        intro,
      });
      console.log("Story created", response.data);
      navigate(`/story/${response.data.id}`); // Navigate to the new story view
    } catch (error) {
      console.error("Failed to create story", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      bgColor={MINT_GREEN}
      minH="100vh"
      color={WHITE}
      align="center"
      justify="center"
    >
      <Box p={5} maxW="600px" mx="auto">
        <Heading as="h1" mb={5} textAlign="center" color="teal.600">
          Create a New Story
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="title" mb={4} isRequired>
            <FormLabel color={DARK_GREEN}>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title"
              bg={WHITE}
              borderColor={TEAL}
              color={DARK_GRAY}
              _placeholder={{ color: PLACEHOLDER_GRAY }}
            />
          </FormControl>
          <FormControl id="intro" mb={4} isRequired>
            <FormLabel color={DARK_GREEN}>Intro</FormLabel>
            <KahaniTextArea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Enter story intro"
              variant="default"
            />
          </FormControl>
          <Stack spacing={5} align="center">
            <KahaniButton
              size="lg"
              onClick={handleSubmit}
              name={isLoading ? <Spinner size="md" /> : "Create Story"}
              variant="create"
            />
            <BackToHomeButton />
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateStory;
