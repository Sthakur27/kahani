import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStory: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/stories", {
        title,
        intro,
      });
      console.log("Story created", response.data);
      // navigate("/"); // Navigate back to the homepage or to the new story view
    } catch (error) {
      console.error("Failed to create story", error);
    }
  };

  return (
    <div>
      <h1>Create a New Story</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Intro:
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Story</button>
      </form>
    </div>
  );
};

export default CreateStory;
