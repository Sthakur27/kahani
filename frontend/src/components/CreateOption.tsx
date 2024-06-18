import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

interface CreateOptionProps {
  storyId: number;
  parentOptionId?: number;
}

const CreateOption: React.FC<CreateOptionProps> = ({
  storyId,
  parentOptionId,
}) => {
  const [text, setText] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/options", {
        text,
        paragraph,
        story_id: storyId,
        parent_option_id: parentOptionId,
      });
      toast({
        title: "Option created.",
        description: "Your new option has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/option/${response.data.id}`);
    } catch (error) {
      toast({
        title: "Error creating option.",
        description:
          "There was an error creating your option. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={5}>
      <FormControl id="option-text" mb={3}>
        <FormLabel>Option Text</FormLabel>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </FormControl>
      <FormControl id="option-paragraph" mb={3}>
        <FormLabel>Option Paragraph</FormLabel>
        <Textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="teal">
        Create Option
      </Button>
    </Box>
  );
};

export default CreateOption;
