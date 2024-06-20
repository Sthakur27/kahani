// src/components/StoryDeck.tsx
import React from "react";
import StoryCard from "./StoryCard";
import { StoryOption, StoryOptionPreview, Story } from "../types/Story";

interface StoryDeckProps {
  story: Story;
  options: StoryOptionPreview[];
  storyPath: StoryOption[];
  handleOptionSelect: (depth: number, optionId: number) => void;
  isOptionSelected: (optionId: number) => boolean;
  typingLevel: number[];
  setTypingLevel: (typingLevel: number[]) => void;
  typeSpeed: number;
  typeWait: number;
  showOptionCreator: boolean;
  setShowOptionCreator: (showOptionCreator: boolean) => void;
}

const StoryDeck: React.FC<StoryDeckProps> = ({
  story,
  options,
  storyPath,
  handleOptionSelect,
  isOptionSelected,
  typingLevel,
  setTypingLevel,
  typeSpeed,
  typeWait,
  showOptionCreator,
  setShowOptionCreator,
}) => {
  return (
    <>
      <StoryCard // title + intro + controls
        title={story.title}
        paragraph={story.intro}
        options={options}
        depth={0}
        onOptionSelect={handleOptionSelect}
        isOptionSelected={isOptionSelected}
        typingLevel={typingLevel}
        setTypingLevel={setTypingLevel}
        storyPath={storyPath}
        typeSpeed={typeSpeed}
        typeWait={typeWait}
        showOptionCreator={showOptionCreator}
        setShowOptionCreator={setShowOptionCreator}
        isStoryStarted={true}
      />
      {storyPath.map((section, index) => (
        <StoryCard // sections of option name and content + controls
          key={section.id}
          paragraph={section.paragraph}
          options={section.childOptions}
          depth={index + 1}
          onOptionSelect={handleOptionSelect}
          title={section.text}
          isOptionSelected={isOptionSelected}
          typingLevel={typingLevel}
          setTypingLevel={setTypingLevel}
          storyPath={storyPath}
          typeSpeed={typeSpeed}
          typeWait={typeWait}
          showOptionCreator={showOptionCreator}
          setShowOptionCreator={setShowOptionCreator}
          isStoryStarted={false}
        />
      ))}
    </>
  );
};

export default StoryDeck;
