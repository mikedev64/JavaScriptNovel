export default class ErrorHandler {
        readonly containerClass: string;
        constructor(container: string) {
                this.containerClass = container
        }

        /**
         * Creara un error de consola, indicando en donde se origino
         * @param caller nombre del método que invocó este error
         * @param details detalles adicionales del error (opcional)
         * @returns {null} retorna null
         */
        public logErrorInfo(caller: string, details: string): null {
                const timestamp = new Date().toISOString()
                const errorMessage = `[${timestamp}] Error en ${this.containerClass}.${caller}`

                console.error(errorMessage, "\n", `Detalles: ${details}`)

                return null
        }

        public logWarningInfo(caller: string, details: string): void {
                const timestamp = new Date().toISOString()
                const warningMessage = `[${timestamp}] Advertencia en ${this.containerClass}.${caller}`

                console.warn(warningMessage, "\n", `Detalles: ${details}`)
        }
}