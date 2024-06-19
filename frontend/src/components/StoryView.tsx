// src/components/StoryView.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Spinner,
  Flex,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Story, StoryOption } from "../types/Story";
import { MINT_GREEN, DARK_GREEN, TEAL } from "../colors";
import StorySection from "./StorySection";
import BackToHomeButton from "./toolkit/BackToHomeButton";

const StoryView: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storyPath, setStoryPath] = useState<StoryOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // console.log({ storyPath });

  const getStoryOption = (
    path: StoryOption[],
    options: number[],
    optionId: number
  ) => {
    axios
      .get<StoryOption>(`http://localhost:5000/options/${optionId}`)
      .then((response) => {
        setStoryPath([...path, response.data]);
        setSelectedOptions([...options, optionId]);
      })
      .catch((error) => {
        console.error("Error fetching story option:", error);
      });
  };

  const handleOptionSelect = (depth: number, optionId: number) => {
    if (selectedOptions[selectedOptions.length - 1] === optionId) {
      setStoryPath(storyPath.slice(0, depth));
      setSelectedOptions(selectedOptions.slice(0, depth));
    } else {
      getStoryOption(
        storyPath.slice(0, depth),
        selectedOptions.slice(0, depth),
        optionId
      );
    }
    // console.log("selected option: ", optionId);
  };

  const onCreate = (option: StoryOption) => {
    const oldPath = [...storyPath];
    if (oldPath.length === 0) {
      story?.options.push(option);
      setSelectedOptions([option.id]);
      setStoryPath([option]);
      return;
    }
    const parentOption = oldPath[oldPath.length - 1];
    parentOption.childOptions.push({
      id: option.id,
      text: option.text,
    });
    const newPath = [...oldPath, option];
    setStoryPath(newPath);
    setSelectedOptions([...selectedOptions, option.id]);
  };

  useEffect(() => {
    axios
      .get<Story>(`http://localhost:5000/stories/${storyId}`)
      .then((response) => {
        setStory(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
        setIsLoading(false);
      });
  }, [storyId]);

  if (isLoading) return <Spinner size="xl" />;

  if (!story) return <Box>Story not found</Box>;

  return (
    <Flex
      bgColor={MINT_GREEN}
      minH="100vh"
      color={DARK_GREEN}
      align="center"
      justify="center"
      position="relative"
    >
      <Box position="fixed" top="35px" right="30px" zIndex="1000">
        <BackToHomeButton />
      </Box>
      <Box p={5} maxW="800px" width="100%">
        <Stack spacing={5} align="center">
          <StorySection
            storyId={story.id}
            title={story.title}
            paragraph={story.intro}
            optionId={null}
            options={story.options}
            depth={0}
            onOptionSelect={handleOptionSelect}
            selectedOptions={selectedOptions}
            onCreate={onCreate}
          />
          {storyPath.map((section, index) => (
            <StorySection
              key={index}
              storyId={story.id}
              paragraph={section.paragraph}
              optionId={section.id}
              options={section.childOptions}
              depth={index + 1}
              onOptionSelect={handleOptionSelect}
              selectedOptions={selectedOptions}
              title={section.text}
              onCreate={onCreate}
            />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default StoryView;
