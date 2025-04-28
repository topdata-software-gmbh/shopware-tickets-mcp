import { describe, expect, it } from 'vitest';
import supportTicketMock from '../mocks/supportTicket.mock.js';
import formatSupportTicket from './supportTicket.formatter.js';

describe('formatSupportTicket', () => {
  it('should format a complete support ticket', () => {
    const formatted = formatSupportTicket(supportTicketMock);

    expect(formatted).toContain('12345');
    expect(formatted).toContain('Test Plugin Issue');
    expect(formatted).toContain('open');
  });

  it('should handle empty values gracefully', () => {
    const emptyTicketData = {
      ...supportTicketMock,
      title: '',
      creatorCompany: {
        ...supportTicketMock.creatorCompany,
        name: '',
      },
      contact: {
        ...supportTicketMock.contact,
        name: '',
        phoneNumber: '',
        mails: [],
      },
    };

    const formatted = formatSupportTicket(emptyTicketData);

    expect(formatted).toContain('12345');
    expect(formatted).toContain('Title: N/A');
  });
});
