import { z } from 'zod';
import { getSupportTicket } from '../clients/shopwareAccount.client.js';
import formatSupportTicket from '../formatters/supportTicket.formatter.js';

export default {
  name: 'get-support-ticket',
  description: 'Get all available information about a support ticket',
  parameters: {
    ticketId: z
      .string()
      .describe(
        'The ticket id usually in the format ABCDE-123456. ABCDE being a short form of the plugin vendor name and 123456 being the ticket id.'
      ),
  },
  handler: async (params: { ticketId: string }) => {
    try {
      const ticket = await getSupportTicket(params.ticketId);
      const formattedTicket = formatSupportTicket(ticket);

      return {
        content: [
          {
            type: 'text' as const,
            text: `Information for support ticket ${params.ticketId}:\n\n${formattedTicket}`,
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
