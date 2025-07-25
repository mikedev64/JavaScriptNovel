import StoryBoardManager from "./stoyboard";

export class CoreTimeline extends StoryBoardManager implements ICoreTimeline {
        private static TIMELINE_INSTANCE: CoreTimeline | null
        
        private HistoryGram: IHistoryGram[] = []
        private actualHistoryGram: IHistoryGram = {
                scene: 0,
                position: 0
        }

        private constructor() { super(CoreTimeline.name) }

        /**
         * Crea o devuelve la instancia unica de la clase
         * @returns {ICoreTimeline} ICoreTimeline
         */
        static instance(): ICoreTimeline {
                if (!CoreTimeline.TIMELINE_INSTANCE) CoreTimeline.TIMELINE_INSTANCE = new CoreTimeline();
                return CoreTimeline.TIMELINE_INSTANCE;
        }

        getActualHistoryGram(): IHistoryGram {
                return this.actualHistoryGram;
        }

        getHistoryGram(): IHistoryGram[] {
                return this.HistoryGram;
        }

        createHistoryGram(scenePosition: number, blockInstructionPosition: number): void {
                const GettedScene = this.getScene(scenePosition);
                if (!GettedScene || !GettedScene.body || !Array.isArray(GettedScene.body)) {
                        this.logErrorInfo("Scene body is not an array or is null", `${GettedScene}`);
                        return;
                }

                const GettedScenePosition = GettedScene.body[blockInstructionPosition];
                if (!GettedScenePosition || !GettedScenePosition.name) {
                        this.logErrorInfo("Block instruction position is not valid", `${GettedScenePosition}`);
                        return;
                }

                this.HistoryGram?.push({
                        scene: scenePosition,
                        position: blockInstructionPosition
                });
        }

        restoreHistoryGram(history: IHistoryGram[]): void {
                this.HistoryGram = history;
        }

        addHistoryEntry(scenePosition: number, blockInstructionPosition: number): void {
                if (this.HistoryGram.length >= 50) {
                        this.HistoryGram.shift();
                }

                this.HistoryGram.push({
                        scene: scenePosition,
                        position: blockInstructionPosition
                });
        }
}

interface IHistoryGram {
        scene: number;
        position: number;
}

interface ICoreTimeline {
        /**
         * Obtiene el actual bloque de acciones
         * @returns {IHistoryGram} Historial de acciones
         */
        getActualHistoryGram(): IHistoryGram
        /**
         * Obtiene el historial de acciones
         * @returns {IHistoryGram[]} Historial de acciones
         */
        getHistoryGram(): IHistoryGram[]
        /**
         * Crea o devuelve la instancia unica de la clase
         * @returns {ICoreTimeline} ICoreTimeline
         */
        createHistoryGram(scenePosition: number, blockInstructionPosition: number): void
        /**
         * Agrega una entrada completa al historial de acciones
         * @param {number} scenePosition Posicion de la escena
         * @param {number} blockInstructionPosition Posicion de la instruccion del bloque
         */
        restoreHistoryGram(history: IHistoryGram[]): void
        /**
         * Agrega una entrada al historial de acciones
         * @param {number} scenePosition Posicion de la escena
         * @param {number} blockInstructionPosition Posicion de la instruccion del bloque
         */
        addHistoryEntry(scenePosition: number, blockInstructionPosition: number): void
}