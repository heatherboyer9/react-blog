export interface Article {
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
  dateCreated: string;
}

export interface ArticleAuthor {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface ArticleDetails {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  author: ArticleAuthor;
  content: string;
  dateCreated: string;
}
