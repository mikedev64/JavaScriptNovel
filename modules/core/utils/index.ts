import type { CoreGenerics } from "../types/generics";

/**
 * Extrae la extensión de un archivo desde su ruta
 * @param filePath ruta del archivo
 * @returns {string} string
 */
export function getFileExtension(filePath: string): string {
        const lastDotIndex = filePath.lastIndexOf('.');
        return lastDotIndex !== -1 ? filePath.substring(lastDotIndex + 1).toLowerCase() : '';
}

/**
 * Valida si la extensión del archivo coincide con el tipo especificado
 * @param filePath ruta del archivo
 * @param expectedType tipo de archivo esperado
 * @returns {boolean} boolean
 */
export function validateFileExtension(filePath: string, expectedType: CoreGenerics.TFileType): boolean {
        const fileExtension = getFileExtension(filePath);
        return fileExtension === expectedType;
}