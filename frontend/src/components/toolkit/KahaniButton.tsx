// src/components/toolkit/KahaniButton.tsx
import React from "react";
import { Button } from "@chakra-ui/react";
import {
  TEAL,
  WHITE,
  PURPLE,
  AMBER,
  LIGHT_GRAY,
  DARK_GRAY,
  TEXT_MSG_COLOR,
} from "../../colors";

interface KahaniButtonProps {
  size: string;
  onClick: () => void;
  name: React.ReactNode;
  variant:
    | "click"
    | "create"
    | "navigate"
    | "selected"
    | "storyText"
    | "optionText";
  maxWidth?: string;
  disabled?: boolean;
}

const KahaniButton: React.FC<KahaniButtonProps> = ({
  size,
  onClick,
  name,
  variant,
  maxWidth,
  disabled,
}) => {
  let bgColor;
  let hoverColor;
  let activeColor;
  let textColor = WHITE;

  switch (variant) {
    case "click":
      bgColor = TEXT_MSG_COLOR;
      hoverColor = `${TEAL}`;
      activeColor = `${TEAL}`;
      break;
    case "create":
      bgColor = PURPLE;
      hoverColor = `${TEAL}`;
      activeColor = `${PURPLE}`;
      break;
    case "navigate":
      bgColor = AMBER;
      hoverColor = `${AMBER}`;
      activeColor = `${AMBER}`;
      break;
    case "selected":
      bgColor = TEAL;
      hoverColor = `${AMBER}`;
      activeColor = `${PURPLE}`;
      break;
    case "storyText":
      bgColor = LIGHT_GRAY;
      hoverColor = `${LIGHT_GRAY}`;
      activeColor = `${LIGHT_GRAY}`;
      textColor = DARK_GRAY;
      break;
    case "optionText":
      bgColor = TEXT_MSG_COLOR;
      hoverColor = `${TEXT_MSG_COLOR}`;
      activeColor = `${TEXT_MSG_COLOR}`;
      break;
    default:
      bgColor = TEAL;
      hoverColor = `${TEAL}`;
      activeColor = `${TEAL}`;
  }

  return (
    <Button
      fontFamily="sans-serif"
      bg={bgColor}
      fontWeight="semibold"
      color={textColor}
      borderRadius="full"
      transition="transform 0.15s ease-out, background 0.15s ease-out"
      onClick={onClick}
      size={size}
      maxWidth={maxWidth}
      disabled={disabled}
      _hover={{
        transform: "scale(1.05, 1.05)",
        bg: hoverColor,
      }}
      _active={{
        bg: activeColor,
        transform: "scale(1, 1)",
      }}
    >
      {name}
    </Button>
  );
};

export default KahaniButton;
