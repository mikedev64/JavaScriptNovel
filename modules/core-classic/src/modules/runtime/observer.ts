export default class CoreObserver implements ICoreObserver {
        private observers: { [event: string]: Function[] } = {};

        constructor() {}

        observe(event: string, callback: Function): void {
                if (!this.observers[event]) {
                        this.observers[event] = [];
                }
                this.observers[event].push(callback);
        }

        unobserve(event: string, callback: Function): void {
                if (!this.observers[event]) return;
                this.observers[event] = this.observers[event].filter(cb => cb !== callback);
        }

        notify(event: string, data: any): void {
                if (!this.observers[event]) return;
                this.observers[event].forEach(callback => callback(data));
        }
}

interface ICoreObserver {
        observe(event: string, callback: Function): void;
        unobserve(event: string, callback: Function): void;
        notify(event: string, data: any): void;
}