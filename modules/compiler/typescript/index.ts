import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";

// Compilator
import CompileFile from "./compile";

export default async function NovelScriptCompiler(script_url: string) {
        const NovelScriptFileLocations = glob(`${script_url}/**/*.jvn`);

        for await (const ScriptLocation of NovelScriptFileLocations) {
                const stringFile = readFileSync(ScriptLocation, { encoding: "utf-8" })

                CompileFile(stringFile)
        }
}