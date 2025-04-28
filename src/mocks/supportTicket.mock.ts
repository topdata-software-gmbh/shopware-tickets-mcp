export default {
  id: 12345,
  creatorCompany: {
    id: 1,
    name: 'Test Company GmbH',
  },
  level: {
    id: 1,
    name: 'normal',
  },
  type: {
    id: 1,
    name: 'pluginSupport',
  },
  communicationType: {
    id: 1,
    name: 'emailSupport',
  },
  title: 'Test Plugin Issue',
  status: {
    id: 1,
    name: 'open',
  },
  creationDate: '2024-01-01T00:00:00+01:00',
  creatorParty: {
    id: 1,
    name: 'shopOwner',
  },
  deadline: '2024-01-10T00:00:00+01:00',
  lastContactDate: '2024-01-02T00:00:00+01:00',
  affectedShop: {
    id: 1,
    domain: 'test.shop',
    type: 'self-hosted',
    subscription: null,
    servicePackageClass: null,
    paasProvider: null,
    commercialPlanName: 'evolve',
    version: '6.6.7.1',
  },
  closedByParty: {
    name: 'shopOwner',
  },
  plugin: {
    id: 1,
    name: 'TestPlugin',
    producer: {
      name: 'Test Producer',
      prefix: 'TEST',
    },
    infos: [
      {
        id: 1,
        locale: {
          id: 1,
          name: 'de_DE',
        },
        name: 'Test Plugin | Plugin für Testzwecke',
        shortDescription: 'Ein Test Plugin mit vielen Funktionen für Shopware 6.',
      },
      {
        id: 2,
        locale: {
          id: 2,
          name: 'en_GB',
        },
        name: 'Test Plugin | Plugin for testing',
        shortDescription: 'A test plugin with many functions for Shopware 6.',
      },
    ],
    isInitialSupportByShopware: false,
  },
  additionalInformation: {
    pluginVersion: '1.0.0',
    softwareVersion: '6.6.7.1',
    locale: 'de_DE',
  },
  licenseInformation: {
    pluginLicenseVariantType: 'buy',
    productLicenseModule: 'sCORE',
    subscriptionModuleKey: null,
    commercialPlanName: 'evolve',
    expirationDate: '2024-12-31 23:59:59',
    actualExpirationDate: '2024-12-31 23:59:59',
  },
  contact: {
    name: 'Test User',
    phoneNumber: '+49 123 456789',
    mails: ['test@example.com'],
  },
  answers: [
    {
      id: 1,
      text: '<p>Hallo,</p><p>wir haben ein Problem mit dem Plugin.</p>',
      sentDate: '2024-01-01T00:00:00+01:00',
      internalEmployee: null,
      party: {
        id: 1,
        name: 'shopOwner',
      },
      textType: {
        id: 1,
        name: 'html',
      },
      isInitialByShopware: false,
      sensitiveData: null,
      attachments: [
        {
          id: 1,
          fileName: 'screenshot.png',
        },
      ],
      rating: null,
      proposal: false,
    },
  ],
  externalPermissions: [
    {
      companyId: 1,
      companyName: 'Test Partner GmbH',
    },
  ],
  timeZone: 'Europe/Berlin',
  acceptEnglishAnswer: false,
  partner: {
    id: 1,
    customerNumber: 'TEST-123',
    companyName: 'Test Partner GmbH',
    contact: 'Test Contact',
    status: {
      name: 'bronze',
    },
  },
  customer: {
    id: 1,
    customerNumber: 'CUST-123',
    name: 'Test Company GmbH',
    defaultContact: {
      fullName: 'Test User',
    },
  },
  assigneePrefix: 'TEST',
  internalComments: [
    {
      text: 'Test comment',
      fromShopware: false,
      creationDate: '2024-01-02T00:00:00+01:00',
    },
  ],
};
