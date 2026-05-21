import { Comment } from "../apis/models/types";

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment: Comment, key: number) => (
        <div key={key}>
          <p>{comment.text}</p>
          <h4>Posted by {comment.postedBy}</h4>
        </div>
      ))}
    </div>
  );
}
