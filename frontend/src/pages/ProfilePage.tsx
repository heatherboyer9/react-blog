import { useEffect, useState, forwardRef, ReactElement, Ref } from "react";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
  Stack,
  FormLabel,
  FormControl,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { getAuth, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfilePage() {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();
  const [openReset, setOpenReset] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [avatar, setAvater] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      const firstName = user.displayName?.split(" ")[0] || "";
      const lastName = user.displayName?.split(" ")[1] || "";
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(user.email || "");
      setAvater(`https://i.pravatar.cc/150?u=${firstName || user.email}`);
    }
  }, [user, isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!firstName || !lastName) {
        setError("First name and last name are required.");
        return;
      }

      await updateProfile(getAuth().currentUser!, {
        displayName: `${firstName} ${lastName}`,
      });
      navigate("/");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(getAuth(), email);
      setOpenReset(false);
      setOpenSnackbar(true);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  if (isLoading || !user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message="Reset password email sent. Please check your inbox."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Reset password email sent. Please check your inbox.
        </Alert>
      </Snackbar>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h1">Profile</Typography>
          <Typography variant="body1">
            Customize how your profile information will appear.
          </Typography>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
        <Divider />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <Avatar
                src={avatar}
                sx={{ width: 108, height: 108, margin: "auto", mb: 2 }}
              />
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    autoComplete="given-name"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    autoComplete="family-name"
                    required
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    type="email"
                    placeholder="email"
                    value={email}
                    sx={{ flexGrow: 1 }}
                    disabled
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailRoundedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={() => setOpenReset(true)}
            >
              Reset Password
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      <Dialog
        open={openReset}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={() => setOpenReset(false)}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We will send an email to {email} with instructions and a link to
            reset your password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReset(false)} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleResetPassword}>Continue</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
