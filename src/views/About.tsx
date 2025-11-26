import { Container, Typography, Box } from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Cos’è l’MCP (Model Context Protocol)?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        MCP è un protocollo che consente ai modelli AI (come Claude o Ollama)
        di comunicare con servizi esterni in modo strutturato e sicuro.
      </Typography>
      <Typography variant="body1">
        In questa applicazione, ad esempio, puoi usare il server <strong>Google Maps MCP</strong>
        per stimare costi di viaggio, visualizzare traffico o calcolare percorsi, il tutto via API.
      </Typography>
    </Container>
  );
}
