// Chakra theme. Everything global lives here so components can stop
// re-declaring the same fonts, radii, and focus rings.
import { extendTheme } from "@chakra-ui/react";
import { BORDER, GREEN, INK, INK_BODY, INK_FAINT, PAPER } from "./colors";

const theme = extendTheme({
  fonts: {
    heading: "'Fraunces', Georgia, serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    // Story prose. Serif at reading sizes is easier on long paragraphs.
    prose: "'Source Serif 4', Georgia, serif",
  },
  radii: {
    card: "14px",
    control: "10px",
  },
  shadows: {
    // Paper, not plastic: shadows are warm and shallow.
    card: "0 1px 2px rgba(60, 50, 30, 0.05), 0 6px 18px rgba(60, 50, 30, 0.07)",
    cardHover:
      "0 2px 4px rgba(60, 50, 30, 0.06), 0 14px 32px rgba(60, 50, 30, 0.12)",
    focus: `0 0 0 3px rgba(46, 125, 50, 0.35)`,
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: PAPER,
        color: INK_BODY,
        fontFeatureSettings: "'kern' 1, 'liga' 1",
      },
      "::selection": {
        background: "rgba(46, 125, 50, 0.18)",
      },
      // One focus ring for the whole app, and only for keyboard users.
      "*:focus": { boxShadow: "none !important" },
      "*:focus-visible": {
        outline: "none",
        boxShadow: `0 0 0 3px rgba(46, 125, 50, 0.35) !important`,
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: INK,
        letterSpacing: "-0.015em",
        fontWeight: 600,
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "white",
            borderColor: BORDER,
            borderRadius: "control",
            color: INK_BODY,
            _placeholder: { color: INK_FAINT },
            _hover: { borderColor: "#CFC6B2" },
            _focusVisible: { borderColor: GREEN, boxShadow: "none" },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          bg: "white",
          borderColor: BORDER,
          borderRadius: "control",
          color: INK_BODY,
          _placeholder: { color: INK_FAINT },
          _hover: { borderColor: "#CFC6B2" },
          _focusVisible: { borderColor: GREEN, boxShadow: "none" },
        },
      },
    },
  },
});

export default theme;
