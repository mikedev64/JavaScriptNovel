#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import novelScriptCompiler from "../src/typescript/index.js";

const console_arguments = process.argv;

// Función principal del CLI
async function main() {
        // Obtener argumentos de la línea de comandos
        const args = console_arguments.slice(2);

        if (args.length === 0) {
                // eslint-disable-next-line no-console
                console.log("Uso: jvnc <carpeta>");
                // eslint-disable-next-line no-console
                console.log("Ejemplo: jvnc ./resources/");
                process.exit(1);
        }

        const folderPath = args[0];

        try {
                // eslint-disable-next-line no-console
                console.log(`Compilando archivos de la carpeta: ${folderPath}`);

                // Compilar los archivos
                const compileResults = await novelScriptCompiler(folderPath);

                // Generar el archivo compile.json
                const outputPath = resolve(process.cwd(), "./assets/compile.json");
                writeFileSync(outputPath, JSON.stringify(compileResults, null, 2), "utf-8");
                // eslint-disable-next-line no-console
                console.log(`✅ Compilación completa! Resultados guardados en: ${outputPath}`);
        } catch (error) {
                // eslint-disable-next-line no-console
                console.error("❌ Error durante la compilación:", error);
                process.exit(1);
        }
}

// Ejecutar la función principal
// eslint-disable-next-line no-console
main().catch(console.error);
