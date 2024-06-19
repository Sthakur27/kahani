// src/components/toolkit/OptionsLayout.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import KahaniButton from "./KahaniButton";
import { TEAL, WHITE } from "../../colors";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Option {
  id: number;
  text: string;
}

interface OptionsLayoutProps {
  options: Option[];
  onClick: (id: number) => void;
  isOptionSelected: (optionId: number) => boolean;
}

const OptionsLayout: React.FC<OptionsLayoutProps> = ({
  options,
  onClick,
  isOptionSelected,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleOptions = 3;

  const handleNext = () => {
    if (startIndex + visibleOptions < options.length) {
      setStartIndex(startIndex + visibleOptions);
    }
  };

  const handlePrev = () => {
    if (startIndex - visibleOptions >= 0) {
      setStartIndex(startIndex - visibleOptions);
    }
  };
  if (options.length === 0) {
    return <></>;
  }

  return (
    <Stack spacing={4} align="center">
      <HStack spacing={2}>
        {startIndex > 0 && (
          <KahaniButton
            size="sm"
            onClick={handlePrev}
            name={<FaArrowLeft />}
            variant="navigate"
          />
        )}
        {options
          .slice(startIndex, startIndex + visibleOptions)
          .map((option) => (
            <KahaniButton
              key={option.id}
              size="md"
              onClick={() => onClick(option.id)}
              name={option.text}
              variant={isOptionSelected(option.id) ? "selected" : "click"}
            />
          ))}
        {startIndex + visibleOptions < options.length && (
          <KahaniButton
            size="sm"
            onClick={handleNext}
            name={<FaArrowRight />}
            variant="navigate"
          />
        )}
      </HStack>
    </Stack>
  );
};

export default OptionsLayout;
