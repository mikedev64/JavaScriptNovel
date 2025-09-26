export type TParserType =
        | "NumberLiteral"
        | "FloatLiteral"
        | "StringLiteral"
        | "BooleanLiteral"
        | "CallExpression"
        | "IdentifierUsage"
        | "IdentifierAssignment"
        | "VariableDeclaration"
        | "ImageDeclaration"
        | "AudioDeclaration"
        | "VideoDeclaration"
        | "DialogueDeclaration"
        | "CharacterDeclaration"
        | "SceneDeclaration"
        | "Program";

export type TParserModificator = "loop" | "fade" | "start" | "stop" | "";

export interface IParser<T extends TParserType> {
        type: T;
        name: TParserName<T>;
        value: string | number | boolean;
        params: TParserParams<T>;
        body: TParserBody<T>;
        modificators: TParserModificators<T>;
}

export type TParserParams<T extends TParserType> = T extends "CallExpression" | "SceneDeclaration" ? IParser<TParserType>[] : undefined;

export type TParserBody<T extends TParserType> = T extends "SceneDeclaration" ? IParser<TParserType>[] : undefined;

export type TParserName<T extends TParserType> = T extends
        | "IdentifierUsage"
        | "CallExpression"
        | "SceneDeclaration"
        | "VariableDeclaration"
        | "ImageDeclaration"
        | "AudioDeclaration"
        | "VideoDeclaration"
        | "CharacterDeclaration"
        ? string
        : undefined;

export type TParserModificators<T extends TParserType> = T extends
        | "CallExpression"
        | "SceneDeclaration"
        | "VariableDeclaration"
        | "ImageDeclaration"
        | "AudioDeclaration"
        | "VideoDeclaration"
        | "CharacterDeclaration"
        ? TParserModificator
        : undefined;
