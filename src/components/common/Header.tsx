import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { interviewService } from "../../services/interviewService";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [canAccessChat, setCanAccessChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isChat = location.pathname === "/chat";
  const isProfile = location.pathname === "/profile";
  const isInterview = location.pathname === "/interview";

  // Check if coming from profile (via state or session storage)
  const fromProfile =
    location.state?.from === "/profile" ||
    sessionStorage.getItem("fromProfile") === "true";

  useEffect(() => {
    // Track navigation from profile
    if (isInterview && fromProfile) {
      sessionStorage.setItem("fromProfile", "true");
    } else if (!isInterview) {
      sessionStorage.removeItem("fromProfile");
    }

    // Check interview progress for /interview page
    if (isInterview) {
      const checkProgress = async () => {
        try {
          const progress = await interviewService.getProgress();
          // Can access chat if at least first 2 steps are completed
          const completedSteps = progress.completedSteps || [];
          setCanAccessChat(completedSteps.length >= 2);
        } catch (error) {
          console.error("Error checking progress:", error);
          setCanAccessChat(false);
        } finally {
          setIsLoading(false);
        }
      };
      checkProgress();
    } else {
      setIsLoading(false);
    }
  }, [isInterview, fromProfile]);

  const handleBackToChat = () => {
    sessionStorage.removeItem("fromProfile");
    navigate("/chat");
  };

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  return (
    <AppBar position="fixed" elevation={2}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "48px !important",
        }}
      >
        {/* Left side - Title with potential back button */}
        <Stack direction="row" spacing={1} alignItems="center">
          {isProfile && (
            <IconButton
              color="inherit"
              onClick={handleBackToChat}
              size="small"
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="body1" fontWeight={600}>
            Student Career Coach MCP
          </Typography>
        </Stack>

        {/* Right side - Navigation buttons */}
        <Stack direction="row" spacing={2}>
          {/* Chat page: Only profile icon */}
          {isChat && (
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/profile"
              size="small"
            >
              <AccountCircleIcon />
            </IconButton>
          )}

          {/* Profile page: Only Chat button */}
          {isProfile && (
            <Button
              color="inherit"
              component={RouterLink}
              to="/chat"
              startIcon={<ChatOutlinedIcon />}
            >
              Chat
            </Button>
          )}

          {/* Interview page: Conditional buttons */}
          {isInterview && !isLoading && (
            <>
              {fromProfile && (
                <Button
                  color="inherit"
                  onClick={handleBackToProfile}
                  startIcon={<AccountCircleIcon />}
                >
                  Profilo
                </Button>
              )}
              {canAccessChat && (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/chat"
                  startIcon={<ChatOutlinedIcon />}
                >
                  Chat
                </Button>
              )}
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
