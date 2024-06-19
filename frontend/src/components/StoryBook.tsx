// src/components/StoryBook.tsx
import React, { useState } from "react";
import {
  Heading,
  Stack,
  Text,
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
}

const StoryBook: React.FC<StoryBookProps> = ({
  story,
  onOptionSelect,
  onCreate,
  storyPath,
  isOptionSelected,
  typingLevel,
  setTypingLevel,
}) => {
  const depth = storyPath.length;
  const latestOptions = storyPath.length
    ? storyPath[storyPath.length - 1].childOptions
    : story.options;
  const lastOptionId = storyPath.length
    ? storyPath[storyPath.length - 1].id
    : null;
  const selectedFirstOption = story.options.find((x) => isOptionSelected(x.id));
  console.log(typingLevel);
  const lastTypingLevel = typingLevel[typingLevel.length - 1];
  const secondLastTypingLevel = typingLevel[typingLevel.length - 2];
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
          <StoryBookChapter
            text={story.intro}
            isUserResponse={false}
            typingCallBack={() => {
              setTypingLevel([2]);
            }}
          />
          {/* {selectedFirstOption && (
            <StoryBookChapter
              text={selectedFirstOption.text}
              isUserResponse={true}
              typingCallBack={() => {
                setTypingLevel([2, typingLevel[0]]);
              }}
            />
          )} */}

          {/* {storyPath.map((storyOption, index) => {
            const selectedOption = storyOption.childOptions.find((x) =>
              isOptionSelected(x.id)
            );
            return (
              <Stack key={`stack${storyOption.id}`}>
                {secondLastTypingLevel === 2 && (
                  <StoryBookChapter
                    text={storyOption.paragraph}
                    isUserResponse={false}
                    typingCallBack={() => {
                      console.log("h1");
                      setTypingLevel([...typingLevel.slice(0, index + 1), 1]);
                      console.log(typingLevel);
                    }}
                  />
                )}
                {selectedOption && lastTypingLevel === 1 && (
                  <StoryBookChapter
                    text={selectedOption.text}
                    isUserResponse={true}
                    typingCallBack={() => {
                      setTypingLevel([...typingLevel.slice(0, index + 1), 2]);
                    }}
                  />
                )}
              </Stack>
            );
          })} */}
          {storyPath.map((storyOption, index) => {
            const selectedOption = storyOption.childOptions.find((x) =>
              isOptionSelected(x.id)
            );
            return (
              <Stack key={`stack${storyOption.id}`}>
                <StoryBookChapter
                  text={storyOption.text}
                  isUserResponse={true}
                  typingCallBack={() => {
                    setTypingLevel([...typingLevel.slice(0, index + 1), 1]);
                  }}
                />
                {typingLevel[index + 1] >= 1 && (
                  <StoryBookChapter
                    text={storyOption.paragraph}
                    isUserResponse={false}
                    typingCallBack={() => {
                      console.log("h1");
                      setTypingLevel([...typingLevel.slice(0, index + 1), 2]);
                      console.log(typingLevel);
                    }}
                  />
                )}
              </Stack>
            );
          })}
        </CardBody>
        {/* <CardFooter>
          {((selectedFirstOption && lastTypingLevel == 2) ||
            (!selectedFirstOption && lastTypingLevel == 1)) && (
            <OptionsLayout
              options={latestOptions}
              onClick={(optionId: number) => onOptionSelect(depth, optionId)}
              isOptionSelected={isOptionSelected}
              storyId={story.id}
              parentOptionId={lastOptionId}
              onCreate={onCreate}
            />
          )}
        </CardFooter> */}
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
              storyId={story.id}
              parentOptionId={lastOptionId}
              onCreate={onCreate}
            />
          )}
        </CardFooter>
      </Card>
    </Stack>
  );
};

export default StoryBook;
