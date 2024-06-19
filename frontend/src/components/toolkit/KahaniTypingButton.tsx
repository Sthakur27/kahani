// src/components/toolkit/KahaniTypingButton.tsx
import React from "react";
import { TypeAnimation } from "react-type-animation";
import KahaniButton from "./KahaniButton";
import { TYPE_SPEED, TYPE_WAIT } from "../constants";

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
}

const KahaniTypingButton: React.FC<KahaniTypingButtonProps> = ({
  size,
  onClick,
  name,
  variant,
  maxWidth,
  disabled,
  typingCallback,
}) => {
  const buttonContent = typingCallback ? (
    <TypeAnimation
      sequence={[name, TYPE_WAIT, typingCallback]}
      cursor={false}
      speed={TYPE_SPEED}
    />
  ) : (
    <TypeAnimation
      sequence={[name, TYPE_WAIT]}
      cursor={false}
      speed={TYPE_SPEED}
    />
  );

  return (
    <KahaniButton
      size={size}
      onClick={onClick}
      name={buttonContent}
      variant={variant}
      maxWidth={maxWidth}
      disabled={disabled}
    />
  );
};

export default KahaniTypingButton;
