import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArticleDetails } from "../apis/models/types";

export default function AboutPage() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<ArticleDetails>('https://lorem-api.com/api/article/foo');
      const paragraphs = response.data.content.split('\n');
      setData(paragraphs);
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          About
        </Typography>
        {data.map((p: string, index: number) => (
          <Typography key={index} variant="body1" gutterBottom>
            {p}
          </Typography>
        ))}
      </div>
    </Box>
  );
}
