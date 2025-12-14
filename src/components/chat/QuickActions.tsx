import { Box, Typography, Stack, Chip } from "@mui/material";
import { QuickAction } from "../../utils/quickActionsData";

type QuickActionsProps = {
  actions: QuickAction[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function QuickActions({ actions, setInput }: QuickActionsProps) {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems={"center"}
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, WebKit
          },
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: "block", whiteSpace: "nowrap" }}
        >
          Quick Actions:
        </Typography>
        {actions.map((action, i) => (
          <Chip
            key={i}
            label={action.label}
            size="small"
            onClick={() => setInput(action.value)}
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
