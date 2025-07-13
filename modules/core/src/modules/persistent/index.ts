import ErrorHandler from "../error";
import { parseToCollectionParamCheck, parseFromCollectionParamCheck } from "./helpers/validations";

/**
 * Almacena todas las variables logicas de la novel visual
 */
export default class CorePersistent extends ErrorHandler implements ICorePersistent {
        private static INSTANCE: null | CorePersistent
        readonly Collection: Map<string, string | number | boolean>

        private constructor() {
                super(CorePersistent.name)
                this.Collection = new Map()
        }

        /**
         * Crea o devuelve la instancia unica de la clase
         * @returns {ICorePersistent} ICorePersistent
         */
        static instance(): ICorePersistent {
                if (!CorePersistent.INSTANCE) CorePersistent.INSTANCE = new CorePersistent();
                return CorePersistent.INSTANCE
        }

        /**
         * Tranforma, valida y guarda los valores al mapa, retornando informacion de la variable y su estado
         * @param varName nombre de la variable
         * @param varValue valor de la variable
         * @returns {parseStruct} parseStruct
         */
        private parseToCollection(varName: TMapKey, varValue: TMapValue): parseStruct {
                const { varNameCondition, varValueCondition } = parseToCollectionParamCheck(varName, varValue)
                if (varNameCondition) return this.logErrorInfo("parseToCollection", "El nombre de la variable debe ser string");
                if (varValueCondition) return this.logErrorInfo("parseToCollection", "El valor de la variable debe ser string, number o boolean");

                this.Collection.set(varName, varValue)

                return { [varName]: varValue }
        }

        /**
         * Tranforma, valida y extrae los valores del mapa, retornando informacion de la variable y su estado
         * @param varName nombre de la variable
         * @param varValue valor de la variable
         * @returns {parseStruct} parseStruct
         */
        private parseFromCollection<T extends string>(varName: T): parseStruct {
                const { varNameCondition } = parseFromCollectionParamCheck(varName, undefined)
                if (varNameCondition) return this.logErrorInfo("parseFromCollection", "El nombre de la variable debe ser string");
                
                const varResult = this.Collection.get(varName)

                const { varResultCondition } = parseFromCollectionParamCheck(undefined, varResult)
                if (varResultCondition) return this.logErrorInfo("parseFromCollection", "La variable no existe en la colección");

                return { [varName]: varResult as TMapValue }
        }

        setVariable(name: TMapKey, value: TMapValue): parseStruct {
                const result = this.Collection.get(name)
                if (typeof result !== "undefined") return this.logErrorInfo("setVariable", "La variable ya existe, usa putVariable para actualizarla");

                return this.parseToCollection(name, value)
        }

        putVariable(name: TMapKey, value: TMapValue): parseStruct {
                return this.parseToCollection(name, value)
        }

        getVariable(name: string): parseStruct {
                return this.parseFromCollection(name)
        }
}

type TMapKey = string
type TMapValue = string | number | boolean
type parseStruct = { [K in TMapKey]: TMapValue } | null

interface ICorePersistent {
        readonly Collection: Map<TMapKey, TMapValue>
        /**
         * Crea una variable del contexto actual
         * @returns {parseStruct} parseStruct
         */
        getVariable(name: TMapKey): parseStruct
        /**
         * Actualiza una variable del contexto actual
         * @returns {parseStruct} parseStruct
         */
        putVariable(name: TMapKey, value: TMapValue): parseStruct
        /**
         * Retorna una variable del contexto actual
         * @returns {parseStruct} parseStruct
         */
        setVariable(name: TMapKey, value: TMapValue): parseStruct
}