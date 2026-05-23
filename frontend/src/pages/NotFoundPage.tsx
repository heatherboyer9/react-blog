import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NotFoundPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Not Found
        </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, the link you followed to get here must be broken.
          </Typography>
      </div>
    </Box>
  );
}
