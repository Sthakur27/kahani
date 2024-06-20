import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import autosize from "autosize";
import {
  FormControl,
  Textarea,
  Spinner,
  Stack,
  HStack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import KahaniButton from "./KahaniButton";
import {
  WHITE,
  TEAL,
  DARK_GRAY,
  PLACEHOLDER_GRAY,
  LIGHT_GRAY,
  TEXT_MSG_COLOR,
} from "../../colors";
import { StoryOption } from "../../types/Story";

interface OptionCreator2Props {
  parentOptionId: number | null;
  storyId: number;
  onCreate: (option: StoryOption) => void;
  showInputs: boolean;
  setShowInputs: (showInputs: boolean) => void;
}

const OptionCreator2: React.FC<OptionCreator2Props> = ({
  parentOptionId,
  storyId,
  onCreate,
  showInputs,
  setShowInputs,
}) => {
  const [text, setText] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef2 = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
    if (textareaRef2.current) {
      autosize(textareaRef2.current);
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post<StoryOption>(
        "http://localhost:5000/options",
        {
          text,
          paragraph,
          parent_option_id: parentOptionId,
          story_id: storyId,
        }
      );
      setShowInputs(false);
      onCreate(response.data);
    } catch (error) {
      console.error("Failed to create option", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showInputs && (
        <Stack spacing={4} width="100%">
          <Divider colorScheme="cyan" />
          <Flex justifyContent="flex-end" width="100%">
            <FormControl id="text" mb={4} width="500px">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter option text"
                bg={TEXT_MSG_COLOR}
                borderColor={LIGHT_GRAY}
                color={WHITE}
                _placeholder={{ color: WHITE }}
                width="100%"
                height="auto"
                fontSize="1em"
                fontWeight="bold"
                fontFamily="sans-serif"
                overflow="hidden"
                ref={textareaRef2}
                borderRadius="15px"
              />
            </FormControl>
          </Flex>
          <Divider color={DARK_GRAY} />
          <Flex justifyContent="flex-start" width="100%">
            <FormControl id="paragraph" mb={4} width="500px">
              <Textarea
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                placeholder="Enter option paragraph"
                bg={LIGHT_GRAY}
                borderColor={LIGHT_GRAY}
                color={DARK_GRAY}
                _placeholder={{ color: DARK_GRAY }}
                width="100%"
                fontSize="1em"
                fontWeight="bold"
                fontFamily="sans-serif"
                height="auto"
                overflow="hidden"
                ref={textareaRef}
                borderRadius="15px"
              />
            </FormControl>
          </Flex>
          <HStack spacing={5} justify="center" width="100%">
            <KahaniButton
              size="md"
              onClick={handleSubmit}
              name={isLoading ? <Spinner size="md" /> : "Create Option"}
              variant="create"
            />
            <KahaniButton
              size="md"
              onClick={() => setShowInputs(false)}
              name="Close"
              variant="navigate"
            />
          </HStack>
        </Stack>
      )}
    </>
  );
};

export default OptionCreator2;
