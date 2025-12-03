import { Box, Typography, Stack, Chip } from '@mui/material';

type QuickActionsProps = {
    actions: string[];
    setInput: React.Dispatch<React.SetStateAction<string>>
}

export default function QuickActions({ actions, setInput }: QuickActionsProps) {
  return (
    <Box sx={{ px: 3, py: 2, bgcolor: 'grey.50', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        Quick Actions:
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {actions.map((action, i) => (
          <Chip
            key={i}
            label={action}
            size="small"
            onClick={() => setInput(action)}
            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
          />
        ))}
      </Stack>
    </Box>
  );
}
