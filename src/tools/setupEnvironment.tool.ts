import { z } from 'zod';

export default {
  name: 'setup-environment',
  description:
    'Setup a fitting local development environment at the current project directory. This tool should not be used on its own! Only in context of a running bugfix process.',
  paramsSchema: {
    shopwareVersion: z
      .string()
      .describe(
        'The required Shopware version to be installed and used to reproduce the bug in the format 1.0.0.0'
      ),
  },
  cb: (params: { shopwareVersion: string }) => {
    if (!params.shopwareVersion) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `
              There seems to be no Shopware version provided. Show the following message to the user before proceeding or retrying any steps:

              Please provide a Shopware version to be installed and used to reproduce the bug in the format 1.0.0.0.
            `,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: `
            Run the following command in the command line to setup a fitting local development environment:

            1. docker run --rm -it -v ${process.env.PROJECT_DIRECTORY}/shopware:/var/www/html ghcr.io/shopwarelabs/devcontainer/base-slim:8.3 new-shopware-setup ${params.shopwareVersion}
          `,
        },
      ],
    };
  },
};
