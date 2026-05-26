import { useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  MenuList,
  MenuItem,
  Divider,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useUser } from "../hooks/useUser";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function NavBar() {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: { xs: 0, md: "calc(var(--template-frame-height, 0px) + 28px)" },
        left: 0,
        right: 0,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate("/about")}
              >
                About
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate("/articles")}
              >
                Articles
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                {user && (
                  <span>Logged in as {user.displayName || user.email}</span>
                )}
                {user ? (
                  <>
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </Button>
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      onClick={() => signOut(getAuth())}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      onClick={() => navigate("/login")}
                    >
                      Sign in
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => navigate("/create-account")}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              slotProps={{
                paper: {
                  sx: {
                    top: 0,
                    right: 0,
                    margin: 0,
                    borderRadius: 0,
                  },
                },
              }}
            >
              <MenuList>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem
                  onClick={() => {
                    navigate("/");
                    toggleDrawer(false)();
                  }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/about");
                    toggleDrawer(false)();
                  }}
                >
                  About
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/articles");
                    toggleDrawer(false)();
                  }}
                >
                  Articles
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                {isLoading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    {user && <span>Logged in as {user.email}</span>}
                    {user ? (
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="text"
                          size="small"
                          onClick={() => {
                            signOut(getAuth());
                            toggleDrawer(false)();
                          }}
                        >
                          Sign Out
                        </Button>
                      </MenuItem>
                    ) : (
                      <>
                        <MenuItem>
                          <Button
                            color="primary"
                            variant="text"
                            size="small"
                            onClick={() => {
                              navigate("/login");
                              toggleDrawer(false)();
                            }}
                          >
                            Sign in
                          </Button>
                        </MenuItem>
                        <MenuItem>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => {
                              navigate("/create-account");
                              toggleDrawer(false)();
                            }}
                          >
                            Sign up
                          </Button>
                        </MenuItem>
                      </>
                    )}
                  </>
                )}
              </MenuList>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
