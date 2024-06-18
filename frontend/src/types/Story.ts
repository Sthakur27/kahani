export interface StoryPreview {
  id: number;
  title: string;
}

export interface StoryOption {
  id: number;
  text: string;
  paragraph: string;
  storyId: number;
  storyTitle: string;
}

export interface Story extends StoryPreview {
  intro: string; // Assuming stories have an 'intro' field
  options: StoryOption[];
}

export interface StoryOptionDetail extends StoryOption {
  storyTitle: string;
  parentOptionId?: number;
  parentOptionText?: string;
  childOptions: StoryOption[];
}
