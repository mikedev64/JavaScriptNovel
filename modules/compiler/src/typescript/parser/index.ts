import type { IParser, TParserType } from "../../../types/parser";
import type { IToken, TTokenType } from "../../../types/token";

import { KEYWORD_FUNCTIONS, KEYWORD_VARIABLES } from "./constants/index.js";
import { variableTypeDeclaration } from "./identifier.js";

/**
 * Creates a parser token from the given token.
 * @param token The token to create a parser token from.
 */
export function createParserToken<T extends boolean>(
        tokens: IToken<TTokenType>[],
        counter: number = 0,
        flag: T = false as T,
): T extends false ? IParser<TParserType>[] : IParser<TParserType> {
        const parsed_tokens: IParser<TParserType>[] = [];

        let actual_token = counter ?? 0;

        if (
                tokens[actual_token].type === "keyword" &&
                KEYWORD_VARIABLES.includes(tokens[actual_token].value as string)
        ) {
                const [node, new_counter] = variableTypeDeclaration(
                        tokens[actual_token],
                        tokens,
                        actual_token,
                );
                actual_token = new_counter;
                parsed_tokens.push(node);
        }

        if (
                tokens[actual_token].type === "keyword" &&
                KEYWORD_FUNCTIONS.includes(tokens[actual_token].value as string)
        ) {
        }

        function FlagOperator(flag: boolean) {
                return flag ? parsed_tokens[0] : parsed_tokens;
        }

        return FlagOperator(flag) as T extends false
                ? IParser<TParserType>[]
                : IParser<TParserType>;
}
