import { useState, useEffect, useContext, FormEvent } from "react";
import List from "./list";
import ListForm from "./list-form";
import axios from "axios";
import { ListFetchContext, ListsContext } from "../list-context";

const BASE_URL = "http://localhost:8080";


export default function ListContainer() {
    const [listCreation, setListCreation] = useState(false);
    const [listChanges, setListChanges] = useState(0);

    const lists = useContext(ListsContext);
    const fetchLists = useContext(ListFetchContext);

    useEffect(() => {
        fetchLists();
    }, [listChanges]);


    async function handleCreateList(event: any) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const listInput = {
            title: formData.get("title")
        }
        try{
            await axios.post(`${BASE_URL}/todolists`, listInput);
        } catch (error) {
            console.error('Error posting data', error);
        }

        setListChanges(listChanges + 1);
        setListCreation(false);
    }


    async function handleUpdateList(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const id = formData.get("id");

        const listInput = {
            title: formData.get("title")
        }

        try {
            await axios.put(`${BASE_URL}/todolists/${id}`, listInput);
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        setListChanges(listChanges + 1);
    }
    
    
    async function handleDeleteList(listId: number) {
        await axios.delete(`${BASE_URL}/todolists/${listId}`);
        setListChanges(listChanges + 1);
    }

    return (
        <div className="list-container">
            {lists?.map(list => {
                return <List
                    key={list.id}
                    list={{
                        id: list.id,
                        title: list.title,
                        done: list.done
                    }}
                    onUpdate={handleUpdateList}
                    onDelete={() => handleDeleteList(list.id)}
                />
            })}
            {listCreation ?
                <>
                    <ListForm list={{title: ""}} onList={handleCreateList} />
                    <button onClick={() => setListCreation(!listCreation)}>Cancel</button>
                </>
                :
                <button onClick={() => setListCreation(!listCreation)}>Add list</button>
            }
        </div>

    );
}