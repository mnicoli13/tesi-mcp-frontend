import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container, Stack } from '@mui/material';
import { Chat, Info } from '@mui/icons-material';

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Benvenuto in Ollama Chat MCP
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Un’interfaccia per esplorare e testare i Model Context Protocol tools, come Google Maps MCP.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          startIcon={<Chat />}
          component={Link}
          to="/chat"
        >
          Apri Chat
        </Button>
        <Button
          variant="outlined"
          startIcon={<Info />}
          component={Link}
          to="/about"
        >
          Scopri di più
        </Button>
      </Stack>
    </Container>
  );
}
