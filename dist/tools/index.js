import supportTicketTool from './supportTicket.tool.js';
const registerTools = (server) => {
    server.tool(supportTicketTool.name, supportTicketTool.description, supportTicketTool.parameters, supportTicketTool.handler);
};
export { registerTools };
