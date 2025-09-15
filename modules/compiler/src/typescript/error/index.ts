export default class JVNError extends Error {
        constructor(message: string) {
                super(message);
                this.name = "JVNError";
        }
}