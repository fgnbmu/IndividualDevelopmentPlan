import kebabCase from 'lodash/kebabCase';

export const generateCssVariableName = (key: string, prefix: string): string => {
  return `--${prefix}-${kebabCase(key)}`;
};