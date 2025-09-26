import { createParserToken } from "./index.js";
import type { IParser, TParserModificator, TParserType } from "../../../types/parser";
import type { IToken, TTokenType } from "../../../types/token";
import JVNCompilerError from "../error/index.js";
import { VALUE_SPECIAL_KEY_CLOSE, VALUE_SPECIAL_KEY_OPEN, VALUE_SPECIAL_PAREN_CLOSE, VALUE_SPECIAL_PAREN_OPEN } from "./constants/index.js";

type TReturnType = [IParser<TParserType>, number];

export function textTypeDeclaration(token: IToken<TTokenType>, tokens: IToken<TTokenType>[], counter: number): TReturnType {
        const node: IParser<"StringLiteral"> = {
                type: "StringLiteral",
                value: token.value,
                name: undefined,
                params: undefined,
                body: undefined,
                modificators: undefined,
        };

        return [node, counter];
}

/**
 * Parses a variable declaration from the given token.
 * @param token actual token
 * @param counter current token index
 * @returns parsed variable declaration
 */
export function variableTypeDeclaration(token: IToken<TTokenType>, tokens: IToken<TTokenType>[], counter: number): TReturnType {
        const node: IParser<"VariableDeclaration" | "AudioDeclaration" | "VideoDeclaration" | "ImageDeclaration" | "CharacterDeclaration"> = {
                type: "VariableDeclaration",
                value: "",
                name: "",
                params: undefined,
                body: undefined,
                modificators: token.value as TParserModificator,
        };

        if (token.value === "audio") node.type = "AudioDeclaration";
        if (token.value === "video") node.type = "VideoDeclaration";
        if (token.value === "image") node.type = "ImageDeclaration";
        if (token.value === "character") node.type = "CharacterDeclaration";

        ++counter;

        const [return_node, new_counter] = createParserToken<"IdentifierAssignment", false>(tokens, counter, false)!;
        node.name = return_node.name!;
        node.value = return_node.value;

        return [node, new_counter];
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
                value: "",
                name: token.value as string,
                params: [],
                body: undefined,
                modificators: "",
        };

        let current_token = tokens[++counter];

        if (current_token.value !== VALUE_SPECIAL_PAREN_OPEN)
                throw new JVNCompilerError(
                        `Expected '(', but got '${current_token.value}'`,
                        current_token.type,
                        current_token.line,
                        current_token.column,
                );

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
                name: "",
                params: [],
                body: [],
                modificators: "",
        };

        let current_token = tokens[++counter];

        if (current_token.value !== VALUE_SPECIAL_PAREN_OPEN)
                throw new JVNCompilerError(
                        `Expected '(', but got '${current_token.value}'`,
                        current_token.type,
                        current_token.line,
                        current_token.column,
                );

        current_token = tokens[++counter];

        while (current_token.type !== "parenthesis" || current_token.value !== VALUE_SPECIAL_PAREN_CLOSE) {
                const [return_node, new_counter] = createParserToken(tokens, counter, false)!;

                node.params.push(return_node);
                counter = new_counter;
                current_token = tokens[++counter];
        }

        current_token = tokens[++counter];

        if (current_token.value !== VALUE_SPECIAL_KEY_OPEN)
                throw new JVNCompilerError(
                        `Expected '{', but got '${current_token.value}'`,
                        current_token.type,
                        current_token.line,
                        current_token.column,
                );

        current_token = tokens[++counter];

        while (current_token.type !== "keys" || current_token.value !== VALUE_SPECIAL_KEY_CLOSE) {
                const [return_node, new_counter] = createParserToken(tokens, counter, false);

                node.body.push(return_node);
                counter = new_counter;
                current_token = tokens[++counter];
        }

        return [node, counter];
}

export function functionModificatorTypeDeclaration(token: IToken<TTokenType>, tokens: IToken<TTokenType>[], counter: number): TReturnType {
        const node: IParser<"CallExpression" | "SceneDeclaration"> = {
                type: "CallExpression",
                value: "",
                name: "",
                params: [],
                body: undefined,
                modificators: token.value as TParserModificator,
        };

        ++counter;

        const [return_node, new_counter] = createParserToken<"CallExpression" | "SceneDeclaration", false>(tokens, counter, false)!;

        return_node.type === "SceneDeclaration" ? (node.type = "SceneDeclaration") : null;

        node.value = return_node.value;
        node.name = return_node.name ?? "";
        node.params = return_node.params!;
        node.body = return_node.body;

        return [node, new_counter];
}

export function LiteralTypeDeclaration(token: IToken<TTokenType>, tokens: IToken<TTokenType>[], counter: number): TReturnType {
        const node: IParser<"NumberLiteral" | "FloatLiteral" | "BooleanLiteral"> = {
                type: "NumberLiteral",
                value: token.value,
                name: undefined,
                params: undefined,
                body: undefined,
                modificators: undefined,
        };

        if (token.type === "float") {
                node.type = "FloatLiteral";
                node.value = token.value;
        } else if (token.type === "boolean") {
                node.type = "BooleanLiteral";
                node.value = token.value === "true";
        }

        return [node, counter];
}
