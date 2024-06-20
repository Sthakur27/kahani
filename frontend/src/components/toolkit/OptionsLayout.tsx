import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import KahaniButton from "./KahaniButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import OptionCreator from "./OptionCreator";
import OptionCreator2 from "./OptionCreator2";
import { StoryOption } from "../../types/Story";
import { TiMinus, TiPlus } from "react-icons/ti";

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
  const [showInputs, setShowInputs] = useState<boolean>(false);
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
            size="md"
            onClick={handleNext}
            name={<FaArrowRight />}
            variant="navigate"
          />
        )}
        {/* {!options.some((x) => isOptionSelected(x.id)) && (
          <OptionCreator
            storyId={storyId}
            parentOptionId={parentOptionId}
            onCreate={(option: StoryOption) => {
              onCreate(option);
              setStartIndex(Math.max(0, options.length - visibleOptions));
            }}
          />
        )} */}
        <KahaniButton
          size="md"
          onClick={() => setShowInputs(!showInputs)}
          name={showInputs ? <TiMinus /> : <TiPlus />}
          variant="create"
        />
      </HStack>
      {showInputs && !options.some((x) => isOptionSelected(x.id)) && (
        <OptionCreator2
          storyId={storyId}
          parentOptionId={parentOptionId}
          onCreate={(option: StoryOption) => {
            onCreate(option);
            setStartIndex(Math.max(0, options.length - visibleOptions));
          }}
          showInputs={showInputs}
          setShowInputs={setShowInputs}
        />
      )}
    </Stack>
  );
};

export default OptionsLayout;
