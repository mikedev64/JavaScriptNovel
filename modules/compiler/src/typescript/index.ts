import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";

// Compilator
import compileFile from "./compile.js";
import { resolve } from "node:path";

export default async function novelScriptCompiler(script_url: string) {
        console.log(resolve(process.cwd(), script_url));
        
        const novelScriptFileLocations = glob(`${script_url}/**/*.jvn`);

        let compiled: any[] = []
 
        for await (const scriptLocation of novelScriptFileLocations) {
                const stringFile = readFileSync(scriptLocation, { encoding: "utf-8" })

                const tokenList = compileFile(stringFile)

                compiled.push(tokenList)
        }
        
        console.log("compiled: ",compiled);
}

novelScriptCompiler("./resources/")