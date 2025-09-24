import { writeFileSync } from "node:fs";
import novelScriptCompiler from "./typescript/index.js";
import { resolve } from "node:path";

const result = await novelScriptCompiler("./resources/");

const outputPath = resolve(process.cwd(), "../../assets/compile.json");
writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
