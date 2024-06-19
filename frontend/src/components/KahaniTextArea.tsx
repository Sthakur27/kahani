// src/components/KahaniTextArea.tsx
import React from "react";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import {
  LIGHT_GRAY,
  TEAL,
  DARK_GRAY,
  WHITE,
  PLACEHOLDER_GRAY,
} from "../colors";

interface KahaniTextAreaProps extends TextareaProps {
  variant?: "default";
}

const KahaniTextArea: React.FC<KahaniTextAreaProps> = ({
  variant = "default",
  ...props
}) => {
  // Define colors based on variant
  let bgColor, borderColor, textColor, placeholderColor;

  switch (variant) {
    case "default":
    default:
      bgColor = LIGHT_GRAY;
      borderColor = TEAL;
      textColor = DARK_GRAY;
      placeholderColor = PLACEHOLDER_GRAY;
      break;
  }

  return (
    <Textarea
      bg={bgColor}
      borderColor={borderColor}
      color={textColor}
      _placeholder={{ color: placeholderColor }}
      {...props}
    />
  );
};

export default KahaniTextArea;
