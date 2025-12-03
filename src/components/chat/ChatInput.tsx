import { Box, Stack, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

type ChatInputProps = {
    input: string
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void
    handleKeyPress: (e: any) => void
    loading: boolean
}

export default function ChatInput({ input, setInput, handleSend, handleKeyPress, loading }: ChatInputProps) {
  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderTop: 1, borderColor: 'divider' }}>
      <Stack direction="row" spacing={1} alignItems="flex-end">
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={loading}
          variant="outlined"
          size="small"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
            '&.Mui-disabled': { bgcolor: 'grey.300' },
          }}
        >
          <Send />
        </IconButton>
      </Stack>
    </Box>
  );
}
