// src/components/HomePage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { StoryPreview } from "../types/Story";

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<StoryPreview[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/stories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Top Level Stories</h1>
      <Link to="/create-story">Create New Story</Link>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/story/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
