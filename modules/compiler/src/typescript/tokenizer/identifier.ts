import { KEYWORDS, NUMBER_REGEX, TEXT_REGEX, TEXT_REGEX_FULL } from "./constants/index.js";
import { IToken, returnToken } from "../../../types/token";

export function specialToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"name" | "keyword"> = {
                type: "name",
                value: "",
                line: line + 1,
                column: column + 1,
        };

        let iteration = column;

        while (iteration < currentLine.length) {
                if (KEYWORDS.includes(token.value)) {
                        token.type = "keyword";
                        break;
                }

                const char = currentLine[iteration];

                if (TEXT_REGEX.exec(char) !== null) {
                        token.value += char;
                        iteration++;
                        continue;
                } else {
                        break;
                }
        }

        return [iteration - column, token];
}

export function numberToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"number" | "float"> = {
                type: "number",
                value: 0,
                line: line + 1,
                column: column + 1,
        };

        let valueStr = "";
        let iteration = column;

        while (iteration < currentLine.length) {
                const char = currentLine[iteration];

                if (NUMBER_REGEX.exec(char) !== null) {
                        valueStr += char;
                        iteration++;
                        continue;
                } else {
                        break;
                }
        }

        if (valueStr.includes(".")) {
                token.type = "float";
                token.value = parseFloat(valueStr);
        } else {
                token.value = parseInt(valueStr);
        }

        return [iteration - column, token];
}

export function textToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"string"> = {
                type: "string",
                value: "",
                line: line + 1,
                column: column + 1,
        };

        let iteration = column;

        while (iteration < currentLine.length) {
                const nextChar = currentLine[++iteration];

                if (TEXT_REGEX_FULL.exec(nextChar) !== null) {
                        token.value += nextChar;
                        continue;
                } else {
                        break;
                }
        }

        return [iteration - column, token];
}

export function parenToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"parenthesis"> = {
                type: "parenthesis",
                value: char,
                line: line + 1,
                column: column + 1,
        };

        return [column, token];
}

export function keysToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"keys"> = {
                type: "keys",
                value: char,
                line: line + 1,
                column: column + 1,
        };

        return [column, token];
}

export function operatorToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"operator"> = {
                type: "operator",
                value: char,
                line: line + 1,
                column: column + 1,
        };

        return [column, token];
}

export function bracketToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"bracket"> = {
                type: "bracket",
                value: char,
                line: line + 1,
                column: column + 1,
        };

        return [column, token];
}

export function commaToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"comma"> = {
                type: "comma",
                value: char,
                line: line + 1,
                column: column + 1,
        };

        return [column, token];
}

export function dotToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"dot"> = {
                type: "dot",
                value: char,
                line: line + 1,
                column: column + 1,
        };

        return [column, token];
}
