import {
  AppBar,
  Toolbar,
  Typography,
  Chip,
  alpha,
  IconButton,
} from "@mui/material";
import { AutoAwesome, Fullscreen, FullscreenExit } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

export default function ChatHeader() {
  const theme = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <IconButton
          onClick={toggleFullscreen}
          sx={{
            mr: 2,
            color: "white",
            "&:hover": {
              bgcolor: alpha(theme.palette.common.white, 0.1),
            },
          }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
        <AutoAwesome sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          MCP
        </Typography>
        <Chip
          label="Connected"
          size="small"
          sx={{
            bgcolor: alpha(theme.palette.success.main, 0.2),
            color: "success.light",
            fontWeight: 600,
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
