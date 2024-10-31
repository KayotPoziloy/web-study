import { EventEmitter } from './emitter'
import { swapElements } from "./utils";

class Store extends EventEmitter {
    constructor(initState, rootReducer) {
        super();

        this.rootReducer = rootReducer
        this.state = initState
    }
    subscribers = []

    handleAction(action) {
        this.state = this.rootReducer(this.state, action)
        this.dispatchEvent()
    }
}

export function combineReducers(stateDefinition) {
    return function (prevState, action) {
        const newState= {};

        Object.keys(stateDefinition).forEach((key) => {
            const reducerForKey = stateDefinition[key]
            const prevStateForKey = prevState[key]
            newState[key] = reducerForKey(prevStateForKey, action);
        })

        return newState;
    }
}

export function createStore(initState, rootReducer) {
    return new Store(initState, rootReducer)
}