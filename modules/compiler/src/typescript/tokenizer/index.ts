// Constants
import { DOUBLE_QUOTE_REGEX, PARENTHESIS_REGEX,SINGLE_QUOTE_REGEX,SPACE_REGEX, TEXT_REGEX } from "../../../constants/index.js";
// Functions
import { parenToken, quoteToken, textToken } from "./identifier.js";
// Types
import type { IToken, TTokenType } from "../../../types/token";

/**
 * Specify the type of token in the current line.
 * @param line The line number.
 * @param currentLine The current line of code.
 */
export default function createTokenList(line: number, currentLine: string): IToken<TTokenType>[] {
        const Tokens: IToken<TTokenType>[] = [];

        for (let column = 0; column < currentLine.length; column++) {
                if (TEXT_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = textToken(line, column, currentLine);
                        column += _column - 1;

                        Tokens.push(token);
                        continue;
                }

                if (currentLine[column] === "\"" || currentLine[column] === "\'") {
                        const [_column, token] = quoteToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }
                
                if (currentLine[column] === "(" || currentLine[column] === ")") {
                        const [_column, token] = parenToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                

                if (SPACE_REGEX.exec(currentLine[column]) !== null) {
                        continue;
                }
        }

        return Tokens;
}