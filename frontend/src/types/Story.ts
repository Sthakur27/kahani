export interface StoryPreview {
  id: number;
  title: string;
}
export interface StoryOptionPreview {
  id: number;
  text: string;
  // upvotes etc
}

export interface StoryOption extends StoryOptionPreview {
  paragraph: string;
  childOptions: StoryOptionPreview[];
}

export interface Story extends StoryPreview {
  intro: string; // Assuming stories have an 'intro' field
  options: StoryOptionPreview[];
}
