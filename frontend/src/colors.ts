// Kahani palette.
//
// The app is a place to read and write prose, so the page is paper and the
// green is reserved for things you can act on. Contrast ratios below are
// against PAPER unless stated otherwise; 4.5:1 is the readable floor for body
// text, 3:1 for large text and UI edges.

// Surfaces
export const PAPER = "#F5F2EA"; // page background
export const CARD = "#FFFFFF"; // raised surfaces: cards, modals
export const PAPER_SUNK = "#EDE8DC"; // input wells, hover on paper
export const BORDER = "#DFD8C8"; // hairlines on paper
export const OVERLAY = "rgba(31, 30, 26, 0.55)"; // modal scrim

// Ink
export const INK = "#1F4D2B"; // headings, 8.7:1
export const INK_BODY = "#33312B"; // body prose, 11.2:1
export const INK_MUTED = "#6B675C"; // captions, metadata, 4.6:1
export const INK_FAINT = "#9A958A"; // placeholders, disabled

// Accents
export const GREEN = "#2E7D32"; // primary action, white text 5.1:1
export const GREEN_DEEP = "#235E26"; // its hover/pressed state
export const GREEN_WASH = "#E4EDE2"; // selected/tinted backgrounds
export const CLAY = "#A8521F"; // secondary action, white text 5.0:1
export const CLAY_DEEP = "#8A421A";

export const WHITE = "#FFFFFF";

// Older names kept as aliases so components that still import them keep
// working. New code should use the names above.
export const MINT_GREEN = PAPER;
export const DARK_GREEN = INK;
export const TEXT_MSG_COLOR = GREEN;
export const LIGHT_GRAY = PAPER_SUNK;
export const DARK_GRAY = INK_BODY;
export const PLACEHOLDER_GRAY = INK_FAINT;
export const TEAL = GREEN_DEEP;
export const PURPLE = CLAY;
export const AMBER = CLAY;
export const GREEN_SEA = GREEN;
