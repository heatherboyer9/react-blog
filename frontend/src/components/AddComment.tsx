import { useState } from "react";
import { Comment } from "../apis/models/types";
import {Box, Button, TextField, Typography } from '@mui/material';


export default function AddComment({
  onAddComment,
}: {
  onAddComment: (comment: Comment) => void;
}) {
  const [commentText, setCommentText] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [commentErrorMessage, setCommentErrorMessage] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }
    
    onAddComment({
      text: commentText,
      postedBy: postedBy,
      dateCreated: new Date().toISOString(),
    });
    setCommentText("");
    setPostedBy("");
  };

  const validateInputs = () => {
    let isValid = true;

    if (!postedBy || postedBy.trim() === "") {
      setNameError(true);
      setNameErrorMessage('Please enter your name.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!commentText || commentText.trim() === "") {
      setCommentError(true);
      setCommentErrorMessage('Please enter a comment.');
      isValid = false;
    } else {
      setCommentError(false);
      setCommentErrorMessage('');
    }

    return isValid;
  };

  return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" gutterBottom>Add a Comment</Typography>
        <TextField
          label="Your name"
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
          variant="outlined"
          fullWidth
          error={nameError}
          helperText={nameErrorMessage}
        />
        <TextField
          label="Add a comment"
          multiline
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          fullWidth
          error={commentError}
          helperText={commentErrorMessage}
        />
        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end' }}>
          Post Comment
        </Button>
      </Box>
  );
}
