import JVNCompilerError from "../error";

export default class CompilerMemory extends JVNCompilerError {
        private static INSTANCE: CompilerMemory | null = null;

        private constructor() {
                super("Compiler Memory");
        }

        static instance() {
                if (!CompilerMemory.INSTANCE) CompilerMemory.INSTANCE = new CompilerMemory();
                return CompilerMemory.INSTANCE;
        }
}
