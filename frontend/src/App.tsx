// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import StoryView from "./components/StoryView";
import CreateStory from "./components/CreateStoryModal";
// import StoryOptionView from "./components/StoryOptionView";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/story/:storyId" Component={StoryView} />
        {/* <Route path="/option/:optionId" element={<StoryOptionView />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
