import { createContext, Dispatch } from "react";
import { useReducer } from "react";

type Item = {
    id: number,
    listId: number,
    title: string,
    description: string,
    dueDate: Date
}

type ItemsAction = {
    type: string,
    item: Item
}

const initialItems = [
    {
        id: 1,
        listId: 1,
        title: "Item 1",
        description: "A new Item",
        dueDate: new Date("06-02-2024")
    },
    {
        id: 2,
        listId: 1,
        title: "Item 2",
        description: "Another Item",
        dueDate: new Date("08-12-2024")
    }
]


function itemsReducer(items: Item[], action: ItemsAction) {
    switch (action.type) {
        case 'createdItem': {
            return [...items, action.item];
        }
        case 'updatedItem': {
            return items.map(item => {
                if (item.id === action.item.id) {
                    return {
                        ...item,
                        title: action.item.title,
                        description: action.item.description,
                        dueDate: new Date(action.item.dueDate)
                    }
                }
                return item;
            });
        }
        case 'deletedItem': {
            return items.filter(item => item.id !== action.item.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export const ItemsContext = createContext<Item[] | null>(null);
export const ItemsDispatchContext = createContext<Dispatch<ItemsAction> | null>(null);


export const ItemsProvider = ({children}: { children: React.ReactNode }) => {
    const [items, dispatchItems] = useReducer(itemsReducer, initialItems);
    
    return(
        <ItemsContext.Provider value={items}>
            <ItemsDispatchContext.Provider value={dispatchItems}>
                {children}    
            </ItemsDispatchContext.Provider>
        </ItemsContext.Provider>
    );
}
