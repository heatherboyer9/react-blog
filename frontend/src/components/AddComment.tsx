import { useState } from "react";
import { Comment } from "../apis/models/types";

export default function AddComment({
  onAddComment,
}: {
  onAddComment: (comment: Comment) => void;
}) {
  const [commentText, setCommentText] = useState("");
  const [postedBy, setPostedBy] = useState("");

  return (
    <div>
      <h3>Add a Comment</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAddComment({
            text: commentText,
            postedBy: postedBy,
          });
          event.currentTarget.reset();
        }}
      >
        <textarea
          name="commentText"
          placeholder="Enter your comment here"
          required
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <br />
        <input
          type="text"
          name="postedBy"
          placeholder="Your name"
          required
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
        />
        <br />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
