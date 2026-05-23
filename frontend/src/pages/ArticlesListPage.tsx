import { useLoaderData } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArticleList from "../components/ArticleList";
import { Article } from "../apis/models/types";
import Latest from "../components/Latest";

export default function ArticleListPage() {
  const articles = useLoaderData() as Article[];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Articles
        </Typography>
      </div>
      <ArticleList articles={articles} />
      <Latest />
    </Box>
  );
}
