import fs from 'fs';
import { z } from 'zod';

export default {
  name: 'check-environment',
  description:
    'Check if there is an existing local development environment available at the current project directory. This tool should not be used on its own! Only in context of a running bugfix process.',
  paramsSchema: {
    shopwareVersion: z
      .string()
      .describe(
        'The required Shopware version to be installed and used to reproduce the bug in the format 1.0.0.0'
      ),
    pluginName: z
      .string()
      .describe('The name of the plugin to fix. Usually in pascal case e.g. VendorMyPlugin.'),
    pluginVersion: z.string().describe('The affected plugin version to fix in the format 1.0.0.0.'),
  },
  cb: (params: { shopwareVersion: string; pluginName: string; pluginVersion: string }) => {
    const projectDirectory = process.env.PROJECT_DIRECTORY;

    if (!projectDirectory || typeof projectDirectory !== 'string') {
      return {
        content: [
          {
            type: 'text' as const,
            text: `
              There seems to be an issue with the PROJECT_DIRECTORY environment variable. Show the following message to the user before proceeding or retrying any steps:

              Please set the PROJECT_DIRECTORY environment variable to the absolute path of the project directory to check for a local development environment.
            `,
          },
        ],
      };
    }

    try {
      const hasBasicShopwareStructure =
        (fs.existsSync(`${projectDirectory}/composer.json`) &&
          fs.existsSync(`${projectDirectory}/vendor/shopware/core`) &&
          fs.existsSync(`${projectDirectory}/vendor/shopware/storefront`) &&
          fs.existsSync(`${projectDirectory}/vendor/shopware/administration`) &&
          fs.existsSync(`${projectDirectory}/custom/plugins`) &&
          fs.existsSync(`${projectDirectory}/custom/static-plugins`) &&
          fs.existsSync(`${projectDirectory}/custom/apps`)) ||
        (fs.existsSync(`${projectDirectory}/shopware/composer.json`) &&
          fs.existsSync(`${projectDirectory}/shopware/vendor/shopware/core`) &&
          fs.existsSync(`${projectDirectory}/shopware/vendor/shopware/storefront`) &&
          fs.existsSync(`${projectDirectory}/shopware/vendor/shopware/administration`) &&
          fs.existsSync(`${projectDirectory}/shopware/custom/plugins`) &&
          fs.existsSync(`${projectDirectory}/shopware/custom/static-plugins`) &&
          fs.existsSync(`${projectDirectory}/shopware/custom/apps`));

      if (!hasBasicShopwareStructure) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `
                It seems like the project directory does not contain a basic Shopware directory structure. We need to ask the user if we should setup a fitting local development environment.

                If the user agrees, you should use the tool "setup-environment" to setup a fitting local development environment.

                Show the following message to the user before proceeding with the bugfix process or retrying any steps:

                No Shopware development environment detected. Do you want to setup a fitting local development environment?
              `,
            },
          ],
        };
      }

      const shopwareComposerJsonPaths = [
        `${projectDirectory}/composer.json`,
        `${projectDirectory}/shopware/composer.json`,
      ];
      const shopwareComposerJsonPath = shopwareComposerJsonPaths.find(fs.existsSync);
      const shopwareComposerJson = fs.readFileSync(shopwareComposerJsonPath as string, 'utf8');
      const shopwareVersion = JSON.parse(shopwareComposerJson).require['shopware/core'].replace(
        'v',
        ''
      );

      if (shopwareVersion !== params.shopwareVersion) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `
                It seems like the Shopware version in the project directory is not the correct version ${params.shopwareVersion}.

                Show the following message to the user before proceeding with the bugfix process or retrying any steps:

                The Shopware version in the project directory is not the correct version ${params.shopwareVersion}.
              `,
            },
          ],
        };
      }

      const pluginComposerJsonPaths = [
        `${projectDirectory}/custom/plugins/${params.pluginName}/composer.json`,
        `${projectDirectory}/custom/static-plugins/${params.pluginName}/composer.json`,
        `${projectDirectory}/custom/apps/${params.pluginName}/composer.json`,
        `${projectDirectory}/shopware/custom/plugins/${params.pluginName}/composer.json`,
        `${projectDirectory}/shopware/custom/static-plugins/${params.pluginName}/composer.json`,
        `${projectDirectory}/shopware/custom/apps/${params.pluginName}/composer.json`,
      ];

      const hasPlugin = pluginComposerJsonPaths.some(fs.existsSync);
      const shopwarePath = shopwareComposerJsonPath!.replace('/composer.json', '');

      if (!hasPlugin) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `
                It seems like the project directory does not contain a plugin with the name ${params.pluginName}.

                The user must either move the plugin to the directory "${shopwarePath}/custom/plugins/${params.pluginName}" or provide a repository URL to the plugin.

                If you receive a repository URL, you should use Git to clone the repository into the directory "${shopwarePath}/custom/plugins/${params.pluginName}".

                Show the following message to the user before proceeding with the bugfix process or retrying any steps:

                No plugin with the name ${params.pluginName} detected. Please move the plugin to the correct directory or provide a repository URL to the plugin.
              `,
            },
          ],
        };
      }

      const pluginComposerJsonPath = pluginComposerJsonPaths.find(fs.existsSync);
      const pluginComposerJson = fs.readFileSync(pluginComposerJsonPath as string, 'utf8');
      const pluginVersion = JSON.parse(pluginComposerJson).version.replace('v', '');
      const pluginPath = pluginComposerJsonPath!.replace('/composer.json', '');

      if (!pluginVersion || pluginVersion !== params.pluginVersion) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `
                It seems like the plugin with the name ${params.pluginName} exists at the path "${pluginPath}" but is not the correct version ${params.pluginVersion} to fix the bug.

                The user must provide the correct plugin version to fix the bug.

                Show the following message to the user before proceeding with the bugfix process or retrying any steps:

                The plugin ${params.pluginName} exists at the path "${pluginPath}" but is not the correct version ${params.pluginVersion} to fix the bug.
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
              The project directory contains a basic Shopware directory structure in the correct version ${params.shopwareVersion} as well as the plugin ${params.pluginName} in the correct version ${params.pluginVersion}. There is no need to setup a local development environment.

              Here is important information about the directory structure, which will be helpful in the next steps:

              - The Shopware root directory is located at the path "${shopwarePath}".
              - The plugin root directory for the plugin ${params.pluginName} is located at the path "${pluginPath}".

              Now proceed with the next step of the bugfix process.
            `,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `
              An error occurred while looking for files in the project directory. Show the following message to the user before proceeding or retrying any steps:

              Could not read files in the project directory. Please set the PROJECT_DIRECTORY environment variable to the absolute path of the project directory to check for a local development environment.
            `,
          },
        ],
      };
    }
  },
};
