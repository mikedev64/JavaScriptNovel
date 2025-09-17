import {
        FLOAT_POINT_REGEX,
        KEYWORDS,
        NUMBER_REGEX,
        SINGLE_QUOTE_REGEX,
        TEXT_REGEX_FULL,
} from "./constants/index.js";
import { IToken, returnToken } from "../../../types/token";
import JVNCompilerError from "../error/index.js";

export function textToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"text" | "keyword"> = {
                type: "text",
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

                if (TEXT_REGEX_FULL.exec(char) !== null) {
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

                if (FLOAT_POINT_REGEX.test(char)) {
                        if (valueStr.includes(".")) {
                                throw new JVNCompilerError(
                                        `Unexpected float point at line ${line + 1}, column ${iteration + 1}`,
                                );
                        }

                        if (valueStr === "") {
                                break;
                        }

                        token.type = "float";
                        valueStr += char;
                        iteration++;
                        continue;
                }

                if (NUMBER_REGEX.test(char)) {
                        valueStr += char;
                        iteration++;
                        continue;
                } else {
                        break;
                }
        }
        if (valueStr !== "") {
                if (token.type === "float") {
                        const value = parseFloat(valueStr);
                        if (!isNaN(value)) {
                                token.value = value;
                        }
                } else {
                        const value = parseInt(valueStr, 10);
                        if (!isNaN(value)) {
                                token.value = value;
                        }
                }
        } else {
                console.log("valueStr is empty!");
        }

        return [iteration - column, token];
}

export function quoteToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"double_quote" | "single_quote"> = {
                type: "double_quote",
                value: "",
                line: line + 1,
                column: column + 1,
        };

        const char = currentLine[column];

        if (SINGLE_QUOTE_REGEX.exec(char) !== null) {
                token.type = "single_quote";
        }

        token.value = char;
        return [column, token];
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
