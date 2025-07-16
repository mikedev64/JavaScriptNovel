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

                const AudioObject: TMapValue = {
                        BlobBruto: audioBlob,
                        BlobUrl: null,
                        createdAt: Date.now(),
                        size: audioBlob.size
                }

                this.Collection.set(name, AudioObject)

                return { [name]: AudioObject }
        }

        prepareMemoryMedia(name: string): parseStruct {
                const audioElement = this.getAudioElement(name)

                if (!audioElement) {
                        return this.logErrorInfo("prepareMedia", `El audio con el nombre '${name}' no existe en la colección`)
                }

                return audioElement
        }

        removeMemoryMedia(name: string): parseStruct {
                if (typeof name !== "string") {
                        return this.logErrorInfo("removeMedia", "El nombre del audio debe ser un string")
                }

                const audioElement = this.getAudioElement(name)

                if (!audioElement) {
                        return this.logErrorInfo("removeMedia", `El audio con el nombre '${name}' no existe en la colección`)
                }

                audioElement[name].BlobUrl = null

                this.Collection.set(name, audioElement[name])

                return { [name]: audioElement[name] }
        }
}

type TMapKey = string
type TMapValue = {
        BlobBruto: Blob
        BlobUrl: string | null
        createdAt: number
        size: number
}
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
        /**
         * Prepara el medio en memoria para su uso
         * @param name nombre del audio a preparar
         * @returns {parseStruct} parseStruct
         */
        prepareMemoryMedia(name: string): parseStruct
        /**
         * Remueve el medio en memoria
         * @param name nombre del audio a remover
         * @returns {parseStruct} parseStruct
         */
        removeMemoryMedia(name: string): parseStruct
}
