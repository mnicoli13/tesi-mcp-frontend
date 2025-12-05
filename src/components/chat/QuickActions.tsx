import { Box, Typography, Stack, Chip } from "@mui/material";

type QuickActionsProps = {
  actions: string[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function QuickActions({ actions, setInput }: QuickActionsProps) {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: "grey.50",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems={"center"}
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "grey.400",
            borderRadius: 1,
          },
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: "block" }}
        >
          Quick Actions:
        </Typography>
        {actions.map((action, i) => (
          <Chip
            key={i}
            label={action}
            size="small"
            onClick={() => setInput(action)}
            sx={{
              cursor: "pointer",
              "&:hover": { bgcolor: "primary.light", color: "white" },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
