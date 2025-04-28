import type { SupportTicketResponse } from '../clients/shopwareAccount.client.js';

const formatValue = (value: any, defaultValue = 'N/A'): string => {
  if (value === null || value === undefined || value === '') {
    return defaultValue;
  }
  return value;
};

export default (ticketData: SupportTicketResponse) => {
  return `
    Support Ticket Analysis Request:

    Ticket Information:
    - ID: ${formatValue(ticketData.id)}
    - Title: ${formatValue(ticketData.title)}
    - Status: ${formatValue(ticketData.status?.name)}
    - Type: ${formatValue(ticketData.type?.name)}
    - Communication Type: ${formatValue(ticketData.communicationType?.name)}
    - Level: ${formatValue(ticketData.level?.name)}
    - Creation Date: ${formatValue(ticketData.creationDate)}
    - Last Contact Date: ${formatValue(ticketData.lastContactDate)}
    - Deadline: ${formatValue(ticketData.deadline)}
    - Time Zone: ${formatValue(ticketData.timeZone)}

    Shop Information:
    - Domain: ${formatValue(ticketData.affectedShop?.domain)}
    - Type: ${formatValue(ticketData.affectedShop?.type)}
    - Version: ${formatValue(ticketData.affectedShop?.version)}
    - License Plan: ${formatValue(ticketData.licenseInformation?.commercialPlanName, 'No')}

    Plugin Information:
    - Name: ${formatValue(ticketData.plugin?.name)}
    - Producer: ${formatValue(ticketData.plugin?.producer?.name)}
    - Version: ${formatValue(ticketData.additionalInformation?.pluginVersion)}
    - Software Version: ${formatValue(ticketData.additionalInformation?.softwareVersion)}
    - Locale: ${formatValue(ticketData.additionalInformation?.locale)}

    Customer Information:
    - Company: ${formatValue(ticketData.creatorCompany?.name)}
    - Contact: ${formatValue(ticketData.contact?.name)}
    - Phone: ${formatValue(ticketData.contact?.phoneNumber)}
    - Email: ${formatValue(ticketData.contact?.mails?.length > 0 ? ticketData.contact.mails.join(', ') : '')}

    Ticket Details:
    - Assignee Prefix: ${formatValue(ticketData.assigneePrefix)}
    - Accept English Answer: ${formatValue(ticketData.acceptEnglishAnswer)}
    - Creator Party: ${formatValue(ticketData.creatorParty?.name)}
    - Closed By Party: ${formatValue(ticketData.closedByParty?.name, 'No')}

    Conversation History:
    ${ticketData.answers
      .map(
        (answer, index) => `
    Message ${index + 1}:
    - Date: ${formatValue(answer.sentDate)}
    - From: ${formatValue(answer.party?.name)}
    - Text Type: ${formatValue(answer.textType?.name)}
    - Content: ${formatValue(answer.text)}
    ${answer.attachments?.length > 0 ? `- Attachments: ${answer.attachments.map((a) => a.fileName).join(', ')}` : ''}
    ${answer.internalEmployee ? `- Internal Employee: ${formatValue(answer.internalEmployee?.name)}` : ''}
    ${answer.rating ? `- Rating: ${formatValue(answer.rating)}` : ''}
    ${answer.proposal ? '- This is a proposal' : ''}
    ${answer.sensitiveData ? '- Contains sensitive data' : ''}
    `
      )
      .join('\n')}`;
};
