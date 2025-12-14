import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="fixed" color="primary" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={600}>
          MCP
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={RouterLink} to="/interview">
            Interview
          </Button>
          <Button color="inherit" component={RouterLink} to="/chat">
            Chat
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
