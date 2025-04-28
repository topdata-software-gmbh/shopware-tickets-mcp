import { z } from 'zod';

export default {
  name: 'get-bugfix-instructions',
  description: 'Get instructions on how to fix a bug in a plugin',
  parameters: {
    shopwareVersion: z
      .string()
      .describe(
        'The affected Shopware version in the format 1.0.0.0'
      ),
    pluginName: z
      .string()
      .describe(
        'The plugin name. Usually in pascal case consisting of the vendor prefix and the plugin name e.g. VendorPluginName.'
      ),
    pluginVersion: z
      .string()
      .describe(
        'The affected plugin version in the format 1.0.0.0'
      ),
  },
  handler: async (params: {
    shopwareVersion: string,
    pluginName: string,
    pluginVersion: string
  }) => {
    return {
      content: [
        {
          type: 'text' as const,
          text: `
            You are a senior PHP developer with deep knowledge in Symfony and Shopware 6. You value effective code changes and maintainable architecture over quick and dirty fixes.

            Here are some instructions you should follow, when trying to fix a bug in the plugin ${params.pluginName} with version ${params.pluginVersion} running in Shopware ${params.shopwareVersion}.

            1. Always look for relevant parts in the Shopware source code before making suggestions. It can be found in one of the locations:
              - ./vendor/shopware/
              - ./src/

            2. Always look for relevant parts in the plugin source code before making suggestions. It can be found in one of the locations:
              - ./custom/plugins/${params.pluginName}
              - ./custom/static-plugins/${params.pluginName}
              - ./vendor/store.shopware.com/<Plugin name ${params.pluginName} in lowercase and maybe slightly modified>

            3. If there are informations about a support ticket associated with the bug, keep the information in mind.

            4. Make suggestions first and don't just start editing the code.

            5. If available use the Context7 MCP tools to take a look into the Shopware 6 documentation if necessary.
          `,
        },
      ]
    }
  },
};
