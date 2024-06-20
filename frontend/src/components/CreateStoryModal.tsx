import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import autosize from "autosize";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Spinner,
  HStack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WHITE, DARK_GRAY, PLACEHOLDER_GRAY, DARK_GREEN } from "../colors";
import KahaniButton from "./toolkit/KahaniButton";

const CreateStoryModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/stories", {
        title,
        intro,
      });
      onClose();
      navigate(`/story/${response.data.id}`);
    } catch (error) {
      console.error("Failed to create story", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <KahaniButton
        size="lg"
        onClick={onOpen}
        name="Create New Story!"
        variant="create"
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={WHITE}>
          <ModalHeader>
            <Text color={DARK_GREEN}>Create a New Story</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" mb={4} isRequired>
              <FormLabel color={DARK_GREEN}>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter story title"
                bg={WHITE}
                borderColor={DARK_GRAY}
                color={DARK_GREEN}
                _placeholder={{ color: PLACEHOLDER_GRAY }}
              />
            </FormControl>
            <FormControl id="intro" mb={4} isRequired>
              <FormLabel color={DARK_GREEN}>Intro</FormLabel>
              <Textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Enter story intro"
                bg={WHITE}
                borderColor={DARK_GRAY}
                color={DARK_GRAY}
                _placeholder={{ color: PLACEHOLDER_GRAY }}
                ref={textareaRef}
                resize="none"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={5}>
              <KahaniButton
                size="md"
                onClick={handleSubmit}
                name={isLoading ? <Spinner size="md" /> : "Create Story"}
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

export default CreateStoryModal;
