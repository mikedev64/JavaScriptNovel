import { InterpreterActions } from "../../../types/actions";
import ErrorHandler from "../error";

export default class StoryBoardManager extends ErrorHandler implements IStoryboardManager {
        private static STORYBOARD_INSTANCE: StoryBoardManager | null
        private CollectionScenes: Map<TMapKey, TMapValue | InterpreterActions.IMapActionScene> = new Map()
        private sceneValueCounter: number = 1

        constructor(name?: string) {
                super(name || StoryBoardManager.name)
                if (!StoryBoardManager.STORYBOARD_INSTANCE) StoryBoardManager.STORYBOARD_INSTANCE = new StoryBoardManager();
                return StoryBoardManager.STORYBOARD_INSTANCE
        }

        private transformSceneBodyToBlockBody(sceneBody: InterpreterActions.IMapActionScene["body"]): parseStruct[] {
                if (!sceneBody || !Array.isArray(sceneBody)) {
                        this.logErrorInfo("Scene body is not an array or is null", `${sceneBody}`);
                        return [];
                }

                const InstructionBlock: parseStruct[] = [[]];

                let counter = 0;
                for (const block of sceneBody) {
                        if (!InstructionBlock[counter]) InstructionBlock.push([]);

                        if (block.type === "dialogue") {
                                InstructionBlock[counter]!.push(block);
                                counter += 1;
                                continue;
                        }
                        InstructionBlock[counter]!.push(block);
                }

                return InstructionBlock;

        }

        addScene(sceneData: InterpreterActions.IMapActionScene): void {
                const transformedBody = this.transformSceneBodyToBlockBody(sceneData.body);

                if (sceneData.modificators?.includes("start") && !this.CollectionScenes.has(0)) {
                        this.CollectionScenes.set(0, {
                                ...sceneData,
                                body: transformedBody
                        });
                        return;
                }

                this.sceneValueCounter += 1
                this.CollectionScenes.set(this.sceneValueCounter, {
                        ...sceneData,
                        body: transformedBody
                });
        }

        getScene(sceneIdentifier: number): InterpreterActions.IMapActionScene {
                return this.CollectionScenes.get(sceneIdentifier) as InterpreterActions.IMapActionScene
        }
}
        
type TMapKey = number // { position: number, name: string }
interface TMapValue extends Omit<InterpreterActions.IMapActionScene, 'body'> {
        body: parseStruct[]
}

type parseStruct = InterpreterActions.IMapActionScene["body"]

interface IStoryboardManager {
        /**
         * Agrega una escena al storyboard
         * @param {InterpreterActions.IMapActionScene} sceneData Datos de la escena
         */
        addScene(sceneData: InterpreterActions.IMapActionScene): void
        /**
         * Obtiene una escena del storyboard
         * @param {TMapKey} sceneIdentifier Nombre de la escena
         * @returns {parseStruct} Estructura de la escena
         */
        getScene(sceneIdentifier: number): InterpreterActions.IMapActionScene
}