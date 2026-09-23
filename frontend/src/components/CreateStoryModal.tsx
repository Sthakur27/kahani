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
import { BORDER, CARD, INK, INK_MUTED, OVERLAY } from "../colors";
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
      const response = await axios.post("http://127.0.0.1:5000/stories", {
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
        name="Start a new story"
        variant="create"
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg={OVERLAY} backdropFilter="blur(2px)" />
        <ModalContent bg={CARD} borderRadius="card" boxShadow="cardHover" p={2}>
          <ModalHeader pb={1}>
            <Text
              as="span"
              fontFamily="heading"
              fontSize="1.5rem"
              fontWeight={600}
              color={INK}
            >
              Start a new story
            </Text>
            <Text fontSize="0.9rem" fontWeight={400} color={INK_MUTED} mt={1}>
              Write the opening. Readers add the branches from there.
            </Text>
          </ModalHeader>
          <ModalCloseButton top={4} right={4} color={INK_MUTED} />
          <ModalBody>
            <FormControl id="title" mb={5} isRequired>
              <FormLabel fontSize="0.85rem" fontWeight={600} color={INK}>
                Title
              </FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Sleep Lab at Fell Creek"
                maxLength={100}
                size="lg"
                fontSize="1rem"
              />
            </FormControl>
            <FormControl id="intro" mb={2} isRequired>
              <FormLabel fontSize="0.85rem" fontWeight={600} color={INK}>
                Opening
              </FormLabel>
              <Textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Set the scene. Where are they, and what has just gone wrong?"
                ref={textareaRef}
                resize="none"
                minH="140px"
                fontFamily="prose"
                fontSize="1rem"
                lineHeight="1.7"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor={BORDER} mt={4}>
            <HStack spacing={3}>
              <KahaniButton
                size="md"
                onClick={onClose}
                name="Cancel"
                variant="navigate"
              />
              <KahaniButton
                size="md"
                onClick={handleSubmit}
                disabled={isLoading || !title.trim() || !intro.trim()}
                name={isLoading ? <Spinner size="sm" /> : "Create story"}
                variant="create"
              />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateStoryModal;
