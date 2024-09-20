import { createContext, Dispatch, useContext, useReducer } from "react";
import {ListType} from "./types";

interface ActionType {
    type: string;
    payload: ListType;
}

function saveLists(lists: ListType[]) {
    localStorage.setItem("lists", JSON.stringify(lists));
}

function loadLists() {
    const savedLists = localStorage.getItem("lists");
    return savedLists ? JSON.parse(savedLists) : [];
} 

export function listsReducer(lists: ListType[], action: ActionType) {
    const payloadList = action.payload;
    switch (action.type) {
        case 'create':
            saveLists([...lists, payloadList]);
            return loadLists();
        case 'update':
            saveLists(lists.map(list => {
                if(list.id === payloadList.id) {
                    return payloadList;
                }
                return list;
            }));
            return loadLists();
        case 'delete':
            saveLists(lists.filter(list => list.id !== payloadList.id));
            return loadLists();
        default:
            return loadLists();
    }
}

export const ListsContext = createContext([] as ListType[]);
export const ListsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

export const useLists = () => useContext(ListsContext);
export const useListsDispatch = () => useContext(ListsDispatchContext);

export const ListsProvider = ({children}: { children: React.ReactNode }) => {
    const [lists, dispatch] = useReducer(listsReducer, loadLists());

    return(
        <ListsContext.Provider value={lists}>
            <ListsDispatchContext.Provider value={dispatch}>
                {children}    
            </ListsDispatchContext.Provider>
        </ListsContext.Provider>
    );
}