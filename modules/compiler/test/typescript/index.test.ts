import { beforeAll, describe, it } from "vitest"
import novelScriptCompiler from "../../src/typescript/index"

beforeAll(() => {

});

describe("TypeScript Compiler Tests", () => {
        it("should compile .jvn files correctly", async () => {
                await novelScriptCompiler("./resources/")
        });
});