export interface StoryPreview {
  id: number;
  title: string;
  /** Opening paragraph, used for the excerpt on the home page. */
  intro: string;
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
  options: StoryOptionPreview[];
}
