import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import supportTicketTool from './supportTicket.tool.js';
import instructionsTool from './instructions.tool.js';

const registerTools = (server: McpServer) => {
  server.tool(
    supportTicketTool.name,
    supportTicketTool.description,
    supportTicketTool.parameters,
    supportTicketTool.handler
  );

  server.tool(
    instructionsTool.name,
    instructionsTool.description,
    instructionsTool.parameters,
    instructionsTool.handler
  );
};

export { registerTools };
