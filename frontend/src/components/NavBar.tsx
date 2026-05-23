import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useUser } from "../hooks/useUser";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function NavBar() {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => navigate("/about")}>
                About
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => navigate("/articles")}>
                Articles
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <span>Loading...</span>
              ) : (
                <>
                  {user && <span>Logged in as {user.email}</span>}
              {user ? (
                <Button color="primary" variant="text" size="small" onClick={() => signOut(getAuth())}>
                Sign Out
              </Button>
              ) : (
                <>
              <Button color="primary" variant="text" size="small" onClick={() => navigate("/login")}>
                Sign in
              </Button>
              <Button color="primary" variant="contained" size="small" onClick={() => navigate("/create-account")}>
                Sign up
              </Button>
              </>
              )}
                </>
              )}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
