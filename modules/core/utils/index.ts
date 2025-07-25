import ErrorHandler from "../src/modules/error";
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

/**
 * Obtiene la plataforma de ejecución actual
 * @returns {'web' | 'electron'} string
 */
export function getPlatform(): CoreGenerics.TPlatform {
        // Verificar UserAgent específico para builds de JSN
        if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
                const userAgent = window.navigator.userAgent.toLowerCase();
                if (userAgent.includes('jsn_build')) {
                        return 'electron';
                }
        }
        
        // Fallback: asumir web si no se detecta el UserAgent específico
        return 'web';
}

/**
 * Escribe datos en localStorage de manera segura
 * @param key clave para almacenar
 * @param value valor a almacenar
 * @returns {boolean} true si se guardó correctamente
 */
export function WriteLocalStorage<T>(key: string, value: T): boolean {
        try {
                if (typeof localStorage === 'undefined') {
                        new ErrorHandler("Utils").logErrorInfo("WriteLocalStorage", "localStorage no está disponible en este entorno");
                        return false;
                }
                
                const serializedValue = JSON.stringify(value);
                localStorage.setItem(key, serializedValue);
                return true;
        } catch (error) {
                new ErrorHandler("Utils").logErrorInfo("WriteLocalStorage", `Error writing to localStorage for key "${key}": ${error}`);
                return false;
        }
}

/**
 * Elimina una clave de localStorage de manera segura
 * @param key clave a eliminar
 * @returns {boolean} true si se eliminó correctamente
 */
export function RemoveLocalStorage(key: string): boolean {
        try {
                if (typeof localStorage === 'undefined') {
                        new ErrorHandler("Utils").logErrorInfo("RemoveLocalStorage", "localStorage no está disponible en este entorno");
                        return false;
                }
                
                localStorage.removeItem(key);
                return true;
        } catch (error) {
                new ErrorHandler("Utils").logErrorInfo("RemoveLocalStorage", `Error removing from localStorage for key "${key}": ${error}`);
                return false;
        }
}

/**
 * Plantilla de tipos para la API de Electron
 * Define estos tipos según tus necesidades específicas
 */
export interface ElectronAPITemplate {
        // Storage methods
        readStorage: (key: string) => Promise<any>;
        writeStorage: (key: string, value: any) => Promise<boolean>;
        removeStorage: (key: string) => Promise<boolean>;
        
        // File system methods
        readFile: (path: string) => Promise<any>;
        writeFile: (path: string, data: any) => Promise<boolean>;
        
        // System methods
        getAppVersion: () => Promise<string>;
        openExternal: (url: string) => Promise<void>;
        
        // Agrega más métodos según necesites
        [key: string]: any;
}

/**
 * Obtiene la interfaz de Electron si está disponible
 * @returns {ElectronAPITemplate | null} API de Electron o null
 */
export function ElectronAPI(): ElectronAPITemplate | null {
        try {
                if (typeof window !== 'undefined' && 
                    (window as any).JavaScriptNovelInterface) {
                        return (window as any).JavaScriptNovelInterface as ElectronAPITemplate;
                }
                return null;
        } catch (error) {
                new ErrorHandler("Utils").logErrorInfo("ElectronAPI", `Error accessing Electron API: ${error}`);
                return null;
        }
}