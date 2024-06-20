// src/components/StoryView.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Spinner, Flex, Stack } from "@chakra-ui/react";
import { Story, StoryOption } from "../types/Story";
import { MINT_GREEN, DARK_GREEN } from "../colors";
import StoryBook from "./StoryBook";
import BackToHomeButton from "./toolkit/BackToHomeButton";
import KahaniButton from "./toolkit/KahaniButton";
import { PiCardsFill } from "react-icons/pi";
import { IoBook } from "react-icons/io5";
import StoryDeck from "./StoryDeck";
import { trim } from "../utils";
import { RiSpeedMiniFill } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";
import {
  FAST_TYPE_SPEED,
  FAST_TYPE_WAIT,
  TYPE_SPEED,
  TYPE_WAIT,
} from "./constants";
import CreateStoryBookOption from "./CreateStoryBookOption";
import CreateStoryDeckOption from "./CreateStoryDeckOption";

const StoryView: React.FC = () => {
  const [bookMode, setBookMode] = useState<boolean>(true);
  const [typeFast, setTypeFast] = useState<boolean>(true);

  const typeSpeed = typeFast ? FAST_TYPE_SPEED : TYPE_SPEED;
  const typeWait = typeFast ? FAST_TYPE_WAIT : TYPE_WAIT;

  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storyPath, setStoryPath] = useState<StoryOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [typingLevel, setTypingLevel] = useState<number[]>([0]); // 0 for story start, 1 ended story, 2 for option end
  const [showOptionCreator, setShowOptionCreator] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");
  const [createMode, setCreateMode] = useState<"title" | "body" | "submit">(
    "title"
  );

  console.log(typingLevel);
  console.log(selectedOptions);
  const getStoryOption = async (optionId: number) => {
    try {
      const response = await axios.get<StoryOption>(
        `http://localhost:5000/options/${optionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching story option:", error);
    }
  };

  const isOptionSelected = (optionId: number) =>
    selectedOptions.includes(optionId);

  const handleOptionSelect = async (depth: number, optionId: number) => {
    setCreateMode("title");
    setShowOptionCreator(false);
    setText("");
    setParagraph("");

    // undo choice
    if (isOptionSelected(optionId)) {
      setStoryPath(trim(storyPath, depth));
      setSelectedOptions(trim(selectedOptions, depth));
      setTypingLevel(trim(typingLevel, depth + 1));
      return;
    }

    // choose different path in the past
    if (depth < selectedOptions.length) {
      console.log("backtrack");
      const newOption = await getStoryOption(optionId);
      if (newOption) {
        setStoryPath([...trim(storyPath, depth), newOption]);
        setSelectedOptions([...trim(selectedOptions, depth), optionId]);
        setTypingLevel([...trim(typingLevel, depth + 1), 0]);
      }
      return;
    }

    // go forward
    const newOption = await getStoryOption(optionId);
    if (newOption) {
      setStoryPath([...storyPath, newOption]);
      setSelectedOptions([...selectedOptions, optionId]);
      setTypingLevel([...typingLevel, 0]);
    }
  };

  const onCreate = (option: StoryOption) => {
    const tempStoryPath = [...storyPath];
    tempStoryPath[tempStoryPath.length - 1].childOptions.push(option);
    setStoryPath([...tempStoryPath, option]);
    setSelectedOptions([...selectedOptions, option.id]);
    setTypingLevel([...typingLevel, 0]);
    setCreateMode("title");
    setShowOptionCreator(false);
    setText("");
    setParagraph("");
  };

  useEffect(() => {
    axios
      .get<Story>(`http://localhost:5000/stories/${storyId}`)
      .then((response) => {
        setStory(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
        setIsLoading(false);
      });
  }, [storyId]);

  if (isLoading) return <Spinner size="xl" />;

  if (!story) return <Box>Story not found</Box>;

  // console.log({ path: [story.intro, ...storyPath.map((s) => s.text)] });

  return (
    <Flex
      bgColor={MINT_GREEN}
      minH="100vh"
      color={DARK_GREEN}
      align="center"
      justify="center"
      position="relative"
    >
      <Box position="fixed" top="35px" right="30px" zIndex="1000">
        <Stack>
          <BackToHomeButton />
          <KahaniButton
            size="lg"
            onClick={() => setBookMode(!bookMode)}
            name={bookMode ? <IoBook /> : <PiCardsFill />}
            variant={bookMode ? "click" : "create"}
          />
          <KahaniButton
            size="lg"
            onClick={() => setTypeFast(!typeFast)}
            name={typeFast ? <RiSpeedMiniFill /> : <RiPencilFill />}
            variant={typeFast ? "create" : "click"}
          />
        </Stack>
      </Box>
      <Box p={5} maxW="800px" width="100%">
        <Stack spacing={5} align="center">
          {bookMode ? (
            <Stack>
              <StoryBook
                story={story}
                storyPath={storyPath}
                onOptionSelect={handleOptionSelect}
                onCreate={onCreate}
                isOptionSelected={isOptionSelected}
                typingLevel={typingLevel}
                setTypingLevel={setTypingLevel}
                typeSpeed={typeSpeed}
                typeWait={typeWait}
                showOptionCreator={showOptionCreator}
                setShowOptionCreator={setShowOptionCreator}
              />
              <CreateStoryBookOption
                storyId={story.id}
                parentOptionId={
                  storyPath.length ? storyPath[storyPath.length - 1].id : null
                }
                onCreate={onCreate}
                showOptionCreator={showOptionCreator}
                setShowOptionCreator={setShowOptionCreator}
                text={text}
                setText={setText}
                paragraph={paragraph}
                setParagraph={setParagraph}
                createMode={createMode}
                setCreateMode={setCreateMode}
              />
            </Stack>
          ) : (
            <Stack>
              <StoryDeck
                story={story}
                options={story.options}
                storyPath={storyPath}
                handleOptionSelect={handleOptionSelect}
                isOptionSelected={isOptionSelected}
                typingLevel={typingLevel}
                setTypingLevel={setTypingLevel}
                typeSpeed={typeSpeed}
                typeWait={typeWait}
                showOptionCreator={showOptionCreator}
                setShowOptionCreator={setShowOptionCreator}
              />
              <CreateStoryDeckOption
                storyId={story.id}
                parentOptionId={story.id}
                onCreate={onCreate}
                showOptionCreator={showOptionCreator}
                setShowOptionCreator={setShowOptionCreator}
                text={text}
                setText={setText}
                paragraph={paragraph}
                setParagraph={setParagraph}
                createMode={createMode}
                setCreateMode={setCreateMode}
              />
            </Stack>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default StoryView;
