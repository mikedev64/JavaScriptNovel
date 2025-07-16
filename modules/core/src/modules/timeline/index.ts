export class CoreTimeline {
        private static INSTANCE: CoreTimeline | null

        private constructor() { }

        /**
         * Crea o devuelve la instancia unica de la clase
         * @returns {ICoreTimeline} ICoreTimeline
         */
        static instance(): ICoreTimeline {
                if (!CoreTimeline.INSTANCE) CoreTimeline.INSTANCE = new CoreTimeline();
                return CoreTimeline.INSTANCE
        }
}

interface ICoreTimeline {

}