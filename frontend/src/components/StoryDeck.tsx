// src/components/StoryDeck.tsx
import React from "react";
import StoryCard from "./StoryCard";
import { StoryOption, StoryOptionPreview, Story } from "../types/Story";

interface StoryDeckProps {
  story: Story;
  options: StoryOptionPreview[];
  storyPath: StoryOption[];
  handleOptionSelect: (depth: number, optionId: number) => void;
  onCreate: (option: StoryOption) => void;
  isOptionSelected: (optionId: number) => boolean;
  typingLevel: number[];
  setTypingLevel: (typingLevel: number[]) => void;
}

const StoryDeck: React.FC<StoryDeckProps> = ({
  story,
  options,
  storyPath,
  handleOptionSelect,
  onCreate,
  isOptionSelected,
  typingLevel,
  setTypingLevel,
}) => {
  return (
    <>
      <StoryCard // title + intro + controls
        storyId={story.id}
        title={story.title}
        paragraph={story.intro}
        optionId={null}
        options={options}
        depth={0}
        onOptionSelect={handleOptionSelect}
        onCreate={onCreate}
        isOptionSelected={isOptionSelected}
        typingLevel={typingLevel}
        setTypingLevel={setTypingLevel}
        storyPath={storyPath}
      />
      {storyPath.map((section, index) => (
        <StoryCard // sections of option name and content + controls
          key={section.id}
          storyId={story.id}
          paragraph={section.paragraph}
          optionId={section.id}
          options={section.childOptions}
          depth={index + 1}
          onOptionSelect={handleOptionSelect}
          title={section.text}
          onCreate={onCreate}
          isOptionSelected={isOptionSelected}
          typingLevel={typingLevel}
          setTypingLevel={setTypingLevel}
          storyPath={storyPath}
        />
      ))}
    </>
  );
};

export default StoryDeck;
