import React from "react";
import { Button } from "@chakra-ui/react";
import { DARK_GREEN, MINT_GREEN, TEAL, WHITE, PURPLE } from "../colors";

interface KahaniButtonProps {
  size: string;
  onClick: () => void;
  name: string;
}

const KahaniButton: React.FC<KahaniButtonProps> = ({ size, onClick, name }) => {
  const buttonColor = TEAL;

  return (
    <Button
      fontFamily="sans-serif"
      bg={buttonColor}
      fontWeight="semibold"
      color={WHITE}
      borderRadius="3xl"
      transition="transform 0.15s ease-out, background 0.15s ease-out"
      onClick={onClick}
      size={size}
      _hover={{
        transform: "scale(1.05, 1.05)",
        bg: `${buttonColor}`,
      }}
      _active={{
        bg: `${buttonColor}`,
        transform: "scale(1, 1)",
      }}
    >
      {name}
    </Button>
  );
};

export default KahaniButton;
