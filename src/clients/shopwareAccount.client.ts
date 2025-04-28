interface LoginResponse {
  token: string;
  userId: string;
}

interface ProducerResponse {
  id: string;
}

interface SupportTicketResponse {
  id: number;
  creatorCompany: {
    id: number;
    name: string;
  };
  level: {
    id: number;
    name: string;
  };
  type: {
    id: number;
    name: string;
  };
  communicationType: {
    id: number;
    name: string;
  };
  title: string;
  status: {
    id: number;
    name: string;
  };
  creationDate: string;
  creatorParty: {
    id: number;
    name: string;
  };
  deadline: string;
  lastContactDate: string;
  affectedShop: {
    id: number;
    domain: string;
    type: string;
    subscription: string | null;
    servicePackageClass: string | null;
    paasProvider: string | null;
    commercialPlanName: string;
    version: string;
  };
  closedByParty: {
    name: string;
  } | null;
  plugin: {
    id: number;
    name: string;
    producer: {
      name: string;
      prefix: string;
    };
    infos: Array<{
      id: number;
      locale: {
        id: number;
        name: string;
      };
      name: string;
      shortDescription: string;
    }>;
    isInitialSupportByShopware: boolean;
  };
  additionalInformation: {
    pluginVersion: string;
    softwareVersion: string;
    locale: string;
  };
  licenseInformation: {
    pluginLicenseVariantType: string;
    productLicenseModule: string;
    subscriptionModuleKey: string | null;
    commercialPlanName: string;
    expirationDate: string | null;
    actualExpirationDate: string | null;
  };
  contact: {
    name: string;
    phoneNumber: string;
    mails: string[];
  };
  answers: Array<{
    id: number;
    text: string;
    sentDate: string;
    internalEmployee: {
      name: string;
    } | null;
    party: {
      id: number;
      name: string;
    };
    textType: {
      id: number;
      name: string;
    };
    isInitialByShopware: boolean;
    sensitiveData: string | null;
    attachments: Array<{
      id: number;
      fileName: string;
    }>;
    rating: number | null;
    proposal: boolean;
  }>;
  externalPermissions: Array<{
    companyId: number;
    companyName: string;
  }>;
  timeZone: string;
  acceptEnglishAnswer: boolean;
  partner: {
    id: number;
    customerNumber: string;
    companyName: string;
    contact: string;
    status: {
      name: string;
    };
  };
  customer: {
    id: number;
    customerNumber: string;
    name: string;
    defaultContact: {
      fullName: string;
    };
  };
  assigneePrefix: string;
  internalComments: Array<{
    text: string;
    fromShopware: boolean;
    creationDate: string;
  }>;
}

const getSupportTicket = async (ticketId: string): Promise<SupportTicketResponse> => {
  const { token, userId } = await login();
  const producer = await getProducer(token, userId);
  const ticketIdNumber = ticketId.split('-')[1];
  const response = await fetch(
    `https://api.shopware.com/producers/${producer.id}/supporttickets/${ticketIdNumber}`,
    {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        accept: 'application/json',
        'x-shopware-token': token,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch support ticket: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as SupportTicketResponse;
};

const getProducer = async (token: string, userId: string): Promise<ProducerResponse> => {
  const response = await fetch(`https://api.shopware.com/producers?companyId=${userId}`, {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      accept: 'application/json',
      'x-shopware-token': token,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Shopware API: Failed to fetch producer: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as ProducerResponse[];

  if (!data[0]) {
    throw new Error('No producer found');
  }

  return data[0];
};

const login = async (): Promise<LoginResponse> => {
  const response = await fetch('https://api.shopware.com/accesstokens', {
    method: 'POST',
    body: JSON.stringify({
      shopwareId: process.env.SHOPWARE_ACCOUNT_EMAIL,
      password: process.env.SHOPWARE_ACCOUNT_PASSWORD,
    }),
    headers: {
      'content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Shopware API: Failed to login: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as LoginResponse;
};

export { getProducer, getSupportTicket };
export type { LoginResponse, ProducerResponse, SupportTicketResponse };
