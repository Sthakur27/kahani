import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import StoryView from "./components/StoryView";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/story/:storyId" component={StoryView} />
      </Switch>
    </Router>
  );
}

export default App;
