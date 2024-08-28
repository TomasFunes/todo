import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ItemType } from "./types";
import { urlContext } from "./url-context";





export const ItemsContext = createContext([] as ItemType[]);
export const ItemsFetchContext = createContext(() => {});


export const ItemsProvider = ({children}: { children: React.ReactNode }) => {
    const BASE_URL = useContext(urlContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);


    const fetchItems = async () =>  {
        try {
            const response = await axios.get(`${BASE_URL}/todoitems`);
            const items = response.data;

            setItems(items);
            
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
    
    return(
        <ItemsContext.Provider value={items}>
            <ItemsFetchContext.Provider value={fetchItems}>
                {children}    
            </ItemsFetchContext.Provider>
        </ItemsContext.Provider>
    );
}
