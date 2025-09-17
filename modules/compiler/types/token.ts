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

type TTokenValueType<T extends TTokenType> = T extends "text"
        ? string
        : T extends "double_quote"
          ? string
          : T extends "single_quote"
            ? string
            : T extends "parenthesis"
              ? string
              : T extends "operator"
                ? string
                : T extends "number"
                  ? number
                  : T extends "boolean"
                    ? boolean
                    : T extends "keys"
                      ? string
                      : T extends "bracket"
                        ? string
                        : never;

export type TTokenType =
        | "text"
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
