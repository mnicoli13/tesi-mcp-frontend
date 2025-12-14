export interface ToolResult {
  name: string;
  result: any;
}

export interface Message {
  id: string;
  role: RoleType;
  content: string;
  reasoning?: string;
  toolResults?: ToolResult[];
}

export type RoleType = "user" | "assistant";
