import { CoreGenerics } from "../../../types/generics";
import ErrorHandler from "../error";

export default class StoryBoardManager extends ErrorHandler implements IStoryboardManager {
        private static INSTANCE: StoryBoardManager | null
        private Collection: Map<TMapKey, TMapValue>

        private constructor() {
                super(StoryBoardManager.name)
                this.Collection = new Map()
        }

        /**
         * Crea o devuelve la instancia unica de la clase
         * @returns {IStoryboardManager} IStoryboardManager
         */
        static instance(): IStoryboardManager {
                if (!StoryBoardManager.INSTANCE) StoryBoardManager.INSTANCE = new StoryBoardManager();
                return StoryBoardManager.INSTANCE
        }

}

type TMapKey = string
type TMapValue = string

type parseStruct = TMapValue | null

interface IStoryboardManager {

}