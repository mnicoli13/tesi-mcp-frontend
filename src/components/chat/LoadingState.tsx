import { CircularProgress, Paper, Stack, Typography } from "@mui/material";

export const LoadingState = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        px: 2.5,
        py: 1.5,
        bgcolor: "white",
        borderRadius: 2,
        borderTopLeftRadius: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <CircularProgress size={16} />
        <Typography variant="body2" color="text.secondary">
          Thinking...
        </Typography>
      </Stack>
    </Paper>
  );
};
