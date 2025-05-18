import { generateCssVariableName } from "./generate-css-variable-name";

export const generateColorsAsCssVariables = (colors: Record<string, string>, prefix: string): string => {
  let variables = '';

  for (let key in colors) {
    const variableName = generateCssVariableName(key, prefix);
    variables += `
      ${variableName}: ${colors[key]};
    `;
  }

  return variables.trim();
};