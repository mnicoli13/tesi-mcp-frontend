import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.100', mt: 'auto' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} MCP Chat — All rights reserved.
      </Typography>
    </Box>
  );
}
