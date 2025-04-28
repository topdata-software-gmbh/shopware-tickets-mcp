import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools/index.js';
async function main() {
    try {
        const server = new McpServer({
            name: 'shopware-mcp',
            version: '1.0.0',
        });
        registerTools(server);
        const transport = new StdioServerTransport();
        await server.connect(transport);
    }
    catch (error) {
        console.error('Fatal error in main():', error);
        process.exit(1);
    }
}
main();
