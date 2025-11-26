import { Box, Stack, Fade, Avatar, Paper, CircularProgress, Typography } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import MessageBubble from './MessageBubble';
import { Message } from '../types/message';

type ChatMessagesProps = {
    messages: Message[];
    loading: boolean;
    messagesEndRef: any
}

export default function ChatMessages({ messages, loading, messagesEndRef }: ChatMessagesProps) {
  return (
    <Box sx={{ 
      flex: 1, 
      overflow: 'auto', 
      p: 3,
      '&::-webkit-scrollbar': { width: '8px' },
      '&::-webkit-scrollbar-track': { bgcolor: 'grey.100' },
      '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: '4px' },
    }}>
      <Stack spacing={2}>
        {messages.map((m, i) => (
          <Fade in key={i} timeout={500}>
            <div><MessageBubble message={m} /></div>
          </Fade>
        ))}

        {loading && (
          <Fade in>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                <SmartToy sx={{ fontSize: 20 }} />
              </Avatar>
              <Paper elevation={1} sx={{ px: 2.5, py: 1.5, bgcolor: 'white', borderRadius: 2, borderTopLeftRadius: 0 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} />
                  <Typography variant="body2" color="text.secondary">Thinking...</Typography>
                </Stack>
              </Paper>
            </Box>
          </Fade>
        )}
        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
}
