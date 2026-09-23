import React from "react";
import { Button } from "@chakra-ui/react";
import {
  BORDER,
  CLAY,
  CLAY_DEEP,
  GREEN,
  GREEN_DEEP,
  GREEN_WASH,
  INK,
  INK_BODY,
  PAPER_SUNK,
  WHITE,
} from "../../colors";

interface KahaniButtonProps {
  size: string;
  onClick?: () => void;
  name: React.ReactNode;
  variant:
    | "click"
    | "create"
    | "navigate"
    | "selected"
    | "storyText"
    | "optionText";
  maxWidth?: string;
  width?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

// One entry per variant instead of a switch that reassigns four locals.
// Hover darkens the same hue rather than jumping to a different color, so a
// hover reads as "this is the thing under your cursor" and not as a state
// change.
const VARIANTS: Record<
  KahaniButtonProps["variant"],
  {
    bg: string;
    color: string;
    hoverBg: string;
    borderColor?: string;
    /** Primary actions get weight; quiet ones stay out of the way. */
    fontWeight?: number;
    /** Story text is rendered in a disabled button shell by StoryBookChapter.
     *  It is prose, not a dead control, so it keeps serif type and full
     *  contrast. */
    prose?: boolean;
  }
> = {
  // The main "do the thing" button.
  create: { bg: GREEN, color: WHITE, hoverBg: GREEN_DEEP, fontWeight: 600 },
  // A story choice waiting to be picked.
  click: {
    bg: WHITE,
    color: INK,
    hoverBg: GREEN_WASH,
    borderColor: BORDER,
    fontWeight: 500,
  },
  // The choice already taken on this path.
  selected: {
    bg: GREEN_WASH,
    color: INK,
    hoverBg: GREEN_WASH,
    borderColor: GREEN,
    fontWeight: 600,
  },
  // Paging arrows, back, mode toggles: present but not competing.
  navigate: {
    bg: "transparent",
    color: INK,
    hoverBg: PAPER_SUNK,
    borderColor: BORDER,
    fontWeight: 500,
  },
  // Narration, rendered in a button shell by StoryBookChapter.
  storyText: {
    bg: PAPER_SUNK,
    color: INK_BODY,
    hoverBg: PAPER_SUNK,
    fontWeight: 400,
    prose: true,
  },
  // The choice the reader took, shown back to them on the other side.
  optionText: {
    bg: CLAY,
    color: WHITE,
    hoverBg: CLAY_DEEP,
    fontWeight: 400,
    prose: true,
  },
};

const KahaniButton: React.FC<KahaniButtonProps> = ({
  size,
  onClick,
  name,
  variant,
  maxWidth,
  disabled,
  width,
  ariaLabel,
}) => {
  const style = VARIANTS[variant] ?? VARIANTS.click;
  // Text reads from the left edge; an icon on its own should stay centered.
  const isTextLabel = typeof name === "string";

  return (
    <Button
      onClick={onClick}
      size={size}
      aria-label={ariaLabel}
      disabled={disabled}
      maxWidth={maxWidth}
      width={width}
      height="auto"
      minH="44px"
      padding={style.prose ? "16px 20px" : "10px 18px"}
      whiteSpace="normal"
      textAlign={isTextLabel ? "left" : "center"}
      justifyContent={isTextLabel ? "flex-start" : "center"}
      fontFamily={style.prose ? "prose" : "body"}
      fontSize={style.prose ? "1.05rem" : "0.95rem"}
      fontWeight={style.fontWeight ?? 500}
      lineHeight={style.prose ? "1.7" : "1.4"}
      letterSpacing={style.prose ? "0" : "-0.005em"}
      borderRadius={style.prose ? "card" : "control"}
      borderWidth={style.borderColor ? "1px" : 0}
      borderColor={style.borderColor}
      bg={style.bg}
      color={style.color}
      boxShadow="none"
      transition="background 0.18s ease, border-color 0.18s ease, transform 0.18s ease"
      cursor={style.prose ? "default" : undefined}
      _hover={
        style.prose
          ? {}
          : {
              bg: style.hoverBg,
              borderColor: style.borderColor ? GREEN : undefined,
              transform: "translateY(-1px)",
            }
      }
      _active={style.prose ? {} : { transform: "translateY(0)" }}
      // Prose keeps full contrast even though it is passed disabled=true.
      _disabled={
        style.prose
          ? { opacity: 1, cursor: "default" }
          : { opacity: 0.45, cursor: "not-allowed", transform: "none" }
      }
    >
      {name}
    </Button>
  );
};

export default KahaniButton;
