// src/components/toolkit/OptionCreator.tsx
import React, { useState } from "react";
import axios from "axios";
import { TiPlus } from "react-icons/ti";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import KahaniButton from "./KahaniButton";
import {
  WHITE,
  TEAL,
  DARK_GRAY,
  PLACEHOLDER_GRAY,
  DARK_GREEN,
  GREEN_SEA,
} from "../../colors";
import KahaniTextArea from "./KahaniTextArea";
import { StoryOption } from "../../types/Story";

interface OptionCreatorProps {
  parentOptionId: number | null;
  storyId: number;
  onCreate: (option: StoryOption) => void;
}

const OptionCreator: React.FC<OptionCreatorProps> = ({
  parentOptionId,
  storyId,
  onCreate,
}) => {
  const [text, setText] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      onClose();
      onCreate(response.data);
    } catch (error) {
      console.error("Failed to create option", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <KahaniButton
        size="md"
        onClick={onOpen}
        name={<TiPlus />}
        variant="create"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={DARK_GREEN}>
          <ModalHeader>Create a New Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="text" mb={4} isRequired>
                <FormLabel color={WHITE}>Option Text</FormLabel>
                <Input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter option text"
                  bg={WHITE}
                  borderColor={TEAL}
                  color={DARK_GRAY}
                  _placeholder={{ color: PLACEHOLDER_GRAY }}
                />
              </FormControl>
              <FormControl id="paragraph" mb={4} isRequired>
                <FormLabel color={WHITE}>Option Paragraph</FormLabel>
                <KahaniTextArea
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                  placeholder="Enter option paragraph"
                  variant="default"
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={5} align="justify">
              <KahaniButton
                size="md"
                onClick={handleSubmit}
                name={isLoading ? <Spinner size="md" /> : "Create Option"}
                variant="create"
              />
              <KahaniButton
                size="md"
                onClick={onClose}
                name="Close"
                variant="navigate"
              />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OptionCreator;
