import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import KahaniButton from "./KahaniButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import OptionCreator from "./OptionCreator";
import { StoryOption } from "../../types/Story";

interface Option {
  id: number;
  text: string;
}

interface OptionsLayoutProps {
  options: Option[];
  onClick: (id: number) => void;
  isOptionSelected: (optionId: number) => boolean;
  storyId: number;
  parentOptionId: number | null;
  onCreate: (option: StoryOption) => void;
}

const OptionsLayout: React.FC<OptionsLayoutProps> = ({
  options,
  onClick,
  isOptionSelected,
  storyId,
  parentOptionId,
  onCreate,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleOptions = 3;

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + visibleOptions, options.length - visibleOptions)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - visibleOptions, 0));
  };

  const displayedOptions = options.slice(
    startIndex,
    startIndex + visibleOptions
  );
  const canMoveNext = startIndex + visibleOptions < options.length;
  const canMovePrev = startIndex > 0;

  return (
    <Stack spacing={4} align="center">
      <HStack spacing={2}>
        {canMovePrev && (
          <KahaniButton
            size="sm"
            onClick={handlePrev}
            name={<FaArrowLeft />}
            variant="navigate"
          />
        )}
        {displayedOptions.map((option) => (
          <KahaniButton
            key={option.id}
            size="md"
            onClick={() => onClick(option.id)}
            name={option.text}
            variant={isOptionSelected(option.id) ? "selected" : "click"}
          />
        ))}
        {canMoveNext && (
          <KahaniButton
            size="sm"
            onClick={handleNext}
            name={<FaArrowRight />}
            variant="navigate"
          />
        )}
      </HStack>
      {!options.some((x) => isOptionSelected(x.id)) && (
        <HStack justifyContent="flex-end" width="100%">
          <OptionCreator
            storyId={storyId}
            parentOptionId={parentOptionId}
            onCreate={(option: StoryOption) => {
              onCreate(option);
              setStartIndex(Math.max(0, options.length - visibleOptions));
            }}
          />
        </HStack>
      )}
    </Stack>
  );
};

export default OptionsLayout;
