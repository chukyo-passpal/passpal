const main = {
  stories: [
    '../design-system/**/*.stories.@(js|jsx|ts|tsx)',
    '../design-system/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
  ],
};

export default main;