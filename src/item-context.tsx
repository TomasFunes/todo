import { createContext, Dispatch, useContext, useReducer } from "react";
import { ItemType } from "./types";

interface ActionType {
    type: string;
    payload: ItemType;
}

function saveItems(items: ItemType[]) {
    localStorage.setItem("items", JSON.stringify(items));
}

function loadItems() {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
} 

export function itemsReducer(items: ItemType[], action: ActionType) {
    const payloadItem = action.payload;
    switch (action.type) {
        case 'create':
            saveItems([...items, payloadItem]);
            return loadItems();
        case 'update':
            saveItems(items.map(item => {
                if(item.id === payloadItem.id) {
                    return payloadItem;
                }
                return item;
            }));
            return loadItems();
        case 'delete':
            saveItems(items.filter(item => item.id !== payloadItem.id));
            return loadItems();
        default:
            return loadItems();
    }
}


export const ItemsContext = createContext([] as ItemType[]);
export const ItemsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

export const useItems = () => useContext(ItemsContext);
export const useItemsDispatch = () => useContext(ItemsDispatchContext);



export const ItemsProvider = ({children}: { children: React.ReactNode }) => {
    const [items, dispatch] = useReducer(itemsReducer, loadItems());
    
    return(
        <ItemsContext.Provider value={items}>
            <ItemsDispatchContext.Provider value={dispatch}>
                {children}    
            </ItemsDispatchContext.Provider>
        </ItemsContext.Provider>
    );
}
