export interface Message {
  id: string;
  role: RoleType;
  content: string;
}

export type RoleType = "user" | "assistant";
