import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import autosize from "autosize";
import {
  FormControl,
  Textarea,
  Spinner,
  HStack,
  Text,
  Flex,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import KahaniButton from "./toolkit/KahaniButton";
import {
  WHITE,
  DARK_GRAY,
  LIGHT_GRAY,
  TEXT_MSG_COLOR,
  DARK_GREEN,
} from "../colors";
import { StoryOption } from "../types/Story";
import StoryBookChapter from "./StoryBookChapter";

interface CreateStoryBookOptionProps {
  parentOptionId: number | null;
  storyId: number;
  onCreate: (option: StoryOption) => void;
  showOptionCreator: boolean;
  setShowOptionCreator: (showOptionCreator: boolean) => void;
  text: string;
  setText: (text: string) => void;
  paragraph: string;
  setParagraph: (paragraph: string) => void;
  createMode: "title" | "body" | "submit";
  setCreateMode: (createMode: "title" | "body" | "submit") => void;
}

const CreateStoryBookOption: React.FC<CreateStoryBookOptionProps> = ({
  parentOptionId,
  storyId,
  onCreate,
  showOptionCreator,
  setShowOptionCreator,
  text,
  setText,
  paragraph,
  setParagraph,
  createMode,
  setCreateMode,
}) => {
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
      setShowOptionCreator(false);
      onCreate(response.data);
    } catch (error) {
      console.error("Failed to create option", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      return <Spinner size="md" />;
    }
    if (createMode === "title") {
      return "Create Title";
    } else if (createMode === "body") {
      return "Create Body";
    } else {
      return "Submit";
    }
  };

  const getSubmitAction = () => {
    if (createMode === "title") {
      setCreateMode("body");
    } else if (createMode === "body") {
      setCreateMode("submit");
    } else if (createMode === "submit") {
      handleSubmit();
    }
  };

  return (
    <>
      {showOptionCreator && (
        <Card
          p={5}
          maxW="800px"
          width="800px"
          boxShadow="dark-lg"
          rounded="md"
          bg={WHITE}
        >
          {/* <CardHeader>
            <Text fontSize="1.5em" display="inline-block" color={DARK_GREEN}>
              Create an Option!
            </Text>
          </CardHeader> */}

          <CardBody>
            {text && createMode !== "title" && (
              <StoryBookChapter
                text={text}
                isUserResponse={true}
                typingCallBack={() => {}}
                shouldType={false}
                typeSpeed={0}
                typeWait={0}
              />
            )}

            {paragraph && createMode !== "body" && (
              <StoryBookChapter
                text={paragraph}
                isUserResponse={false}
                typingCallBack={() => {}}
                shouldType={false}
                typeSpeed={0}
                typeWait={0}
              />
            )}

            <Flex justifyContent="center" width="100%">
              {createMode === "title" && (
                <FormControl id="title" mb={4} width="100%">
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter option title"
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
              )}
              {createMode === "body" && (
                <FormControl id="paragraph" mb={4} width="100%">
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
              )}
            </Flex>
            <HStack spacing={5} justify="center" width="100%">
              <KahaniButton
                size="md"
                onClick={getSubmitAction}
                name={getButtonText()}
                variant="create"
              />
              <KahaniButton
                size="md"
                onClick={() => setShowOptionCreator(false)}
                name="Close"
                variant="navigate"
              />
              <KahaniButton
                size="md"
                onClick={() => {
                  setText("");
                  setParagraph("");
                  setCreateMode("title");
                }}
                name="Reset"
                variant="selected"
              />
            </HStack>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default CreateStoryBookOption;
