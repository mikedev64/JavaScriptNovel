import type { IParser, TParserType } from "../../../types/parser";
import type { IToken, TTokenType } from "../../../types/token";
import JVNCompilerError from "../error/index.js";

import {
        KEYWORD_FUNCTIONS as _,
        KEYWORD_FUNCTIONS,
        KEYWORD_FUNCTIONS_SCENE,
        KEYWORD_MODIFICATORS,
        KEYWORD_TYPES,
        KEYWORD_VARIABLES,
        VALUE_IGNORE,
} from "./constants/index.js";
import {
        functionModificatorTypeDeclaration,
        functionSceneTypeDeclaration,
        functionTypeDeclaration,
        LiteralTypeDeclaration,
        textTypeDeclaration,
        variableTypeDeclaration,
} from "./identifier.js";

/**
 * Creates a parser token from the given token.
 * @param token The token to create a parser token from.
 */
export function createParserToken<U extends TParserType, T extends boolean>(
        tokens: IToken<TTokenType>[],
        counter: number = 0,
        flag: T = true as T,
): T extends true ? IParser<U | TParserType>[] : [IParser<U | TParserType>, number] {
        const parser_tokens: IParser<U | TParserType>[] = [];

        for (let actual_position = counter ?? 0; actual_position < tokens.length; actual_position++) {
                const actual_token = tokens[actual_position];

                if (actual_token.type === "keyword" && KEYWORD_VARIABLES.includes(actual_token.value as string)) {
                        // ---------------- VariableDeclaration
                        const [node, new_counter] = variableTypeDeclaration(actual_token, tokens, actual_position);

                        actual_position = new_counter;

                        if (!flag) return [node, new_counter] as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
                        else parser_tokens.push(node);
                } else if (actual_token.type === "string") {
                        // ---------------- StringLiteral
                        const [node, new_counter] = textTypeDeclaration(actual_token, tokens, actual_position);

                        actual_position = new_counter;

                        if (!flag) return [node, new_counter] as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
                        else parser_tokens.push(node);
                } else if (actual_token.type === "keyword" && KEYWORD_FUNCTIONS.includes(actual_token.value as string)) {
                        // ---------------- CallExpression
                        const [node, new_counter] = functionTypeDeclaration(actual_token, tokens, actual_position);

                        actual_position = new_counter;

                        if (!flag) return [node, new_counter] as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
                        else parser_tokens.push(node);
                } else if (actual_token.type === "keyword" && KEYWORD_FUNCTIONS_SCENE.includes(actual_token.value as string)) {
                        // ---------------- SceneDeclaration
                        const [node, new_counter] = functionSceneTypeDeclaration(actual_token, tokens, actual_position);

                        actual_position = new_counter;

                        if (!flag) return [node, new_counter] as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
                        else parser_tokens.push(node);
                } else if (actual_token.type === "keyword" && KEYWORD_MODIFICATORS.includes(actual_token.value as string)) {
                        // ---------------- Modificator
                        const [node, new_counter] = functionModificatorTypeDeclaration(actual_token, tokens, actual_position);

                        actual_position = new_counter;

                        if (!flag) return [node, new_counter] as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
                        else parser_tokens.push(node);
                } else if (actual_token.type === "comma" || VALUE_IGNORE.includes(actual_token.value as string)) {
                        // ---------------- Ignore
                        continue;
                } else if (KEYWORD_TYPES.includes(actual_token.type)) {
                        // ---------------- Literal types (number, float, boolean)
                        const [node, new_counter] = LiteralTypeDeclaration(actual_token, tokens, actual_position);

                        if (!flag) return [node, new_counter] as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
                        else parser_tokens.push(node);
                } else {
                        throw new JVNCompilerError(
                                `Error de sintaxis: Token inesperado '${actual_token.value}'`,
                                actual_token.type,
                                actual_token.line,
                                actual_token.column,
                        );
                }
        }

        if (flag) {
                return parser_tokens as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
        }
        return [{}, 0] as T extends true ? IParser<TParserType>[] : [IParser<TParserType>, number];
}
