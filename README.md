# Shopware MCP

A local Model Context Protocol (MCP) server for Shopware plugin development. This project aims to fully automate bugfixing for Shopware plugins by considering support tickets, affected Shopware versions, and affected plugin versions using LLMs in your IDE. 

## Features

- ✅ Support ticket information retrieval
- 👷‍♂️ Planned: Environment setup based on support ticket information (cloning of Shopware and plugin repo in affected versions)
- 👷‍♂️ Planned: Create Git bugfix branches
- 👷‍♂️ Planned: Check code, run existing tests and interact with the browser via MCP to fix bugs
- 👷‍♂️ Planned: Create and push commits and create PRs

Note: I'm new to MCP development. I'm open to any suggestions and tips!

## Connect to server

Add this in your MCP clients configuration:

```
{
  "mcpServers": {
    "shopware-mcp": {
      "command": "npx",
      "args": ["-y", "@dithom/shopware-mcp"],
      "env": {
        "SHOPWARE_ACCOUNT_EMAIL": "YOUR_SHOPWARE_ACCOUNT_EMAIL",
        "SHOPWARE_ACCOUNT_PASSWORD": "YOUR_SHOPWARE_ACCOUNT_PASSWORD"
      }
    }
  }
}
```