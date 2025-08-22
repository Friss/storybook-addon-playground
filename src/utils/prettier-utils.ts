import { format, Options } from "prettier";
import parserHtml from "prettier/plugins/html";
import pluginEstree from "prettier/plugins/estree";
import pluginTypescript from "prettier/plugins/typescript";
import pluginPostcss from "prettier/plugins/postcss";

const jsxOptions: Options = {
  parser: "typescript",
  arrowParens: "avoid",
  trailingComma: "es5",
  plugins: [pluginEstree, parserHtml, pluginTypescript],
};

const cssOptions: Options = {
  parser: "scss",
  plugins: [pluginPostcss],
};

export async function formatJsx(code: string): Promise<string> {
  return formatCode(code, jsxOptions);
}

export async function formatCss(code: string): Promise<string> {
  return formatCode(code, cssOptions);
}

async function formatCode(code: string, options: Options): Promise<string> {
  try {
    return (await format(code, options)).replace(/;\s*$/, "");
  } catch (e) {
    throw new Error(`[Playground Error]: Error formatting code: ${e}`);
  }
}
