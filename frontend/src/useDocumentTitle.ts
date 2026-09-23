import { useEffect } from "react";

const DEFAULT_TITLE = "Kahani";

/**
 * Sets the browser tab title. Pass a story title to show it while that story
 * is open; pass nothing (or null while it loads) to fall back to "Kahani".
 * The tab goes back to "Kahani" on unmount, so leaving a story does not strand
 * its title in the tab.
 */
export function useDocumentTitle(title?: string | null) {
  useEffect(() => {
    document.title = title?.trim() ? title : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}

export default useDocumentTitle;
