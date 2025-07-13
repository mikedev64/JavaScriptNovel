import { fecthFiles } from "./utils/fecthFile"
import { CoreGenerics } from "../../../../types/generics"
import ErrorHandler from "../../error"

export default class VideoManager extends ErrorHandler implements IVideoManager {
        private static INSTANCE: VideoManager | null
        private Collection: Map<TMapKey, TMapValue>

        private constructor() {
                super(VideoManager.name)
                this.Collection = new Map()
        }

        static instance() {
                if (!VideoManager.INSTANCE) VideoManager.INSTANCE = new VideoManager();
                return VideoManager.INSTANCE
        }

        private async blobVideo(type: CoreGenerics.TFileTypeVideo, path: CoreGenerics.TFilePath): Promise<Blob | null> {
                const response = await fecthFiles(type, path)

                if (response === null || response instanceof Error) {
                        return this.logErrorInfo("blobVideo", `Error al obtener el archivo: ${response instanceof Error ? response.message : "Archivo no encontrado"}`)
                }

                return new Blob([response], { type: `video/${type}` })
        }

        getVideoElement(name: string): parseStruct {
                if (typeof name !== "string") {
                        return this.logErrorInfo("getVideoElement", "El nombre del video debe ser un string")
                }

                const videoBlob = this.Collection.get(name)

                if (!videoBlob) {
                        return this.logErrorInfo("getVideoElement", `El video con el nombre '${name}' no existe en la colección`)
                }

                return { [name]: videoBlob }
        }

        async setVideoElement(type: CoreGenerics.TFileTypeVideo, path: CoreGenerics.TFilePath, name: string): Promise<parseStruct> {
                if (typeof name !== "string") {
                        return this.logErrorInfo("setVideoElement", "El nombre del video debe ser un string")
                }

                const videoBlob = await this.blobVideo(type, path)

                if (!videoBlob) {
                        return this.logErrorInfo("setVideoElement", `No se pudo obtener el video desde la ruta '${path}'`)
                }

                this.Collection.set(name, videoBlob)

                return { [name]: videoBlob }
        }
}

type TMapKey = string
type TMapValue = Blob
type parseStruct = { [K in TMapKey]: TMapValue } | null

interface IVideoManager {
        /**
         * Obtiene un elemento de video almacenado en la colección
         * @param name nombre del video
         * @returns {parseStruct} parseStruct
         */
        getVideoElement(name: string): parseStruct
        /**
         * Establece un elemento de video en la colección
         * @param type tipo de archivo de video
         * @param path ruta del archivo de video
         * @param name nombre del video
         * @returns {parseStruct} parseStruct
         */
        setVideoElement(type: CoreGenerics.TFileTypeVideo, path: CoreGenerics.TFilePath, name: string): Promise<parseStruct>
}