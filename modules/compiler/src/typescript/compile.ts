// Tokenizer
import createTokenList from "./tokenizer/index.js"
// Types
import type { IToken, TTokenType } from "../../types/token"

export default function compileFile(string_file: string) {
    let lineContent = string_file.split("\n");

    let tokenList: IToken<TTokenType>[] = [];

    for (let line = 0; line < lineContent.length; line++) {
        const currentLine = lineContent[line];
        tokenList.push(...createTokenList(line, currentLine));
    }

    return tokenList;
}