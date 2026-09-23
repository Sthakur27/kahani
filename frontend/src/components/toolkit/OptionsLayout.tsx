import React, { useState } from "react";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import KahaniButton from "./KahaniButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TiMinus, TiPlus } from "react-icons/ti";
import { BORDER, INK_MUTED } from "../../colors";

interface Option {
  id: number;
  text: string;
}

interface OptionsLayoutProps {
  options: Option[];
  onClick: (id: number) => void;
  isOptionSelected: (optionId: number) => boolean;
  showOptionCreator: boolean;
  setShowOptionCreator: (showOptionCreator: boolean) => void;
}

const OptionsLayout: React.FC<OptionsLayoutProps> = ({
  options,
  onClick,
  isOptionSelected,
  showOptionCreator,
  setShowOptionCreator,
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
  const alreadyChose = options.some((x) => isOptionSelected(x.id));

  return (
    // Choices read top to bottom like a list, not wrapped across rows: at this
    // width three of them would stagger into an uneven staircase.
    <Stack spacing={5} width="100%">
      <Flex align="center" gap={3}>
        <Text
          fontSize="0.75rem"
          fontWeight={600}
          letterSpacing="0.1em"
          textTransform="uppercase"
          color={INK_MUTED}
          whiteSpace="nowrap"
        >
          {alreadyChose ? "You chose" : "What now?"}
        </Text>
        <Box flex="1" height="1px" bg={BORDER} />
      </Flex>

      <Stack spacing={3} width="100%">
        {displayedOptions.map((option) => (
          <KahaniButton
            key={option.id}
            size="md"
            width="100%"
            onClick={() => onClick(option.id)}
            name={option.text}
            variant={isOptionSelected(option.id) ? "selected" : "click"}
          />
        ))}
      </Stack>

      {(canMovePrev || canMoveNext || !alreadyChose) && (
        <HStack spacing={3} justify="space-between">
          <HStack spacing={2}>
            {canMovePrev && (
              <KahaniButton
                size="sm"
                onClick={handlePrev}
                name={<FaArrowLeft />}
                ariaLabel="Show previous choices"
                variant="navigate"
              />
            )}
            {canMoveNext && (
              <KahaniButton
                size="sm"
                onClick={handleNext}
                name={<FaArrowRight />}
                ariaLabel="Show more choices"
                variant="navigate"
              />
            )}
            {options.length > visibleOptions && (
              <Text fontSize="0.8rem" color={INK_MUTED} pl={1}>
                {startIndex + 1}-
                {Math.min(startIndex + visibleOptions, options.length)} of{" "}
                {options.length}
              </Text>
            )}
          </HStack>

          {!alreadyChose && (
            <KahaniButton
              size="sm"
              onClick={() => setShowOptionCreator(!showOptionCreator)}
              name={
                <HStack spacing={2}>
                  {showOptionCreator ? <TiMinus /> : <TiPlus />}
                  <Text>
                    {showOptionCreator ? "Never mind" : "Write a branch"}
                  </Text>
                </HStack>
              }
              ariaLabel={
                showOptionCreator ? "Cancel new branch" : "Add a new branch"
              }
              variant={showOptionCreator ? "navigate" : "create"}
            />
          )}
        </HStack>
      )}
    </Stack>
  );
};

export default OptionsLayout;
