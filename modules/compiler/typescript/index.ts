import { glob } from "node:fs/promises";

export default function NovelScriptCompiler(script_url: string) {
        const NovelScriptFileLocations = glob(`${script_url}/**/*.jvn`);

        
}