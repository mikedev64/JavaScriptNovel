export interface IStart {
        type: "Program";
        body: IInstruction<TInstructionType>[];
}

export interface IInstruction<T extends TInstructionType> {
        value: string | number | boolean;
        lin: number;
        arguments: (string | number | boolean)[];
        body: IInstruction<TInstructionType>[];
        type: T;
        modificators: TInstructionModificator<T>[];
        directives: TInstructionDirectives<T>;
        metadata: {
                file: string;
                path: string;
        }
}

type TInstructionDirectives<T extends TInstructionType> =
        T extends "variable" ? ("string" | "number" | "boolean") :
        T extends "audio" ? "audio" :
        T extends "video" ? "video" :
        T extends "image" ? "image" :
        null;

type TInstructionModificator<T extends TInstructionType> =
        T extends "play" ? "loop" :
        T extends "scene" ? ("fade" | "start") :
        null;

type TInstructionType =
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
        | "undraw"