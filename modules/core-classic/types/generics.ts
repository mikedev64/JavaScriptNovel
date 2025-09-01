export namespace CoreGenerics {
        export type TFileType = "mp4" | "webm" | "avi" | "mp3" | "wav" | "ogg" | "png" | "jpg" | "gif"
        export type TFileTypeVideo = "mp4" | "webm" | "avi"
        export type TFileTypeAudio = "mp3" | "wav" | "ogg"
        export type TFileTypeImage = "png" | "jpg" | "gif"
        export type TFilePath = string
        
        export type TPlatform = "web" | "electron"
        export type TEnvironment = "development" | "production"
        export type TStorageMethod = "localStorage" | "electronStore" | "fileSystem"
}