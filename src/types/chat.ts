// ============= CHAT =============

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  toolName: string;
  input: any;
  output: any;
  status: "pending" | "success" | "error";
}
