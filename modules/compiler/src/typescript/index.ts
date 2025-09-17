import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";

// Compilator
import tokenizerFile, { parserData } from "./compile.js";
import { resolve } from "node:path";
import { TokenDetails } from "../../types/compile.js";

export default async function novelScriptCompiler(script_url: string) {
        console.log(resolve(process.cwd(), script_url));

        const novelscript_filelocations = glob(`${script_url}/**/*.jvn`);

        const tokenizer_compile: TokenDetails[] = [];

        for await (const scriptLocation of novelscript_filelocations) {
                const stringFile = readFileSync(scriptLocation, { encoding: "utf-8" });

                const tokenList = tokenizerFile(stringFile, scriptLocation);

                tokenizer_compile.push(tokenList);
        }

        console.log("tokenizer_compile: ", JSON.stringify(tokenizer_compile, null, 4));

        const _parser_compile: unknown[] = [];

        for (const tokens of tokenizer_compile) {
                parserData(tokens);
        }
}

novelScriptCompiler("./resources/");
