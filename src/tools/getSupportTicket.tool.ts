import { z } from 'zod';
import { getSupportTicket } from '../clients/shopwareAccount.client.js';
import formatSupportTicket from '../formatters/supportTicket.formatter.js';

export default {
  name: 'get-support-ticket',
  description: 'Retrieve details about a specific support ticket. If you need to start a full bugfix process, use the tool "start-plugin-fix".',
  paramsSchema: {
    ticketId: z
      .string()
      .describe(
        'The ticket id usually in the format ABCDE-123456. ABCDE being a short form of the plugin vendor name and 123456 being the ticket id.'
      ),
  },
  cb: async (params: { ticketId: string }) => {
    try {
      const ticket = await getSupportTicket(params.ticketId);
      const formattedTicket = formatSupportTicket(ticket);

      return {
        content: [
          {
            type: 'text' as const,
            text: `Use the following information of support ticket ${params.ticketId} to create a summary of the issue.

            Always output a summary of the issue before doing anything else.

            If you are in a running "start-plugin-fix" process, you should continue with the next step as advised afterwards.

            Here is the information about the support ticket:\n\n${formattedTicket}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: error instanceof Error ? error.message : 'An unknown error occurred',
          },
        ],
        isError: true,
      };
    }
  },
};
