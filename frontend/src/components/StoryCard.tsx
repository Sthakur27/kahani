// src/components/StoryCard.tsx
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StoryOption, StoryOptionPreview } from "../types/Story";
import { BORDER, CARD, INK, INK_BODY } from "../colors";
import OptionsLayout from "./toolkit/OptionsLayout";
import { TypeAnimation } from "react-type-animation";

interface StoryCardProps {
  title?: string;
  paragraph: string;
  options: StoryOptionPreview[];
  onOptionSelect: (depth: number, optionId: number) => void;
  depth: number;
  isOptionSelected: (optionId: number) => boolean;
  typingLevel: number[];
  setTypingLevel: (typingLevel: number[]) => void;
  storyPath: StoryOption[];
  typeSpeed: number;
  typeWait: number;
  showOptionCreator: boolean;
  setShowOptionCreator: (showOptionCreator: boolean) => void;
  isStoryStarted: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  paragraph,
  options,
  onOptionSelect,
  depth,
  isOptionSelected,
  typingLevel,
  setTypingLevel,
  storyPath,
  typeSpeed,
  typeWait,
  showOptionCreator,
  setShowOptionCreator,
  isStoryStarted,
}) => {
  const lastTypingLevel = typingLevel[depth];
  const onCurrentDepth = storyPath.length === depth;
  const titleFontSize = isStoryStarted ? "2em" : "1.5em";
  const fontWeight = isStoryStarted ? "bold" : "bold";

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
            fontSize: titleFontSize,
            display: "inline-block",
            color: INK,
            fontWeight,
          }}
        />
      );
    } else {
      return (
        <Text
          as="span"
          fontSize={titleFontSize}
          fontWeight={fontWeight}
          color={INK}
        >
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
            fontSize: "1.05rem",
            display: "inline-block",
            color: INK_BODY,
            fontFamily: "'Source Serif 4', Georgia, serif",
            lineHeight: 1.7,
          }}
          // @ts-ignore
          speed={typeSpeed}
        />
      );
    } else {
      return (
        <Text
          as="span"
          fontFamily="prose"
          fontSize="1.05rem"
          lineHeight="1.7"
          color={INK_BODY}
        >
          {paragraph}
        </Text>
      );
    }
  };

  return (
    <Stack spacing={5} align="center">
      <Card
        p={{ base: 4, md: 8 }}
        maxW="800px"
        width="800px"
        boxShadow="card"
        borderWidth="1px"
        borderColor={BORDER}
        borderRadius="card"
        bg={CARD}
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
              showOptionCreator={showOptionCreator}
              setShowOptionCreator={setShowOptionCreator}
            />
          )}
        </CardBody>
      </Card>
    </Stack>
  );
};

export default StoryCard;
