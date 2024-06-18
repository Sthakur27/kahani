// src/components/OptionView.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { StoryOptionDetail } from "../types/Story";
import CreateOption from "./CreateOption";

const StoryOptionView: React.FC = () => {
  const { optionId } = useParams<{ optionId: string }>();
  const [option, setOption] = useState<StoryOptionDetail | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/options/${optionId}`)
      .then((response) => {
        setOption(response.data);
      })
      .catch((error) => console.log(error));
  }, [optionId]);

  if (!option) return <Box>Loading...</Box>;

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>
        {option.storyTitle}
      </Heading>
      <Heading as="h2" mb={4}>
        {option.text}
      </Heading>
      <Text mb={4}>{option.paragraph}</Text>
      <Text mb={4}>
        <strong>Part of Story:</strong> {option.storyTitle}
      </Text>
      {option.parentOptionText && (
        <Text mb={4}>
          <strong>Parent Option:</strong> {option.parentOptionText} (
          <Link
            as={RouterLink}
            to={`/option/${option.parentOptionId}`}
            color="teal.500"
          >
            Go to Parent Option
          </Link>
          )
        </Text>
      )}

      {option.childOptions.length > 0 && (
        <>
          <Heading as="h4" size="md" mb={4}>
            Existing Child Options:
          </Heading>
          <List spacing={3} mb={4}>
            {option.childOptions.map((child) => (
              <ListItem key={child.id}>
                <Link
                  as={RouterLink}
                  to={`/option/${child.id}`}
                  color="teal.500"
                >
                  {child.text}
                </Link>
              </ListItem>
            ))}
          </List>
        </>
      )}

      <CreateOption storyId={option.storyId} parentOptionId={option.id} />

      <Button as={RouterLink} to="/" colorScheme="teal" mt={5}>
        Back to Home
      </Button>
    </Box>
  );
};

export default StoryOptionView;
