// src/components/toolkit/BackToHomeButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import KahaniButton from "./KahaniButton";
import { RiHome7Fill } from "react-icons/ri";

const BackToHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <KahaniButton
      size="lg"
      onClick={() => navigate("/")}
      name={<RiHome7Fill />}
      ariaLabel="Back to all stories"
      variant="navigate"
    />
  );
};

export default BackToHomeButton;
