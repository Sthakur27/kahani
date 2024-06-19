// src/components/StorySection.tsx
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
import { TEAL, PURPLE, DARK_GREEN, WHITE } from "../colors";
import OptionsLayout from "./toolkit/OptionsLayout";
import { TypeAnimation } from "react-type-animation";
interface StorySectionProps {
  storyId: number;
  title?: string;
  paragraph: string;
  optionId: number | null;
  options: StoryOptionPreview[];
  onOptionSelect: (depth: number, optionId: number) => void;
  depth: number;
  onCreate: (option: StoryOption) => void;
  isOptionSelected: (optionId: number) => boolean;
}

const StorySection: React.FC<StorySectionProps> = ({
  storyId,
  title,
  paragraph,
  optionId,
  options,
  onOptionSelect,
  depth,
  onCreate,
  isOptionSelected,
}) => {
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
          {title && (
            <Heading as="h1" mb={4} color={DARK_GREEN}>
              {title}
            </Heading>
          )}
        </CardHeader>
        <CardBody>
          {/* <Text mb={4} color={DARK_GREEN}>
            {paragraph}
          </Text> */}
          <TypeAnimation
            sequence={[paragraph]}
            wrapper="span"
            cursor={false}
            style={{
              fontSize: "1.5em",
              display: "inline-block",
              color: DARK_GREEN,
            }}
          />
          <Spacer marginTop="15px" />
          <OptionsLayout
            options={options}
            onClick={(optionId: number) => onOptionSelect(depth, optionId)}
            isOptionSelected={isOptionSelected}
            storyId={storyId}
            parentOptionId={optionId}
            onCreate={onCreate}
          />
        </CardBody>
      </Card>
    </Stack>
  );
};

export default StorySection;
