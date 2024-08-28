import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {ListType} from "./types";
import { urlContext } from "./url-context";


export const ListsContext = createContext([] as ListType[]);
export const ListFetchContext = createContext(() => {});


export const ListsProvider = ({children}: { children: React.ReactNode }) => {
    const BASE_URL = useContext(urlContext);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/todolists`);
            const lists = response.data;

            setLists(lists);
            
        } catch (error) {
            console.error('Error fetching data112', error);
        }
    }


    return(
        <ListsContext.Provider value={lists}>
            <ListFetchContext.Provider value={fetchLists}>
                {children}    
            </ListFetchContext.Provider>
        </ListsContext.Provider>
    );
}