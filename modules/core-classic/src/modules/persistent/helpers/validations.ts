export function parseToCollectionParamCheck(varName: string, varValue: string | number | boolean) {
        return {
                varNameCondition: typeof varName !== "string",
                varValueCondition: typeof varValue !== "string" && typeof varValue !== "number" && typeof varValue !== "boolean"
        }
}

export function parseFromCollectionParamCheck(varName: string | undefined, varResult: string | number | boolean | undefined) {
        return {
                varNameCondition: typeof varName !== "string",
                varResultCondition: typeof varResult === "undefined"
        }
}