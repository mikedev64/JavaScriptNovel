import { FLOAT_POINT_REGEX, KEYWORDS, NUMBER_REGEX, SINGLE_QUOTE_REGEX, SPACE_REGEX, TEXT_REGEX_FULL } from "../../../constants/index.js";
import { IToken, returnToken } from "../../../types/token";
import JVNError from "../error/index.js";

export function textToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"text" | "keyword"> = {
                type: "text",
                value: "",
                line: line + 1,
                column
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
                        iteration++
                        continue;
                } else {
                        break;
                }
        }

        token.column++
        return [iteration - column, token];
}

export function numberToken(line: number, column: number, currentLine: string): returnToken {
        const token: IToken<"number" | "float"> = {
                type: "number",
                value: 0,
                line: line + 1,
                column
        };

        let valueStr = "";
        let iteration = column;

        while (iteration < currentLine.length) {
                const char = currentLine[iteration];

                // Si encontramos un punto decimal
                if (FLOAT_POINT_REGEX.test(char)) {
                        // Si ya hay un punto, es un error
                        if (valueStr.includes(".")) {
                                throw new JVNError(`Unexpected float point at line ${line + 1}, column ${iteration + 1}`);
                        }
                        
                        // Si no hay números antes del punto, es inválido
                        if (valueStr === "") {
                                break;
                        }

                        token.type = "float";
                        valueStr += char;
                        iteration++;
                        continue;
                }

                // Si es un dígito
                if (NUMBER_REGEX.test(char)) {
                        valueStr += char;
                        iteration++;
                        continue;
                } else {
                        // Ya no hay más dígitos válidos, terminar
                        break;
                }
        }

        // Convertir el string a número
        console.log("valueStr:", valueStr, "token.type:", token.type);
        if (valueStr !== "") {
                if (token.type === "float") {
                        const value = parseFloat(valueStr);
                        console.log("parseFloat result:", value, "isNaN:", isNaN(value));
                        if (!isNaN(value)) {
                                token.value = value;
                        }
                } else {
                        const value = parseInt(valueStr, 10);
                        console.log("parseInt result:", value, "isNaN:", isNaN(value));
                        if (!isNaN(value)) {
                                token.value = value;
                        }
                }
        } else {
                console.log("valueStr is empty!");
        }

        console.log("Final token:", token);
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
        token.column++
        return [column, token];
}

export function parenToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"parenthesis"> = {
                type: "parenthesis",
                value: char,
                line: line + 1,
                column
        };

        return [column, token];
}

export function keysToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

<<<<<<< HEAD
        const token: IToken<"keys"> = {
                type: "keys",
                value: char,
                line: line + 1,
                column
        };

        return [column, token];
}

export function bracketToken(line: number, column: number, currentLine: string): returnToken {
        const char = currentLine[column];

        const token: IToken<"bracket"> = {
                type: "bracket",
                value: char,
                line: line + 1,
                column
        };

=======
        token.value = char;
        token.column++
>>>>>>> 14bec1a485ac015201694f6a4d19e6bd2df62407
        return [column, token];
}