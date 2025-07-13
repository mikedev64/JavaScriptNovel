import { fecthFiles } from "./utils/fecthFile"
import { CoreGenerics } from "../../../../types/generics"
import ErrorHandler from "../../error"

export default class AudioManager extends ErrorHandler implements IAudioManager {
        private static INSTANCE: AudioManager | null
        private Collection: Map<TMapKey, TMapValue>

        private constructor() {
                super(AudioManager.name)
                this.Collection = new Map()
        }

        static instance() {
                if (!AudioManager.INSTANCE) AudioManager.INSTANCE = new AudioManager();
                return AudioManager.INSTANCE
        }

        private async blobAudio(type: CoreGenerics.TFileTypeAudio, path: CoreGenerics.TFilePath): Promise<Blob | null> {
                const response = await fecthFiles(type, path)

                if (response === null || response instanceof Error) {
                        return this.logErrorInfo("blobAudio", `Error al obtener el archivo: ${response instanceof Error ? response.message : "Archivo no encontrado"}`)
                }

                return new Blob([response], { type: `audio/${type}` })
        }

        getAudioElement(name: string): parseStruct {
                if (typeof name !== "string") {
                        return this.logErrorInfo("getAudioElement", "El nombre del audio debe ser un string")
                }

                const audioBlob = this.Collection.get(name)

                if (!audioBlob) {
                        return this.logErrorInfo("getAudioElement", `El audio con el nombre '${name}' no existe en la colección`)
                }

                return { [name]: audioBlob }
        }

        async setAudioElement(type: CoreGenerics.TFileTypeAudio, path: CoreGenerics.TFilePath, name: string): Promise<parseStruct> {
                if (typeof name !== "string") {
                        return this.logErrorInfo("setAudioElement", "El nombre del audio debe ser un string")
                }

                const audioBlob = await this.blobAudio(type, path)

                if (!audioBlob) {
                        return this.logErrorInfo("setAudioElement", `No se pudo obtener el audio desde la ruta '${path}'`)
                }

                this.Collection.set(name, audioBlob)

                return { [name]: audioBlob }
        }
}

type TMapKey = string
type TMapValue = Blob
type parseStruct = { [K in TMapKey]: TMapValue } | null

interface IAudioManager {
        /**
         * Obtiene un elemento de audio almacenado en la colección
         * @param name nombre del audio
         * @returns {parseStruct} parseStruct
         */
        getAudioElement(name: string): parseStruct
        /**
         * Establece un elemento de audio en la colección
         * @param type tipo de archivo de audio
         * @param path ruta del archivo de audio
         * @param name nombre del audio
         * @returns {parseStruct} parseStruct
         */
        setAudioElement(type: CoreGenerics.TFileTypeAudio, path: CoreGenerics.TFilePath, name: string): Promise<parseStruct>
}
