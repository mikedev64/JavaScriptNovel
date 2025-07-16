import ErrorHandler from "../error";

export default class CoreInterpreter extends ErrorHandler implements ICoreInterpreter {
        constructor() {
                super(CoreInterpreter.name);
        }

        
}

interface ICoreInterpreter {
        /**
         * 
         */

}