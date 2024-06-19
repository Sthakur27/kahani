// src/components/StoryView.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Spinner, Flex, Stack } from "@chakra-ui/react";
import { Story, StoryOption } from "../types/Story";
import { MINT_GREEN, DARK_GREEN } from "../colors";
import StorySection from "./StorySection";
import StoryBook from "./StoryBook";
import BackToHomeButton from "./toolkit/BackToHomeButton";
import KahaniButton from "./toolkit/KahaniButton";
import { PiCardsFill } from "react-icons/pi";
import { IoBook } from "react-icons/io5";

const StoryView: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storyPath, setStoryPath] = useState<StoryOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [cardMode, setCardMode] = useState<boolean>(true);
  const [typingLevel, setTypingLevel] = useState<number[]>([0]); // 0 for story start, 1 ended story, 2 for option end

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
        setTypingLevel([...typingLevel, 0]);
      })
      .catch((error) => {
        console.error("Error fetching story option:", error);
      });
  };
  const isOptionSelected = (optionId: number) => {
    return selectedOptions.includes(optionId);
  };

  const handleOptionSelect = (depth: number, optionId: number) => {
    console.log("Option selected: ", optionId);
    console.log({ selectedOptions, storyPath: storyPath.map((s) => s.id) });

    if (selectedOptions[selectedOptions.length - 1] === optionId) {
      console.log("back");
      setStoryPath(storyPath.slice(0, depth));
      setSelectedOptions(selectedOptions.slice(0, depth));
      setTypingLevel(typingLevel.slice(0, depth));
    } else {
      console.log("forward");
      getStoryOption(
        storyPath.slice(0, depth),
        selectedOptions.slice(0, depth),
        optionId
      );
    }
    // console.log({ selectedOptions, storyPath: storyPath.map((s) => s.id) });
  };

  const onCreate = (option: StoryOption) => {
    setStoryPath([...storyPath, option]);
    setSelectedOptions([...selectedOptions, option.id]);
    setTypingLevel([...typingLevel, 0]);
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

  // console.log({ path: [story.intro, ...storyPath.map((s) => s.text)] });

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
        <Stack>
          <BackToHomeButton />
          <KahaniButton
            size="lg"
            onClick={() => setCardMode(!cardMode)}
            name={cardMode ? <IoBook /> : <PiCardsFill />}
            variant={cardMode ? "click" : "create"}
          />
        </Stack>
      </Box>
      <Box p={5} maxW="800px" width="100%">
        <Stack spacing={5} align="center">
          {cardMode ? (
            <StoryBook
              story={story}
              storyPath={storyPath}
              onOptionSelect={handleOptionSelect}
              onCreate={onCreate}
              isOptionSelected={isOptionSelected}
              typingLevel={typingLevel}
              setTypingLevel={setTypingLevel}
            />
          ) : (
            <>
              <StorySection
                storyId={story.id}
                title={story.title}
                paragraph={story.intro}
                optionId={null}
                options={story.options}
                depth={0}
                onOptionSelect={handleOptionSelect}
                onCreate={onCreate}
                isOptionSelected={isOptionSelected}
              />
              {storyPath.map((section, index) => (
                <StorySection
                  key={section.id}
                  storyId={story.id}
                  paragraph={section.paragraph}
                  optionId={section.id}
                  options={section.childOptions}
                  depth={index + 1}
                  onOptionSelect={handleOptionSelect}
                  title={section.text}
                  onCreate={onCreate}
                  isOptionSelected={isOptionSelected}
                />
              ))}
            </>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default StoryView;
