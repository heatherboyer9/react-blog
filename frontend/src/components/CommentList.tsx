import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import { Comment } from "../apis/models/types";

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Typography variant="h4" gutterBottom>Comments</Typography>
      {comments.map((comment: Comment, key: number) => (
        <CommentItem
          key={key}
          name={comment.postedBy}
          avatar={`https://i.pravatar.cc/150?u=${comment.postedBy}`}
          text={comment.text}
          date={new Date(comment.dateCreated).toLocaleString()}
        />
      ))}
    </List>
  );
}

const CommentItem = ({ name, avatar, text, date }: { name: string; avatar: string; text: string; date: string }) => {
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography sx={{ display: 'inline', fontWeight: 'bold' }} component="span" variant="body1">
                {name}
              </Typography>
              <Typography sx={{ display: 'inline', color: 'text.secondary', ml: 1 }} component="span" variant="body2">
                {date}
              </Typography>
            </>
          }
          secondary={
            <Typography sx={{ display: 'block', mt: 0.5 }} variant="body2" color="text.primary">
              {text}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
