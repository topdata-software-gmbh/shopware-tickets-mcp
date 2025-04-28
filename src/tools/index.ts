import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import supportTicketTool from './supportTicket.tool.js';

const registerTools = (server: McpServer) => {
  server.tool(
    supportTicketTool.name,
    supportTicketTool.description,
    supportTicketTool.parameters,
    supportTicketTool.handler
  );
};

export { registerTools };
