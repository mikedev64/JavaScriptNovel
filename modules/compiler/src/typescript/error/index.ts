export default class JVNCompilerError extends Error {
        constructor(message: string, line?: number, column?: number) {
                super(`${message} - ${line ?? null}:${column ?? null}`);
                this.name = "JVNCompilerError";
        }
}
