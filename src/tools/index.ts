import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import fixPluginProcessTool from './startPluginFix.tool.js';
import getSupportTicketTool from './getSupportTicket.tool.js';
import checkEnvironmentTool from './checkEnvironment.tool.js';
import setupEnvironmentTool from './setupEnvironment.tool.js';

const registerTools = (server: McpServer) => {
  server.tool(
    fixPluginProcessTool.name,
    fixPluginProcessTool.description,
    fixPluginProcessTool.paramsSchema,
    fixPluginProcessTool.cb
  );

  server.tool(
    getSupportTicketTool.name,
    getSupportTicketTool.description,
    getSupportTicketTool.paramsSchema,
    getSupportTicketTool.cb
  );

  server.tool(
    checkEnvironmentTool.name,
    checkEnvironmentTool.description,
    checkEnvironmentTool.paramsSchema,
    checkEnvironmentTool.cb
  );

  server.tool(
    setupEnvironmentTool.name,
    setupEnvironmentTool.description,
    setupEnvironmentTool.paramsSchema,
    setupEnvironmentTool.cb
  );
};

export { registerTools };
