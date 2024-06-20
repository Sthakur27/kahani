// src/components/toolkit/KahaniTypingButton.tsx
import React from "react";
import { TypeAnimation } from "react-type-animation";
import KahaniButton from "./KahaniButton";
import { TYPE_SPEED, TYPE_WAIT } from "../constants";
import { Box } from "@chakra-ui/react";

interface KahaniTypingButtonProps {
  size: string;
  onClick?: () => void;
  name: string;
  variant:
    | "click"
    | "create"
    | "navigate"
    | "selected"
    | "storyText"
    | "optionText";
  maxWidth?: string;
  disabled?: boolean;
  typingCallback?: () => void;
  typeSpeed: number;
  typeWait: number;
}

const KahaniTypingButton: React.FC<KahaniTypingButtonProps> = ({
  size,
  onClick,
  name,
  variant,
  maxWidth,
  disabled,
  typingCallback,
  typeSpeed,
  typeWait,
}) => {
  const buttonContent = typingCallback ? (
    <TypeAnimation
      sequence={[name, typeWait, typingCallback]}
      cursor={false}
      // @ts-ignore
      speed={typeSpeed}
    />
  ) : (
    <TypeAnimation
      sequence={[name, typeWait]}
      cursor={false}
      // @ts-ignore
      speed={typeSpeed}
    />
  );

  return (
    <KahaniButton
      size={size}
      onClick={onClick}
      name={
        <Box maxWidth={maxWidth} overflowY="auto">
          {buttonContent}
        </Box>
      }
      variant={variant}
      maxWidth={maxWidth}
      disabled={disabled}
    />
  );
};

export default KahaniTypingButton;
