import type { CoreGenerics } from "../../../../../types/generics";

import { LocationFiles } from "../../../../../constants";
import { validateFileExtension } from "../../../../../utils";

import ErrorHandler from "../../../error";

type TFecthFiles = Promise<ArrayBuffer | null>
/**
 * 
 * @param type tipo de archivo de audio
 * @param path ruta del archivo
 * @returns {TFecthFiles} TFecthFiles
 */
export async function fecthFiles(type: CoreGenerics.TFileTypeAudio, path: CoreGenerics.TFilePath): TFecthFiles {
        const validFormats: CoreGenerics.TFileTypeAudio[] = ["mp3", "wav", "ogg"];

        if (!validFormats.includes(type)) {
                return new ErrorHandler(fecthFiles.name).logErrorInfo(
                        "fecthFiles",
                        `El tipo de archivo '${type}' no es válido. Formatos válidos: ${validFormats.join(", ")}`
                )
        }

        // Validar que la extensión del archivo coincida con el tipo esperado
        if (!validateFileExtension(path, type)) {
                return new ErrorHandler(fecthFiles.name).logErrorInfo(
                        "fecthFiles",
                        `La extensión del archivo '${path}' no coincide con el tipo esperado '${type}'`
                )
        }

        // Determinar la ruta base para audio
        const basePath = LocationFiles.audio.development;
        
        const fullPath = `${basePath}${path}`;
        
        try {
                const response = await fetch(fullPath);
                
                if (!response.ok) {
                        return new ErrorHandler(fecthFiles.name).logErrorInfo(
                                "fecthFiles",
                                `Error al cargar el archivo: ${response.status} ${response.statusText}`
                        )
                }
                
                return await response.arrayBuffer();
        } catch (error) {
                return new ErrorHandler(fecthFiles.name).logErrorInfo(
                        "fecthFiles",
                        `Error de red al cargar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`
                )
        }
}
