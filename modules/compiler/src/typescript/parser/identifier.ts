import { createParserToken } from "./index.js";
import type { IParser, TParserType } from "../../../types/parser";
import type { IToken, TTokenType } from "../../../types/token";
import JVNCompilerError from "../error/index.js";
import { VALUE_SPECIAL_KEY_CLOSE, VALUE_SPECIAL_KEY_OPEN, VALUE_SPECIAL_PAREN_CLOSE, VALUE_SPECIAL_PAREN_OPEN } from "./constants/index.js";

type TReturnType = [IParser<TParserType>, number];

export function stringTypeDeclaration(token: IToken<TTokenType>, tokenz_list: IToken<TTokenType>[], counter: number): TReturnType {
        const condition = token.type === "double_quote" ? "double_quote" : "single_quote";

        const node: IParser<"StringLiteral"> = {
                type: "StringLiteral",
                value: "",
                params: null,
                body: null,
        };

        counter++;
        let internal_token = tokenz_list[counter];
        const string_value: string[] = [];

        while (internal_token.type !== condition) {
                string_value.push(`${internal_token.value}`);
                counter++;
                internal_token = tokenz_list[counter];
        }

        node.value = string_value.join(" ");
        return [node, counter];
}

/**
 * Parses a variable declaration from the given token.
 * @param token actual token
 * @param counter current token index
 * @returns parsed variable declaration
 */
export function variableTypeDeclaration(token: IToken<TTokenType>, counter: number): TReturnType {
        const node: IParser<"VariableDeclaration" | "AudioDeclaration" | "VideoDeclaration" | "ImageDeclaration" | "CharacterDeclaration"> = {
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

/**
 * Parses a function declaration from the given tokens.
 * @param token actual token
 * @param tokens list of tokens
 * @param counter current token index
 * @returns parsed function declaration
 */
export function functionTypeDeclaration(token: IToken<TTokenType>, tokens: IToken<TTokenType>[], counter: number): TReturnType {
        const node: IParser<"CallExpression"> = {
                type: "CallExpression",
                value: token.value,
                params: [],
                body: null,
        };

        let current_token = tokens[++counter];

        if (current_token.value !== VALUE_SPECIAL_PAREN_OPEN)
                throw new JVNCompilerError(`Expected '(', but got '${current_token.value}'`, current_token.line, current_token.column);

        current_token = tokens[++counter];

        while (current_token.type !== "parenthesis" || current_token.value !== VALUE_SPECIAL_PAREN_CLOSE) {
                const [return_node, new_counter] = createParserToken(tokens, counter, false)!;

                node.params!.push(return_node);
                counter = new_counter;
                current_token = tokens[++counter];
        }

        return [node, counter];
}

export function functionSceneTypeDeclaration(token: IToken<TTokenType>, tokens: IToken<TTokenType>[], counter: number): TReturnType {
        const node: IParser<"SceneDeclaration"> = {
                type: "SceneDeclaration",
                value: "",
                params: [],
                body: [],
        };

        let current_token = tokens[++counter];

        if (current_token.value !== VALUE_SPECIAL_PAREN_OPEN)
                throw new JVNCompilerError(`Expected '(', but got '${current_token.value}'`, current_token.line, current_token.column);

        current_token = tokens[++counter];

        while (current_token.type !== "parenthesis" || current_token.value !== VALUE_SPECIAL_PAREN_CLOSE) {
                const [return_node, new_counter] = createParserToken(tokens, counter, false)!;

                node.params.push(return_node);
                counter = new_counter;
                current_token = tokens[++counter];
        }

        current_token = tokens[++counter];

        if (current_token.value !== VALUE_SPECIAL_KEY_OPEN)
                throw new JVNCompilerError(`Expected '{', but got '${current_token.value}'`, current_token.line, current_token.column);

        current_token = tokens[++counter];

        while (current_token.type !== "keys" || current_token.value !== VALUE_SPECIAL_KEY_CLOSE) {
                const [return_node, new_counter] = createParserToken(tokens, counter, false);

                node.body.push(return_node);
                counter = new_counter;
                current_token = tokens[++counter];
        }

        return [node, counter];
}
