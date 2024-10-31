import React, {useContext, useEffect, useState} from "react";


export const StoreContext = React.createContext( {} );

export function useSelector(selector, deps=[]) {
    const myStore = useContext(StoreContext);
    const [state, setState] = useState(selector(myStore.state, ...deps));
    useEffect(() => {
        const unsubscribe = myStore.subscribe(() => {
            setState(selector(myStore.state, ...deps));
        });

        return () => {
            unsubscribe()
        }
    }, deps);
    return state;
}

export function useDispatch() {
    const myStore = useContext(StoreContext);
    return (action) => {
        myStore.handleAction(action)
    }
}

export default StoreContext