export default class JVNCompilerError extends Error {
        constructor(message: string, type?: string, line?: number, column?: number) {
                super(`${message} - ${type ?? null} - ${line ?? null}:${column ?? null}`);
                this.name = "JVNCompilerError";
        }
}
