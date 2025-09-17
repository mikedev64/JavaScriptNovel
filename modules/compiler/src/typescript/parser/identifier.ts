import type { IParser, TParserType } from "../../../types/parser";
import type { IToken, TTokenType } from "../../../types/token";
import JVNCompilerError from "../error";
import { VALUE_SPECIAL_PAREN_CLOSE, VALUE_SPECIAL_PAREN_OPEN } from "./constants";

type TReturnType = [IParser<TParserType>, number];

export function variableTypeDeclaration(
        token: IToken<TTokenType>,
        tokens: IToken<TTokenType>[],
        counter: number,
): TReturnType {
        const node: IParser<TParserType> = {
                type: "VariableDeclaration",
                value: token.value,
                params: null,
                body: null,
        };

        if (token.value === "audio") node.type = "AudioDeclaration";
        if (token.value === "video") node.type = "VideoDeclaration";
        if (token.value === "image") node.type = "ImageDeclaration";
        if (token.value === "character") node.type = "CharacterDeclaration";

        return [node, counter++];
}

export function functionTypeDeclaration(
        token: IToken<TTokenType>,
        tokens: IToken<TTokenType>[],
        counter: number,
): TReturnType {
        const node: IParser<TParserType> = {
                type: "CallExpression",
                value: token.value,
                params: [],
                body: null,
        };

        counter++;
        const internal_token = tokens[counter];

        if (internal_token.value !== VALUE_SPECIAL_PAREN_OPEN)
                throw new JVNCompilerError(
                        `Expected '(', but got '${internal_token.value}'`,
                        internal_token.line,
                        internal_token.column,
                );

        counter++;
        let current_token = tokens[counter];
        while (
                current_token &&
                (current_token.type !== "parenthesis" ||
                        current_token.value !== VALUE_SPECIAL_PAREN_CLOSE)
        ) {
                counter++;
                current_token = tokens[counter];
        }

        return [node, counter];
}
