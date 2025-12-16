import { useEffect, useState, useCallback } from "react";
import {
  experimental_createMCPClient as createMCPClient,
  experimental_MCPClient as MCPClient,
} from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const MCP_URL =
  import.meta.env.VITE_API_BASE_URL + "/mcp" || "http://localhost:8080/mcp";

export const useMcpClient = () => {
  const [client, setClient] = useState<MCPClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectClient = async () => {
    try {
      const baseUrl = new URL(MCP_URL);

      const transport = new StreamableHTTPClientTransport(baseUrl);
      // const transport = new SSEClientTransport(baseUrl);

      const mcpClient = await createMCPClient({
        transport: transport,
      });
      setClient(mcpClient);
      setIsConnected(true);
    } catch (err) {
      console.error("Failed to connect MCP client:", err);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connectClient();
  }, [MCP_URL]);

  const getTools = useCallback(async () => {
    if (!client) throw new Error("MCP client not connected");
    const tools = await client.tools();

    return tools;
  }, [client]);

  return { client, isConnected, getTools };
};
