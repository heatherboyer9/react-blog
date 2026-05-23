import { Article } from "../apis/models/types";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export default function ArticleList({ articles }: { articles: Article[] }) {
  const navigate = useNavigate();
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
      null,
    );
  
    const handleFocus = (index: number) => {
      setFocusedCardIndex(index);
    };
  
    const handleBlur = () => {
      setFocusedCardIndex(null);
    };

  return (
    <Grid container spacing={2} columns={12}>
      {articles.map((article: Article, index: number) => (
        <Grid key={index} size={{ xs: 12, md: 6 }}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === index ? 'Mui-focused' : ''}
            onClick={() => { navigate(`/articles/${article.name}`); }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={`https://picsum.photos/800/450?random=${index}`}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h6" component="div">
                {article.title}
              </Typography>
              <StyledTypography
                variant="body2"
                gutterBottom
                sx={{ color: 'text.secondary' }}
              >
                {article.content[0].substring(0, 150)} ...
              </StyledTypography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
