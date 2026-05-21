export interface Article {
  id?: string;
  name: string;
  title: string;
  content: string[];
  upvotes: number;
  upVoteIds: string[];
  comments: Comment[];
}

export interface Comment{
  postedBy: string;
  text: string;
}
