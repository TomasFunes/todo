import { createContext, useState, useEffect } from "react";

type List = {
    _id: number,
    title: string
}

// type ListsAction = {
//     type: string,
//     list: List
// }


// function listsReducer(lists: List[], action: ListsAction) {
//     switch (action.type) {
//         case 'createdList': {
//             return [...lists, action.list];
//         }
//         case 'updatedList': {

//             return lists.map(list => {
//                 if(list.id === action.list.id) {
//                     return {
//                         ...list,
//                         title: action.list.title
//                     }
//                 }
//                 return list;
//             });
//         }
//         case 'deletedList': {
//             return lists.filter(list => list.id !== action.list.id);
//         }
//         default: {
//             throw Error('Unkwon action: ' + action.type);
//         }
//     }
// }



export const ListsContext = createContext<List[] | null>(null);
// export const ListsDispatchContext = createContext<Dispatch<ListsAction> | null>(null);


export const ListsProvider = ({children}: { children: React.ReactNode }) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/lists');
                const jsonData = await response.json();
                setLists(jsonData);
                
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        fetchData();
    }, []);


    // const [lists, dispatchLists] = useReducer(listsReducer, initialLists);
    

    return(
        <ListsContext.Provider value={lists}>
            {/* <ListsDispatchContext.Provider value={dispatchLists}> */}
                {children}    
            {/* </ListsDispatchContext.Provider> */}
        </ListsContext.Provider>
    );
}