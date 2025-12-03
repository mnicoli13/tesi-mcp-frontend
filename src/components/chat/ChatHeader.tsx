import { AppBar, Toolbar, Typography, Chip, alpha } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function ChatHeader() {
  const theme = useTheme();
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
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
