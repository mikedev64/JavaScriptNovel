export namespace InterpreterTypes {
        export type TLenguageVariableTypes =
                | "string"
                | "number"
                | "boolean"

        export type TLenguageSpecialTypes =
                | "audio"
                | "video"
                | "image"

        export interface ITLenguageTypesString {
                value: string
        }
        export interface ITLenguageTypesNumber {
                value: number
        }
        export interface ITLenguageTypesBoolean {
                value: boolean
        }
        export interface ITLenguageTypesAudio {
                value: string
                channel: string
        }
        export interface ITLenguageTypesVideo {
                value: string
        }
        export interface ITLenguageTypesImage {
                value: string
        }

        export type TLenguageTypes<T extends TLenguageSpecialTypes | TLenguageVariableTypes> =
                T extends "string" ? ITLenguageTypesString :
                T extends "number" ? ITLenguageTypesNumber :
                T extends "boolean" ? ITLenguageTypesBoolean :
                T extends "audio" ? ITLenguageTypesAudio :
                T extends "video" ? ITLenguageTypesVideo :
                T extends "image" ? ITLenguageTypesImage :
                never;
}