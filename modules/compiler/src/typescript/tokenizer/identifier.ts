import { KEYWORDS, SINGLE_QUOTE_REGEX, SPACE_REGEX, TEXT_REGEX_FULL } from "../../../constants/index.js";
import { IToken, returnToken } from "../../../types/token";

export function textToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"text" | "keyword"> = {
                type: "text",
                value: "",
                line: line + 1,
                column
        };

        let iteration = column;
        console.log("Start: ", iteration);

        while (iteration < currentLine.length) {

                if (KEYWORDS.includes(token.value)) {
                        token.type = "keyword";
                        break;
                }

                const char = currentLine[iteration];

                if (TEXT_REGEX_FULL.exec(char) !== null) {
                        token.value += char;
                        iteration++
                        continue;
                } else {
                        break;
                }
        }

        return [iteration - column, token];
}

export function quoteToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"double_quote" | "single_quote"> = {
                type: "double_quote",
                value: "",
                line: line + 1,
                column
        };

        const char = currentLine[column];

        if (SINGLE_QUOTE_REGEX.exec(char) !== null) {
                token.type = "single_quote";
        }

        token.value = char;

        return [column, token];
}

export function parenToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"parenthesis"> = {
                type: "parenthesis",
                value: "",
                line: line + 1,
                column
        };

        const char = currentLine[column];

        token.value = char;

        return [column, token];
}