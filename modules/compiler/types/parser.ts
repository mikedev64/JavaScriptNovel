export type TParserType =
        | "NumberLiteral"
        | "StringLiteral"
        | "BooleanLiteral"
        | "CallExpression"
        | "Identifier"
        | "VariableDeclaration"
        | "ImageDeclaration"
        | "AudioDeclaration"
        | "VideoDeclaration"
        | "DialogueDeclaration"
        | "CharacterDeclaration"
        | "SceneDeclaration"
        | "Program";

export interface IParser<T extends TParserType> {
        type: T;
        value: string | number | boolean;
        params: TParserParams<T>;
        body: TParserBody<T>;
}

export type TParserParams<T extends TParserType> = T extends "CallExpression" | "SceneDeclaration"
        ? IParser<
                  Exclude<
                          TParserType,
                          | "SceneDeclaration"
                          | "Program"
                          | "VariableDeclaration"
                          | "ImageDeclaration"
                          | "AudioDeclaration"
                          | "DialogueDeclaration"
                          | "CharacterDeclaration"
                  >
          >[]
        : null;

export type TParserBody<T extends TParserType> = T extends "SceneDeclaration"
        ? IParser<TParserType>[]
        : null;
