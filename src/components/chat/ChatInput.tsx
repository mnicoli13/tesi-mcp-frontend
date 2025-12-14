import { Box, Stack, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useRef, useEffect } from "react";

type ChatInputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
  handleKeyPress: (e: any) => void;
  loading: boolean;
  onHeightChange?: (height: number) => void;
};

export default function ChatInput({
  input,
  setInput,
  handleSend,
  handleKeyPress,
  loading,
  onHeightChange,
}: ChatInputProps) {
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!inputBoxRef.current || !onHeightChange) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        onHeightChange(entry.contentRect.height + 16);
      }
    });

    resizeObserver.observe(inputBoxRef.current);

    // Initial height
    onHeightChange(inputBoxRef.current.offsetHeight + 16);

    return () => {
      resizeObserver.disconnect();
    };
  }, [onHeightChange]);
  return (
    <Box
      ref={inputBoxRef}
      sx={{
        p: 2,
        pt: 0,
        bgcolor: "white",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          fullWidth
          multiline
          maxRows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={loading}
          variant="outlined"
          size="small"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
            "&.Mui-disabled": { bgcolor: "grey.300" },
          }}
        >
          <Send />
        </IconButton>
      </Stack>
    </Box>
  );
}
