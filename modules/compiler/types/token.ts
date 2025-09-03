export type returnToken = [
        number, // column
        IToken<TTokenType> // Token
]

export interface IToken<T extends TTokenType> {
        type: T;
        value: TTokenValueType<T>;
        line: number;
        column: number;
}

type TTokenValueType<T extends TTokenType> = T extends "text" ? string :
        T extends "double_quote" ? string :
        T extends "single_quote" ? string :
        T extends "parenthesis" ? string :
        T extends "operator" ? string :
        T extends "number" ? number :
        T extends "boolean" ? boolean :
        never;

export type TTokenType =
        | "text"
        | "number"
        | "boolean"
        | "parenthesis"
        | "keys"
        | "keyword"
        | "double_quote"
        | "single_quote"
        | "operator"