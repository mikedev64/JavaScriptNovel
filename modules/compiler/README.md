# @noveljs/compiler
Este paquete contiene el compilador de archivos NovelScript (.jvn) y retorna un JSON estructurado para interpretar las historias escritas en el lenguaje.

## Contrato JSON
Estructura de compilacion con nombre y tipo de TypeScript

#### Node Base del programa
```ts
interface Start {
        type: "Program";
        body: BlockInstruction[];
}
```

#### Node de los bloques de intruccion (escenas)
```ts
interface BlockInstruction {
        scene: string;
        body: Instruction[];
        metadata: {
                file: string;
                path: string;
        }
}
```

> Este es un tipo generico y una version simplificada del mismo, se recomienda mirar la documentacion de [Instruction Generic Type](#)

#### Node de intruccion
```ts
interface Instruction {
        value: string | number | boolean;
        lin: number;
        arguments: (string | number | boolean)[];
        body: IInstructionStruct[];
        type:
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
                | 'start'
                | 'loop'
                | 'fade'
                | 'draw';
        directives:
                | Instruction
                | (
                        | "string"
                        | "number"
                        | "boolean"
                        | "audio"
                        | "video"
                        | "image"
                );
}
```