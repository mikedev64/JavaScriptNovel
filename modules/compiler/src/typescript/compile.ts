// Tokenizer
import { TokenDetails } from "../../types/compile.js";
import { createParserToken } from "./parser/index.js";
import createTokenList from "./tokenizer/index.js";
// Types
import { resolve } from "node:path";

/**
 * Tokenizes the content of a file.
 * @param string_file The string content of the file to be tokenized.
 * @returns An array of token details for each line in the file.
 */
export function tokenizerFile(string_file: string, path_file: string) {
        const lineContent = string_file.split("\n");

        const tokenList: TokenDetails = {
                tokens: [],
                metadata: {
                        path: resolve(path_file),
                },
        };

        for (let line = 0; line < lineContent.length; line++) {
                const currentLine = lineContent[line];
                tokenList.tokens.push(...createTokenList(line, currentLine));
        }

        return tokenList;
}

/**
 * Parses a list of token details and returns the parsed tokens.
 * @param token_list List of tokens to be parsed.
 */
export function parserData(token_list: TokenDetails) {
        const { metadata, tokens } = token_list;

        const parsed_token = createParserToken(tokens);

        return {
                parsedTokens: parsed_token,
                metadata,
        };
}
