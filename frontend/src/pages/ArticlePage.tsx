import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useUser } from "../hooks/useUser";
import { Article } from "../apis/models/types";
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

  async function onAddComment(text: string, postedBy: string, dateCreated: string) {
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
        dateCreated,
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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div>
          <Typography variant="h1" gutterBottom>
            {article.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
              Upvotes: {upvotes}
            </Typography>
            {showUpvote && (
              <button onClick={onUpvoteClicked}>Upvote</button>
            )}
          </Box>
          {article.content.map((p: string, index: number) => (
            <Typography key={index} variant="body1" gutterBottom>
              {p}
            </Typography>
          ))}
        </div>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
      </Box>
      {user && (
        <AddComment
          onAddComment={(comment) =>
            onAddComment(comment.text, comment.postedBy, comment.dateCreated)
          }
        />
      )}
      <CommentList comments={comments} />
    </>
  );
}
