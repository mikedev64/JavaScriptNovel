import type { ElectronAPITemplate } from "../../../utils";

import { ElectronAPI, getPlatform, ReadLocalStorage, WriteLocalStorage } from "../../../utils";
import ErrorHandler from "../error";
import CorePersistent from "../persistent";
import CoreTimeline from "../timeline";

/**
 * Gestor de guardados
 * @class SavesManager
 * @implements {ISavesManager}
 */
export default class SavesManager extends ErrorHandler implements ISavesManager {
        private static INSTANCE: SavesManager | null = null
        private Saves: ISaveSlots[] | null = []

        private constructor() {
                super(SavesManager.name)
                if (!SavesManager.INSTANCE) SavesManager.INSTANCE = new SavesManager();
                return SavesManager.INSTANCE;
        }

        /**
         * Inicializa el gestor de guardados
         * @returns {Promise<ISavesManager>} ISavesManager
         */
        static async initializeSaves(): Promise<ISavesManager> {
                let data;
                if (getPlatform() === "electron") {
                        const electronAPI = ElectronAPI() as ElectronAPITemplate;
                        data = await electronAPI.readStorage("saves") || null;
                } else {
                        data = ReadLocalStorage<ISaveSlots[]>("saves");
                }

                SavesManager.INSTANCE = new SavesManager();
                SavesManager.INSTANCE.Saves = data
                return SavesManager.INSTANCE;
        }

        async storeSaves(): Promise<void> {
                if (!this.Saves) {
                        this.logErrorInfo("storeSaves", "No hay guardados para almacenar");
                        return;
                }

                if (getPlatform() === "electron") {
                        const electronAPI = ElectronAPI() as ElectronAPITemplate;
                        await electronAPI.writeStorage("saves", this.Saves);
                } else {
                        WriteLocalStorage<ISaveSlots[]>("saves", this.Saves);
                }
        }

        getSaves(): ISaveSlots[] {
                if (!this.Saves) return [];
                return this.Saves;
        }

        getOneSave(page: number, slot: number): ISaveStruct | null {
                if (!this.Saves) return null;
                const pageSaves = this.Saves[page];
                if (!pageSaves) return null;
                return pageSaves[slot] || null;
        }

        addSave(save: Pick<ISaveStruct, "thumbnail">, page: number, slot: number): void {
                if (!this.Saves) this.Saves = [];
                if (!this.Saves[page]) this.Saves[page] = {};

                if (this.Saves[page][slot]) {
                        console.warn(`Slot ${slot} on page ${page} already exists. Overwriting.`);
                }

                const persistent = CorePersistent.instance().getAllVariables()!;
                const history = CoreTimeline.instance().getHistoryGram();

                this.Saves[page][slot] = {
                        ...save,
                        timestamp: Date.now(),
                        persistent: persistent,
                        history: history
                };
        }

        removeSave(page: number, slot: number): void {
                if (!this.Saves) return;

                delete this.Saves[page][slot];
        }
}

type TPersistentObject = { [K: string]: string | number | boolean }
type THistoryActions = { thread: { scene: number; position: number; }[]; position: number }

interface ISaveStruct {
        thumbnail: string
        timestamp: number
        persistent: TPersistentObject
        history: THistoryActions
}

interface ISaveSlots {
        [index: number]: ISaveStruct
}

interface ISavesManager {
        /**
         * Obtiene los guardados
         * @returns {ISaveSlots[]} ISaveSlots[]
         */
        getSaves(): ISaveSlots[]
        /**
         * Obtiene un guardado por su índice
         * @param {number} index Índice del guardado
         * @returns {ISaveStruct | null} ISaveStruct o null si no existe
         */
        getOneSave(page: number, slot: number): ISaveStruct | null
        /**
         * Añade un guardado
         * @param {ISaveStruct} save Estructura del guardado
         * @param {number} page Página del guardado
         * @param {number} slot Slot del guardado
         */
        addSave(save: ISaveStruct, page: number, slot: number): void
        /**
         * Elimina un guardado por su índice
         * @param {number} index Índice del guardado
         */
        removeSave(page: number, slot: number): void
        /**
         * Almacena los guardados
         */
        storeSaves(): Promise<void>;
}