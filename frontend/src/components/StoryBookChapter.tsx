import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import KahaniTypingButton from "./toolkit/KahaniTypingButton";
import KahaniButton from "./toolkit/KahaniButton";

interface StoryBookChapterProps {
  text: string;
  isUserResponse: boolean;
  typingCallBack?: () => void;
  shouldType: boolean;
  typeSpeed: number;
  typeWait: number;
}

const StoryBookChapter: React.FC<StoryBookChapterProps> = ({
  text,
  isUserResponse,
  typingCallBack,
  shouldType,
  typeSpeed,
  typeWait,
}) => {
  return (
    <Flex
      justifyContent={isUserResponse ? "flex-end" : "flex-start"}
      width="100%"
      mb={4}
    >
      <Box>
        {shouldType ? (
          <KahaniTypingButton
            size="md"
            onClick={() => {}}
            name={text}
            disabled={true}
            variant={isUserResponse ? "optionText" : "storyText"}
            typingCallback={typingCallBack}
            maxWidth="700px"
            typeSpeed={typeSpeed}
            typeWait={typeWait}
          />
        ) : (
          <KahaniButton
            size="md"
            onClick={() => {}}
            name={text}
            disabled={true}
            variant={isUserResponse ? "optionText" : "storyText"}
            maxWidth="700px"
          />
        )}
      </Box>
    </Flex>
  );
};

export default StoryBookChapter;
