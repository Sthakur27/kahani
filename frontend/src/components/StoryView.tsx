// src/components/StoryView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function StoryView() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/stories/${storyId}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => console.log(error));
  }, [storyId]);

  if (!story) return <div>Loading...</div>;

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.intro}</p>
      {story.options.map((option) => (
        <div key={option.id}>
          <h2>{option.text}</h2>
          <Link to={`/story/${option.id}`}>Explore this path</Link>
        </div>
      ))}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default StoryView;
