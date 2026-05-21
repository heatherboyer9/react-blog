import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import { Article, Comment } from "../apis/models/types";
import CommentList from "../components/CommentList";
import AddComment from "../components/AddComment";

export default function ArticlePage() {
  const loadedArticle = useLoaderData() as Article;
  const [article, setArticle] = useState(loadedArticle);
  const [upvotes, setUpvotes] = useState(article.upvotes);
  const [comments, setComments] = useState(article.comments);
  const [showUpvote, setShowUpvote] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (user && article) {
      // Check if the user has already upvoted the article
      const hasUpvoted = article.upVoteIds.includes(user.uid);
      setShowUpvote(!hasUpvoted);
    }
  }, [user, article]);

  async function onUpvoteClicked() {
    const token = user && (await user.getIdToken());

    if (!token) {
      alert("You must be logged in to upvote");
      return;
    }

    const authHeader = { Authorization: `Bearer ${token}` };
    const response = await axios.post(
      `/api/articles/${article.name}/upvote`,
      null,
      { headers: authHeader },
    );
    const updatedArticle = response.data;
    // Update the article data with the new upvote count
    setArticle(updatedArticle);
    setUpvotes(updatedArticle.upvotes);
  }

  async function onAddComment(text: string, postedBy: string) {
    const token = user && (await user.getIdToken());

    if (!token) {
      alert("You must be logged in to comment");
      return;
    }

    const authHeader = { Authorization: `Bearer ${token}` };
    const response = await axios.post(
      `/api/articles/${article.name}/comments`,
      {
        text,
        postedBy,
      },
      { headers: authHeader },
    );
    const updatedArticle = response.data;
    // Update the article data with the new comment
    setArticle(updatedArticle);
    setComments(updatedArticle.comments);
  }

  if (!article) return <div>Article not found</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      {article.content.map((paragraph: string, key: number) => (
        <p key={key}>{paragraph}</p>
      ))}
      <button onClick={onUpvoteClicked} disabled={!showUpvote}>
        Upvote
      </button>
      <span> This article has {upvotes} upvote(s)</span>
      {user ? (
        <AddComment
          onAddComment={(comment) =>
            onAddComment(comment.text, comment.postedBy)
          }
        />
      ) : (
        <p>You must be logged in to add a comment</p>
      )}
      <CommentList comments={comments as Comment[]} />
    </div>
  );
}
