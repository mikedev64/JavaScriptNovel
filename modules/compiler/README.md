# @noveljs/compiler

> [!IMPORTANT]
> **The compiler is a fundamental piece for the engine, and an extensibility system is planned for it**

This package contains the compiler for NovelScript (.jvn) files and returns a structured JSON to interpret stories written in the language.

## JSON Contract
Compilation structure with TypeScript name and type

### Program base node
```ts
interface Start {
        type: "Program";
        body: IInstruction<TInstructionType>[];
}
```

### Instruction node
```ts
export interface IInstruction<T extends TInstructionType> {
        value: string | number | boolean;
        lin: number;
        arguments: (string | number | boolean)[];
        body: IInstruction<TInstructionType>[];
        type: /* Generic T */
                | 'volume'
                | 'play'
                | 'pause'
                | 'callExpression'
                | 'jump'
                | 'update'
                | 'variable'
                | 'audio'
                | 'video'
                | 'image'
                | 'dialogue'
                | 'scene'
                | 'background'
                | 'draw'
                | 'undraw';
        modificators: 
                T extends "play" ? "loop" :
                T extends "scene" ? ("fade" | "start") :
                null;
        directives:
                T extends "variable" ? ("string" | "number" | "boolean") :
                T extends "audio" ? "audio" :
                T extends "video" ? "video" :
                T extends "image" ? "image" :
                null;
        metadata?: {
                file: string;
                path: string;
        }
}
```

> [!IMPORTANT]
> This is a generic type and a simplified version of everything it contains. It is recommended to check the documentation for [Instruction Generic Type](#)