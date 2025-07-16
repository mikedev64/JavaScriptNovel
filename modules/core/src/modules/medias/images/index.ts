import { fecthFiles } from "./utils/fecthFile"
import { CoreGenerics } from "../../../../types/generics"
import ErrorHandler from "../../error"

export default class ImageManager extends ErrorHandler implements IImageManager {
        private static INSTANCE: ImageManager | null
        private Collection: Map<TMapKey, TMapValue>

        private constructor() {
                super(ImageManager.name)
                this.Collection = new Map()
        }

        static instance() {
                if (!ImageManager.INSTANCE) ImageManager.INSTANCE = new ImageManager();
                return ImageManager.INSTANCE
        }

        private async blobImage(type: CoreGenerics.TFileTypeImage, path: CoreGenerics.TFilePath): Promise<Blob | null> {
                const response = await fecthFiles(type, path)

                if (response === null || response instanceof Error) {
                        return this.logErrorInfo("blobImage", `Error al obtener el archivo: ${response instanceof Error ? response.message : "Archivo no encontrado"}`)
                }

                return new Blob([response], { type: `image/${type}` })
        }

        getImageElement(name: string): parseStruct {
                if (typeof name !== "string") {
                        return this.logErrorInfo("getImageElement", "El nombre de la imagen debe ser un string")
                }

                const imageBlob = this.Collection.get(name)

                if (!imageBlob) {
                        return this.logErrorInfo("getImageElement", `La imagen con el nombre '${name}' no existe en la colección`)
                }

                return { [name]: imageBlob }
        }

        async setImageElement(type: CoreGenerics.TFileTypeImage, path: CoreGenerics.TFilePath, name: string): Promise<parseStruct> {
                if (typeof name !== "string") {
                        return this.logErrorInfo("setImageElement", "El nombre de la imagen debe ser un string")
                }

                const imageBlob = await this.blobImage(type, path)

                if (!imageBlob) {
                        return this.logErrorInfo("setImageElement", `No se pudo obtener la imagen desde la ruta '${path}'`)
                }

                const ImageObject: TMapValue = {
                        BlobBruto: imageBlob,
                        BlobUrl: null,
                        createdAt: Date.now(),
                        size: imageBlob.size
                }

                this.Collection.set(name, ImageObject)

                return { [name]: ImageObject }
        }

        prepareMemoryMedia(name: string): parseStruct {
                const imageElement = this.getImageElement(name)

                if (!imageElement) {
                        return this.logErrorInfo("prepareMedia", `La imagen con el nombre '${name}' no existe en la colección`)
                }

                return imageElement
        }

        removeMemoryMedia(name: string): parseStruct {
                if (typeof name !== "string") {
                        return this.logErrorInfo("removeMedia", "El nombre de la imagen debe ser un string")
                }

                const imageElement = this.getImageElement(name)

                if (!imageElement) {
                        return this.logErrorInfo("removeMedia", `La imagen con el nombre '${name}' no existe en la colección`)
                }

                imageElement[name].BlobUrl = null

                this.Collection.set(name, imageElement[name])

                return { [name]: imageElement[name] }
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

interface IImageManager {
        /**
         * Obtiene un elemento de imagen almacenado en la colección
         * @param name nombre de la imagen
         * @returns {parseStruct} parseStruct
         */
        getImageElement(name: string): parseStruct
        /**
         * Establece un elemento de imagen en la colección
         * @param type tipo de archivo de imagen
         * @param path ruta del archivo de imagen
         * @param name nombre de la imagen
         * @returns {parseStruct} parseStruct
         */
        setImageElement(type: CoreGenerics.TFileTypeImage, path: CoreGenerics.TFilePath, name: string): Promise<parseStruct>
        /**
         * Prepara el medio en memoria para su uso
         * @param name nombre de la imagen a preparar
         * @returns {parseStruct} parseStruct
         */
        prepareMemoryMedia(name: string): parseStruct
        /**
         * Remueve el medio en memoria
         * @param name nombre de la imagen a remover
         * @returns {parseStruct} parseStruct
         */
        removeMemoryMedia(name: string): parseStruct
}