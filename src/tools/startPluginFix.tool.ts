import { z } from 'zod';

export default {
  name: 'start-plugin-fix',
  description:
    'Start the guided process to fix a Shopware plugin bug based on either a support ticket number (e.g., "Can you fix ABCDE-123456?") or a plugin bug description (e.g., "Can you fix the following bug in the plugin PluginName? Further bug description.")',
  paramsSchema: {
    ticketId: z
      .string()
      .optional()
      .describe('Optional: the support ticket ID (ABCDE-123456) to fix'),
    pluginName: z.string().optional().describe('Optional: the name of the plugin to fix'),
    bugDescription: z.string().optional().describe('Optional: a description of the bug to fix'),
  },
  cb: (params: { ticketId?: string; pluginName?: string; bugDescription?: string }) => {
    let text = `You are a senior PHP developer with deep knowledge in Symfony, Shopware 6 and the Shopware plugin system. You value effective code changes, maintainable architecture and readable code over quick and dirty fixes. You are about to fix a bug in a Shopware plugin.`;

    if (params.ticketId) {
      text += `
        Customers can use your plugins in their own Shopware 6 installations. Each customer can run a different Shopware version.

        Your plugins do also exists in different versions, to provide new features, bugfixes and compatibility with different Shopware versions.

        If a user runs into an issue, they can create a support ticket with detailed information including the plugin name, the plugin version, the error and their Shopware version.

        You have been provided with support ticket number ${params.ticketId}.
      `;
    } else if (params.pluginName && params.bugDescription) {
      text += `
        You have been provided with the following information about the plugin to fix:
        - Plugin name: ${params.pluginName}
        - Bug description: ${params.bugDescription}
      `;
    }

    text += `Follow the steps below to ensure a fast and effective bugfix process. If you need to ask the user for further information between steps or you run into issues while executing the steps, stay in the provided order and repeat the steps until you can proceed successfully:`;

    if (params.ticketId) {
      text += `
        1. Use the tool "get-support-ticket" to get all available information about the support ticket.
      `;
    } else if (!params.pluginName && !params.bugDescription) {
      text += `
        1. Ask the user to provide the following information before proceeding with the bugfix process:
          - The name of the plugin to fix
          - A description of the bug to fix
      `;
    } else {
      text += `
        1. Ask the user to provide either a support ticket number or the plugin name and a bug description before proceeding with the bugfix process.
      `;
    }

    text += `
      2. Use the tool "check-environment" to check if there is an existing local development environment available at the current project directory and create one if necessary.
      3. Based on the information provided by the user or the support ticket, and the information about the directory structure, try to find the cause of the bug. While doing so, make sure you keep following things in mind:
        - Plugins can extend existing code found in the Shopware root directory.
        - Plugins can override existing code found in the Shopware root directory.
        - Plugins can subscribe to Symfony events found in the Shopware root directory.
        - Always check the original Shopware code found in the Shopware root directory at "/vendor/shopware/" if there are hints about extension or subscribed events in the plugin code.
    `;

    return {
      content: [
        {
          type: 'text' as const,
          text: text,
        },
      ],
    };
  },
};
