// src/components/StorySection.tsx
import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StoryOption, StoryOptionPreview } from "../types/Story";
import OptionCreator from "./toolkit/OptionCreator";
import KahaniButton from "./toolkit/KahaniButton";
import { TEAL, PURPLE, DARK_GREEN, WHITE } from "../colors";
import BackToHomeButton from "./toolkit/BackToHomeButton";
import OptionsLayout from "./toolkit/OptionsLayout";

interface StorySectionProps {
  storyId: number;
  title?: string;
  paragraph: string;
  optionId: number | null;
  options: StoryOptionPreview[];
  onOptionSelect: (depth: number, optionId: number) => void;
  selectedOptions: number[];
  depth: number;
  onCreate: (option: StoryOption) => void;
}

const StorySection: React.FC<StorySectionProps> = ({
  storyId,
  title,
  paragraph,
  optionId,
  options,
  onOptionSelect,
  selectedOptions,
  depth,
  onCreate,
}) => {
  const isOptionSelected = (optionId: number) => {
    return selectedOptions.includes(optionId);
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
        <CardHeader>
          {title && (
            <Heading as="h1" mb={4} color={DARK_GREEN}>
              {title}
            </Heading>
          )}
        </CardHeader>
        <CardBody>
          <Text mb={4} color={DARK_GREEN}>
            {paragraph}
          </Text>
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
