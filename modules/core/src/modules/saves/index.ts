import type { ElectronAPITemplate } from "../../../utils";

import { InterpreterActions } from "../../../types/actions";
import { ElectronAPI, getPlatform } from "../../../utils";

/**
 * Gestor de guardados
 * @class SavesManager
 * @implements {ISavesManager}
 */
export default class SavesManager implements ISavesManager {
        private static INSTANCE: SavesManager | null = null
        private Saves: ISaveSlots[] | null = []

        private constructor() {
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
                        data = localStorage.getItem("saves");
                        data = JSON.parse(data as string) as ISaveSlots[] || null;
                }

                SavesManager.INSTANCE = new SavesManager();
                SavesManager.INSTANCE.Saves = data
                return SavesManager.INSTANCE;
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

        addSave(save: ISaveStruct, page: number, slot: number): void {
                if (!this.Saves) this.Saves = [];
                if (!this.Saves[page]) this.Saves[page] = {};

                if (this.Saves[page][slot]) {
                        console.warn(`Slot ${slot} on page ${page} already exists. Overwriting.`);
                }

                this.Saves[page][slot] = save;
        }

        removeSave(page: number, slot: number): void {
                if (!this.Saves) return;

                delete this.Saves[page][slot];
        }
}

type TPersistentObject = { [K: string]: string | number | boolean }
type THistoryActions = InterpreterActions.IMapActionScene

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
}