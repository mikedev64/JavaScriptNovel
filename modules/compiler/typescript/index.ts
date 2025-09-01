import { glob } from "node:fs/promises";

export default async function NovelScriptCompiler(script_url: string) {
        const NovelScriptFileLocations = glob(`${script_url}/**/*.jvn`);

        for await (const ScriptLocation of NovelScriptFileLocations) {
                
        }
}