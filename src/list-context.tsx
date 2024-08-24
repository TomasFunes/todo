import axios from "axios";
import { createContext, useState, useEffect } from "react";
import {ListType} from "./types";

const BASE_URL = "http://localhost:8080";

export const ListsContext = createContext<ListType[] | null>(null);


export const ListsProvider = ({children}: { children: React.ReactNode }) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetchLists();
    }, []);


    async function fetchLists() {
        try {
            const response = await axios.get(`${BASE_URL}/todolists`);
            const lists = response.data;

            setLists(lists);
            
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }


    return(
        <ListsContext.Provider value={lists}>
                {children}    
        </ListsContext.Provider>
    );
}