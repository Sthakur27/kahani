// src/components/StoryBook.tsx
import React from "react";
import {
  Heading,
  Stack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { Story, StoryOption } from "../types/Story";
import { DARK_GREEN, WHITE } from "../colors";
import StoryBookChapter from "./StoryBookChapter";
import OptionsLayout from "./toolkit/OptionsLayout";

interface StoryBookProps {
  story: Story;
  onOptionSelect: (depth: number, optionId: number) => void;
  onCreate: (option: StoryOption) => void;
  storyPath: StoryOption[];
  isOptionSelected: (optionId: number) => boolean;
  typingLevel: number[];
  setTypingLevel: (typingLevel: number[]) => void;
  typeSpeed: number;
  typeWait: number;
  showOptionCreator: boolean;
  setShowOptionCreator: (showOptionCreator: boolean) => void;
}

const StoryBook: React.FC<StoryBookProps> = ({
  story,
  onOptionSelect,
  onCreate,
  storyPath,
  isOptionSelected,
  typingLevel,
  setTypingLevel,
  typeSpeed,
  typeWait,
  showOptionCreator,
  setShowOptionCreator,
}) => {
  const depth = storyPath.length;
  const latestOptions = storyPath.length
    ? storyPath[storyPath.length - 1].childOptions
    : story.options;
  const lastOptionId = storyPath.length
    ? storyPath[storyPath.length - 1].id
    : null;
  console.log(typingLevel);
  const lastTypingLevel = typingLevel[typingLevel.length - 1];
  return (
    <Stack spacing={5} align="center">
      <Card
        p={5}
        maxW="800px"
        width="800px"
        boxShadow="dark-lg"
        rounded="md"
        bg={WHITE}
      >
        <CardHeader>
          <Heading as="h1" mb={4} color={DARK_GREEN}>
            {story.title}
          </Heading>
        </CardHeader>
        <CardBody>
          <StoryBookChapter // intro
            text={story.intro}
            isUserResponse={false}
            typingCallBack={() => {
              setTypingLevel([2]);
            }}
            shouldType={storyPath.length === 0}
            typeSpeed={typeSpeed}
            typeWait={typeWait}
          />
          {storyPath.map((storyOption, index) => {
            return (
              <Stack key={`stack${storyOption.id}`}>
                <StoryBookChapter // header
                  text={storyOption.text}
                  isUserResponse={true}
                  typingCallBack={() => {
                    setTypingLevel([...typingLevel.slice(0, index + 1), 1]);
                  }}
                  shouldType={
                    storyPath.length === index + 1 && lastTypingLevel === 0
                  }
                  typeSpeed={typeSpeed}
                  typeWait={typeWait}
                />
                {typingLevel[index + 1] >= 1 && (
                  <StoryBookChapter // body
                    text={storyOption.paragraph}
                    isUserResponse={false}
                    typingCallBack={() => {
                      console.log("h1");
                      setTypingLevel([...typingLevel.slice(0, index + 1), 2]);
                      console.log(typingLevel);
                    }}
                    shouldType={
                      storyPath.length === index + 1 && lastTypingLevel === 1
                    }
                    typeSpeed={typeSpeed}
                    typeWait={typeWait}
                  />
                )}
              </Stack>
            );
          })}
        </CardBody>
        <CardFooter>
          {lastTypingLevel === 2 && (
            <OptionsLayout
              options={latestOptions}
              onClick={(optionId: number) => {
                setTypingLevel([
                  ...typingLevel.slice(0, typingLevel.length - 1),
                  2,
                ]);
                onOptionSelect(depth, optionId);
              }}
              isOptionSelected={isOptionSelected}
              showOptionCreator={showOptionCreator}
              setShowOptionCreator={setShowOptionCreator}
            />
          )}
        </CardFooter>
      </Card>
    </Stack>
  );
};

export default StoryBook;
