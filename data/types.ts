export interface Article {
  name: string;
  title: string;
  content: string[];
  upvotes: number;
  comments: Comment[];
}

export interface Comment{
  postedBy: string;
  text: string;
}
