import { fecthFiles } from "./utils/fecthFile"
import { CoreGenerics } from "../../../../types/generics"
import ErrorHandler from "../../error"
import { bytesToSize } from "../../../../utils"

export default class VideoManager extends ErrorHandler implements IVideoManager {
        private static INSTANCE: VideoManager | null
        private Collection: Map<TMapKey, TMapValue> = new Map()

        private constructor() {
                super(VideoManager.name)
                this.Collection = new Map()
        }

        /**
         * Crea o devuelve la instancia unica de la clase
         * @returns {IVideoManager} IVideoManager
         */
        static instance(): VideoManager {
                if (!VideoManager.INSTANCE) VideoManager.INSTANCE = new VideoManager();
                return VideoManager.INSTANCE
        }

        /**
         * Obtiene un blob de video desde la ruta especificada
         * @param type tipo de archivo de video
         * @param path ruta del archivo de video
         * @returns {Promise<Blob | null>} Blob del video o null si hay un error
         */
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

                const VideoObject: TMapValue = {
                        BlobBruto: videoBlob,
                        BlobUrl: null,
                        createdAt: Date.now(),
                        size: bytesToSize(videoBlob.size)
                }

                this.Collection.set(name, VideoObject)

                return { [name]: VideoObject }
        }

        prepareMemoryMedia(name: string): parseStruct {
                const videoElement = this.getVideoElement(name)

                if (!videoElement) {
                        return this.logErrorInfo("prepareMedia", `El video con el nombre '${name}' no existe en la colección`)
                }

                if (videoElement[name].BlobUrl) {
                        this.logWarningInfo("prepareMedia", `El video '${name}' ya está preparado en memoria`)
                        return videoElement
                }

                videoElement[name].BlobUrl = URL.createObjectURL(videoElement[name].BlobBruto)
                this.Collection.set(name, videoElement[name])

                return videoElement
        }

        removeMemoryMedia(name: string): parseStruct {
                const videoElement = this.getVideoElement(name)

                if (!videoElement) {
                        return this.logErrorInfo("removeMedia", `El video con el nombre '${name}' no existe en la colección`)
                }

                if (!videoElement[name].BlobUrl) {
                        this.logErrorInfo("removeMedia", `El video '${name}' no está preparado en memoria`)
                        return videoElement
                }

                URL.revokeObjectURL(videoElement[name].BlobUrl as string);
                videoElement[name].BlobUrl = null

                this.Collection.set(name, videoElement[name])

                return { [name]: videoElement[name] }
        }
}

type TMapKey = string
type TMapValue = {
        BlobBruto: Blob
        BlobUrl: string | null
        createdAt: number
        size: string
}
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
        /**
         * Prepara el medio en memoria para su uso
         * @param name nombre del video a preparar
         * @returns {parseStruct} parseStruct
         */
        prepareMemoryMedia(name: string): parseStruct
        /**
         * Remueve el medio en memoria
         * @param name nombre del video a remover
         * @returns {boolean} parseStruct
         */
        removeMemoryMedia(name: string): parseStruct
}