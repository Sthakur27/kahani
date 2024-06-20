// src/components/StoryCard.tsx
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StoryOption, StoryOptionPreview } from "../types/Story";
import { TEAL, DARK_GREEN, WHITE } from "../colors";
import OptionsLayout from "./toolkit/OptionsLayout";
import { TypeAnimation } from "react-type-animation";
import { TYPE_SPEED, TYPE_WAIT } from "./constants";

interface StoryCardProps {
  storyId: number;
  title?: string;
  paragraph: string;
  optionId: number | null;
  options: StoryOptionPreview[];
  onOptionSelect: (depth: number, optionId: number) => void;
  depth: number;
  onCreate: (option: StoryOption) => void;
  isOptionSelected: (optionId: number) => boolean;
  typingLevel: number[];
  setTypingLevel: (typingLevel: number[]) => void;
  storyPath: StoryOption[];
  typeSpeed: number;
  typeWait: number;
}

const StoryCard: React.FC<StoryCardProps> = ({
  storyId,
  title,
  paragraph,
  optionId,
  options,
  onOptionSelect,
  depth,
  onCreate,
  isOptionSelected,
  typingLevel,
  setTypingLevel,
  storyPath,
  typeSpeed,
  typeWait,
}) => {
  const lastTypingLevel = typingLevel[depth];
  const onCurrentDepth = storyPath.length === depth;

  // console.log({
  //   depth,
  //   lastTypingLevel,
  //   typingLevel,
  //   onCurrentDepth,
  // });
  const renderHeader = (title: string) => {
    const shouldType = onCurrentDepth && lastTypingLevel === 0;
    if (shouldType) {
      return (
        <TypeAnimation
          sequence={[
            title,
            typeWait,
            () => setTypingLevel([...typingLevel.slice(0, depth), 1]),
          ]}
          wrapper="span"
          // @ts-ignore
          speed={typeSpeed}
          cursor={false}
          style={{
            fontSize: "2em",
            display: "inline-block",
            color: DARK_GREEN,
          }}
        />
      );
    } else {
      return (
        <Text as="span" fontSize="2em" color={DARK_GREEN}>
          {title}
        </Text>
      );
    }
  };

  const renderBody = (paragraph: string) => {
    const shouldType = onCurrentDepth && lastTypingLevel === 1;
    if (shouldType) {
      return (
        <TypeAnimation
          sequence={[
            paragraph,
            typeWait,
            () => setTypingLevel([...typingLevel.slice(0, depth), 2]),
          ]}
          wrapper="span"
          cursor={false}
          style={{
            fontSize: "1.5em",
            display: "inline-block",
            color: DARK_GREEN,
          }}
          // @ts-ignore
          speed={typeSpeed}
        />
      );
    } else {
      return (
        <Text as="span" fontSize="1.5em" color={DARK_GREEN}>
          {paragraph}
        </Text>
      );
    }
  };

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
        <CardHeader>{title && renderHeader(title)}</CardHeader>
        <CardBody>
          {lastTypingLevel >= 1 && renderBody(paragraph)}
          <Spacer marginTop="15px" />
          {lastTypingLevel === 2 && (
            <OptionsLayout
              options={options}
              onClick={(optionId: number) => onOptionSelect(depth, optionId)}
              isOptionSelected={isOptionSelected}
              storyId={storyId}
              parentOptionId={optionId}
              onCreate={onCreate}
            />
          )}
        </CardBody>
      </Card>
    </Stack>
  );
};

export default StoryCard;
