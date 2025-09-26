export type returnToken = [
        number, // column
        IToken<TTokenType>, // Token
];

export interface IToken<T extends TTokenType> {
        type: T;
        value: TTokenValueType<T>;
        line: number;
        column: number;
}

type TTokenValueType<T extends TTokenType> = T extends
        | "string"
        | "name"
        | "double_quote"
        | "single_quote"
        | "parenthesis"
        | "operator"
        | "boolean"
        | "keys"
        | "bracket"
        | "comma"
        | "dot"
        ? string
        : T extends "number"
          ? number
          : never;

export type TTokenType =
        | "dot"
        | "comma"
        | "string"
        | "name"
        | "number"
        | "float"
        | "boolean"
        | "parenthesis"
        | "keys"
        | "keyword"
        | "bracket"
        | "double_quote"
        | "single_quote"
        | "operator";
