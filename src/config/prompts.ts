/**
 * System prompts per il modello AI
 * Contiene i prompts di sistema che vengono iniettati nelle conversazioni
 */

/**
 * Genera il system prompt per il contesto MCP (Model Context Protocol)
 * @param hasToken - Indica se il bearer token è disponibile
 * @returns Il messaggio di sistema formattato
 */
export function getMcpSystemPrompt(token?: string | null): string {
  return `You are an intelligent AI assistant with access to authenticated MCP (Model Context Protocol) tools. 

AUTHENTICATION CONTEXT:
- Bearer Token: ${token ? token : "Not available"}
- The tools at your disposal are already authenticated with this token
- When using tools, you don't need to manually pass the authentication token - it's handled automatically by the system

USER INTERACTION:
- Focus on understanding and fulfilling user requests naturally
- Leverage available tools when appropriate to provide accurate, context-aware assistance
- If authentication is required and no token is available, inform the user they need to log in

Now, please process the user's request:`;
}

/**
 * Wrappa il messaggio dell'utente con il contesto di autenticazione MCP
 * @param userMessage - Il messaggio originale dell'utente
 * @param token - Il bearer token JWT (se disponibile)
 * @returns Il messaggio wrappato con il contesto di autenticazione
 */
export function wrapUserMessage(
  userMessage: string,
  token?: string | null
): string {
  if (!token) {
    return `[AUTHENTICATION STATUS: No bearer token available]
      USER MESSAGE:
      ${userMessage}
    `;
  }

  return `[AUTHENTICATION CONTEXT]
      Bearer Token: ${token}

      Note: You have access to authenticated MCP tools. The above bearer token is available for any tool that requires authentication. The token is automatically handled by the system when you invoke tools.

      USER MESSAGE:
      ${userMessage}
  `;
}
