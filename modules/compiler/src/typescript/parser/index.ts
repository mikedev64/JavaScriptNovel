import type { IParser, TParserType } from "../../../types/parser";
import type { IToken, TTokenType } from "../../../types/token";
import JVNCompilerError from "../error/index.js";

import { KEYWORD_FUNCTIONS as _, KEYWORD_VARIABLES } from "./constants/index.js";
import { stringTypeDeclaration, variableTypeDeclaration } from "./identifier.js";

/**
 * Creates a parser token from the given token.
 * @param token The token to create a parser token from.
 */
export function createParserToken(tokens: IToken<TTokenType>[], counter: number = 0): IParser<TParserType> {
        let parsed_token: IParser<TParserType>;

        let actual_position = counter ?? 0;
        const actual_token = tokens[actual_position];

        if (actual_token.type === "keyword" && KEYWORD_VARIABLES.includes(actual_token.value as string)) {
                // ---------------- VariableDeclaration
                const [node, new_counter] = variableTypeDeclaration(actual_token, actual_position);

                actual_position = new_counter;
                parsed_token = node;

                return parsed_token;
        } else if (actual_token.type === "double_quote" || actual_token.type === "single_quote") {
                // ---------------- StringLiteral
                const [node, new_counter] = stringTypeDeclaration(actual_token, tokens, actual_position);

                actual_position = new_counter;
                parsed_token = node;

                return parsed_token;
        }

        throw new JVNCompilerError(
                `Error de sintaxis: Token inesperado '${actual_token.value}' en la posición ${actual_token.line}:${actual_token.column}`,
                actual_token.line,
                actual_token.column,
        );
}
