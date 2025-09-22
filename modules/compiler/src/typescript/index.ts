import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";

// Compilator
import { tokenizerFile, parserData } from "./compile.js";
import { resolve } from "node:path";
import { TokenDetails } from "../../types/compile.js";

export default async function novelScriptCompiler(script_url: string) {
        const novelscript_filelocations = glob(`${script_url}/**/*.jvn`);

        const tokenizer_compile: TokenDetails[] = [];

        for await (const scriptLocation of novelscript_filelocations) {
                const stringFile = readFileSync(scriptLocation, { encoding: "utf-8" });

                const tokenList = tokenizerFile(stringFile, scriptLocation);

                tokenizer_compile.push(tokenList);
        }

        const parsedResult = parserData(tokenizer_compile);

        console.log(JSON.stringify(parsedResult, null, 2));

        // Retornar los resultados compilados
        return {
                metadata: {
                        compiledAt: new Date().toISOString(),
                        sourceFolder: resolve(process.cwd(), script_url),
                        filesProcessed: tokenizer_compile.length,
                },
                tokenizer: tokenizer_compile,
                parser: parsedResult,
        };
}
// Ejecución
await novelScriptCompiler("./resources/");
