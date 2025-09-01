import { StoryBoardManager } from "./stoyboard";

export default class CoreTimeline extends StoryBoardManager implements ICoreTimeline {
        private static TIMELINE_INSTANCE: CoreTimeline | null

        private HistoryGram: IHistoryGram[] = []
        private actualHistoryGram: number = 0

        private constructor() { super(CoreTimeline.name) }

        static instance(): CoreTimeline {
                if (!CoreTimeline.TIMELINE_INSTANCE) CoreTimeline.TIMELINE_INSTANCE = new CoreTimeline();
                return CoreTimeline.TIMELINE_INSTANCE;
        }

        /**
         * Crea o devuelve la instancia unica de la clase
         * @returns {ICoreTimeline} ICoreTimeline
         */
        private createHistoryGram(scenePosition: number, blockInstructionPosition: number): void {
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

        getHistoryGram(): IHistoryStruct {
                return { thread: this.HistoryGram, position: this.actualHistoryGram };
        }

        getHistoryGramEntry(scenePosition: number, blockInstructionPosition: number): IHistoryGram | undefined {
                return this.HistoryGram.find(entry => entry.scene === scenePosition && entry.position === blockInstructionPosition);
        }

        restoreHistoryGram(progress: IHistoryStruct): void {
                this.HistoryGram = progress.thread;
                this.actualHistoryGram = progress.position;
        }

        addHistoryEntry(scenePosition: number, blockInstructionPosition: number): void {
                if (this.HistoryGram.length >= 10) {
                        this.HistoryGram.shift();
                }

                this.createHistoryGram(scenePosition, blockInstructionPosition);
        }

        moveInsideHistoryGram(direction: "backward" | "forward"): IHistoryGram {
                if (direction === "backward" && this.actualHistoryGram > 0) {
                        this.actualHistoryGram--;
                } else if (direction === "forward" && this.actualHistoryGram < 9) {
                        this.actualHistoryGram++;
                }

                return this.HistoryGram[this.actualHistoryGram];
        }
}

interface IHistoryGram {
        scene: number;
        position: number;
}

interface IHistoryStruct { thread: IHistoryGram[]; position: number }

interface ICoreTimeline {
        /**
         * Devuelve la instancia unica de la clase
         */
        getHistoryGram(): IHistoryStruct;
        /**
         * Agrega una entrada completa al historial de acciones
         * @param {number} scenePosition Posicion de la escena
         * @param {number} blockInstructionPosition Posicion de la instruccion del bloque
         */
        restoreHistoryGram(history: IHistoryStruct): void
        /**
         * Agrega una entrada al historial de acciones
         * @param {number} scenePosition Posicion de la escena
         * @param {number} blockInstructionPosition Posicion de la instruccion del bloque
         */
        addHistoryEntry(scenePosition: number, blockInstructionPosition: number): void
        /**
         * Obtiene una entrada del historial de acciones
         * @param {number} scenePosition Posicion de la escena
         * @param {number} blockInstructionPosition Posicion de la instruccion del bloque
         * @returns {IHistoryGram | undefined} Entrada del historial de acciones
         */
        getHistoryGramEntry(scenePosition: number, blockInstructionPosition: number): IHistoryGram | undefined
        /**
         * Mueve el historial de acciones hacia adelante o hacia atras
         * @param {string} direction Direccion del movimiento
         * @returns {IHistoryGram} Historial de acciones actualizado
         */
        moveInsideHistoryGram(direction: "backward" | "forward"): IHistoryGram
        /**
         * Agrega una escena al storyboard
         * @param {InterpreterActions.IMapActionScene} sceneData Datos de la escena
         */
}