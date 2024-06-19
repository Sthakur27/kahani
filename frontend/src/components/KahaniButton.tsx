// src/components/KahaniButton.tsx
import React from "react";
import { Button } from "@chakra-ui/react";
import { TEAL, WHITE, PURPLE, AMBER } from "../colors";

interface KahaniButtonProps {
  size: string;
  onClick: () => void;
  name: React.ReactNode;
  variant: "click" | "create" | "navigate";
}

const KahaniButton: React.FC<KahaniButtonProps> = ({
  size,
  onClick,
  name,
  variant,
}) => {
  let bgColor;
  let hoverColor;
  let activeColor;

  switch (variant) {
    case "click":
      bgColor = TEAL;
      hoverColor = `${TEAL}`;
      activeColor = `${TEAL}`;
      break;
    case "create":
      bgColor = PURPLE;
      hoverColor = `${PURPLE}`;
      activeColor = `${PURPLE}`;
      break;
    case "navigate":
      bgColor = AMBER;
      hoverColor = `${AMBER}`;
      activeColor = `${AMBER}`;
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
      color={WHITE}
      borderRadius="3xl"
      transition="transform 0.15s ease-out, background 0.15s ease-out"
      onClick={onClick}
      size={size}
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
