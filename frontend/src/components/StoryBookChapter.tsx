import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import KahaniTypingButton from "./toolkit/KahaniTypingButton";

interface StoryBookChapterProps {
  text: string;
  isUserResponse: boolean;
  typingCallBack?: () => void;
}

const StoryBookChapter: React.FC<StoryBookChapterProps> = ({
  text,
  isUserResponse,
  typingCallBack,
}) => {
  return (
    <Flex
      justifyContent={isUserResponse ? "flex-end" : "flex-start"}
      width="100%"
      mb={4}
    >
      <Box>
        <KahaniTypingButton
          size="md"
          onClick={() => {}}
          name={text}
          disabled={true}
          variant={isUserResponse ? "optionText" : "storyText"}
          typingCallback={typingCallBack}
        />
      </Box>
    </Flex>
  );
};

export default StoryBookChapter;
