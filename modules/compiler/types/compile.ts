import type { IParser, TParserType } from "./parser";
import type { IToken, TTokenType } from "./token";

export interface IStart {
        type: "Program";
        body: IInstruction<TInstructionType>[];
}

export interface IInstruction<T extends TInstructionType> {
        value: string | number | boolean;
        lin: number;
        arguments: (string | number | boolean)[];
        body: IInstruction<TInstructionType>[];
        type: T;
        modificators: TInstructionModificator<T>[];
        directives: TInstructionDirectives<T>;
        metadata: {
                file: string;
                path: string;
        };
}

type TInstructionDirectives<T extends TInstructionType> = T extends "variable"
        ? "string" | "number" | "boolean"
        : T extends "audio"
          ? "audio"
          : T extends "video"
            ? "video"
            : T extends "image"
              ? "image"
              : T extends "character"
                ? "character"
                : null;

type TInstructionModificator<T extends TInstructionType> = T extends "play" ? "loop" : T extends "scene" ? "fade" | "start" : null;

type TInstructionType =
        | "volume"
        | "play"
        | "pause"
        | "callExpression"
        | "jump"
        | "update"
        | "variable"
        | "audio"
        | "video"
        | "image"
        | "character"
        | "dialogue"
        | "scene"
        | "background"
        | "draw"
        | "undraw";

/**
 * Tokenizer Structures
 */
export interface TokenDetails {
        tokens: IToken<TTokenType>[];
        metadata: {
                path: string;
        };
}

/**
 * Parser Structures
 */
export interface ParserDetails {
        keys: IParser<TParserType>[];
        metadata: {
                path: string;
        };
}
