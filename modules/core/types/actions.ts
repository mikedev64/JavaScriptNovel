import { InterpreterTypes } from "./interpreter.js";

export namespace InterpreterActions {
        export type TLenguageActions =
                | "volume"
                | "play"
                | "pause"
                | "callExpression"
                | "jump"
                | "update"
                | "variable"
                | "audio"
                | "video"
                | "image"
                | "dialogue"
                | "scene"
                | "background"
                | "draw"
                | "undraw" // WTF is this?

        export type TLenguageModificatorOptions =
                | "start"
                | "loop"
                /* | "reverse" */ // Pending
                | "fade"
                | "draw"

        export type TLenguageModificators<T extends TLenguageModificatorOptions> = T

        export type TLenguageStruct<T extends TLenguageActions> =
                T extends "play" ? IMapActionPlay :
                T extends "pause" ? IMapActionPause :
                T extends "callExpression" ? IMapActionCallExpression :
                T extends "jump" ? IMapActionJump :
                T extends "variable" ? IMapActionVariable :
                T extends "update" ? IMapActionUpdate :
                T extends "audio" ? IMapActionAudio :
                T extends "video" ? IMapActionVideo :
                T extends "image" ? IMapActionImage :
                T extends "dialogue" ? IMapActionDialogue :
                T extends "scene" ? IMapActionScene :
                T extends "background" ? IMapActionBackground :
                T extends "draw" ? IMapActionDraw :
                T extends "undraw" ? IMapActionUndraw :
                never;

        export interface IInstructionStruct {
                type: TLenguageActions
                arguments: any[any] | null
                modificators: TLenguageModificators<TLenguageModificatorOptions> | null
                value: string | number | boolean | { [K: string]: any } | null
                directives: IInstructionStruct | InterpreterTypes.TLenguageTypes<InterpreterTypes.TLenguageSpecialTypes | InterpreterTypes.TLenguageVariableTypes> | null
                body: IInstructionStruct[] | null
        }

        export interface IMapActionPlay extends IInstructionStruct {
                type: "play"
                name: "play"
                arguments: [InterpreterTypes.TLenguageTypes<"audio">]
                modificators: TLenguageModificators<"loop"> | null
                directives: {
                        type: "volume"
                        name: "volume"
                        arguments: [InterpreterTypes.TLenguageTypes<"number">]
                        modificators: null
                        directives: null
                        value: null
                        body: null
                } | null
        }
        export interface IMapActionPause extends IInstructionStruct {
                type: "pause"
                name: "pause"
                arguments: [InterpreterTypes.TLenguageTypes<"audio">]
        }
        export interface IMapActionCallExpression extends IInstructionStruct {
                type: "callExpression"
                name: string
                arguments: [InterpreterTypes.TLenguageTypes<"string">]
        }
        export interface IMapActionJump extends IInstructionStruct {
                type: "jump"
                name: "jump"
                arguments: [InterpreterTypes.TLenguageTypes<"string">]
                modificators: TLenguageModificators<"fade"> | null
        }
        export interface IMapActionVariable extends IInstructionStruct {
                type: "variable"
                name: string
                value: InterpreterTypes.TLenguageTypes<"string" | "number" | "boolean">
        }
        export interface IMapActionUpdate extends IInstructionStruct {
                type: "update"
                name: string
                value: InterpreterTypes.TLenguageTypes<"string" | "number" | "boolean">
        }
        export interface IMapActionAudio extends IInstructionStruct {
                type: "audio"
                name: string
                value: InterpreterTypes.TLenguageTypes<"audio">
        }
        export interface IMapActionVideo extends IInstructionStruct {
                type: "video"
                name: string
                value: InterpreterTypes.TLenguageTypes<"video">
        }
        export interface IMapActionImage extends IInstructionStruct {
                type: "image"
                name: string
                value: InterpreterTypes.TLenguageTypes<"image">
        }
        export interface IMapActionDialogue extends IInstructionStruct {
                type: "dialogue"
                name: string
                value: InterpreterTypes.TLenguageTypes<"string">
        }
        export interface IMapActionScene extends IInstructionStruct {
                type: "scene"
                name: string
                body: IInstructionStruct[] | null
                modificators: InterpreterActions.TLenguageModificators<"start"> | null
        }
        export interface IMapActionBackground extends IInstructionStruct {
                type: "background"
                name: null
                arguments: null
                value: null
                body: null
                directives: InterpreterTypes.TLenguageTypes<"string" | "image"> | null
        }
        export interface IMapActionDraw extends IInstructionStruct {
                type: "draw"
                name: null
                arguments: null
                value: null
                body: null
                directives: {
                        type: "callExpression"
                        name: string
                        arguments: any[any] | null
                        modificators: null
                        value: null
                        directives: null
                        body: null
                }
        }
        export interface IMapActionUndraw extends IInstructionStruct {
                type: "undraw"
                name: null
                arguments: null
                value: null
                body: null
                directives: {
                        type: "callExpression"
                        name: string
                        arguments: any[any] | null
                        modificators: null
                        value: null
                        directives: null
                        body: null
                }
        }
}