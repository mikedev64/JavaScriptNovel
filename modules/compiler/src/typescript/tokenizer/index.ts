// Constants
import {
        BRACKET_REGEX,
        COMMA_REGEX,
        DOT_REGEX,
        DOUBLE_QUOTE_REGEX,
        KEYS_REGEX,
        NUMBER_REGEX,
        OPERATOR_REGEX,
        PARENTHESIS_REGEX,
        SINGLE_QUOTE_REGEX,
        SPACE_REGEX,
        TEXT_REGEX,
} from "./constants/index.js";
// Functions
import { bracketToken, commaToken, dotToken, keysToken, numberToken, operatorToken, parenToken, quoteToken, textToken } from "./identifier.js";
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

                if (NUMBER_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = numberToken(line, column, currentLine);
                        column += _column - 1;

                        Tokens.push(token);
                        continue;
                }

                if (KEYS_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = keysToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                if (DOUBLE_QUOTE_REGEX.exec(currentLine[column]) !== null || SINGLE_QUOTE_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = quoteToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                if (PARENTHESIS_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = parenToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                if (BRACKET_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = bracketToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                if (OPERATOR_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = operatorToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                if (COMMA_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = commaToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                if (DOT_REGEX.exec(currentLine[column]) !== null) {
                        const [_column, token] = dotToken(line, column, currentLine);

                        Tokens.push(token);
                        continue;
                }

                if (SPACE_REGEX.exec(currentLine[column]) !== null) {
                        continue;
                }
        }

        return Tokens;
}
