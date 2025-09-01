import SavesManager from "../saves";

export default class CoreRuntime implements ICoreRuntime {
        private static RUNTIME_INSTANCE: CoreRuntime | null = null;
        private isRunningFlag: boolean = false;

        constructor() {
                if (!CoreRuntime.RUNTIME_INSTANCE) CoreRuntime.RUNTIME_INSTANCE = this;
                return CoreRuntime.RUNTIME_INSTANCE;
        }

        async start(): Promise<void> {
                this.isRunningFlag = true;
                console.log("Runtime started");
                await SavesManager.initializeSaves();
        }
        stop(): void {
                this.isRunningFlag = false;
                console.log("Runtime stopped");
        }
        restart(): void {
                this.stop();
                this.start();
        }
        isRunning(): boolean {
                return this.isRunningFlag;
        }
}

interface ICoreRuntime {
        start(): Promise<void>;
        stop(): void;
        restart(): void;
        isRunning(): boolean;
}