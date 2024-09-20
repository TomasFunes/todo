import { useState, useContext, FormEvent } from "react";
import List from "./list";
import ListForm from "./list-form";
import { ListsContext, ListsDispatchContext } from "../list-context";



export default function ListContainer() {
    const [listCreation, setListCreation] = useState(false);
    const [activeList, setActiveList] = useState(0);

    const lists = useContext(ListsContext);
    const dispatch = useContext(ListsDispatchContext);



    async function handleCreateList(event: any) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        dispatch({
            type: 'create',
            payload: {
                id: Math.floor(Math.random() * (100000000 - 1) + 1),
                title: String(formData.get("title")),
                done: false
            }
        })

        setListCreation(false);
    }


    async function handleUpdateList(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();


        const formData = new FormData(event.currentTarget);
        const listInput = {
            id: Number(formData.get("id")),
            title: String(formData.get("title")),
            done: Boolean(formData.get("done"))
        }

        dispatch({
            type: 'update',
            payload: listInput
        })
    }

    function handleSelectList(listId: number) {
        if (activeList === listId) {
            setActiveList(0);
        } else {
            setActiveList(listId);
        }
    }
    
    async function handleDeleteList(listId: number) {
        dispatch({
            type: 'delete',
            payload: {
                id: listId,
                title: "",
                done: false
            }
        })
    }

    return (
        <div className="m-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {lists?.map(list => {
                return <List
                    key={list.id}
                    list={{
                        id: list.id,
                        title: list.title,
                        done: list.done
                    }}
                    isOpen={activeList === list.id}
                    onUpdate={handleUpdateList}
                    onDelete={() => handleDeleteList(list.id)}
                    onSelect={() => handleSelectList(list.id)}
                />
            })}
            {listCreation ?
                <>
                    <ListForm list={{title: ""}} onList={handleCreateList} onCancel={() => setListCreation(!listCreation)} />
                </>
                :
                <div className=" ">
                    <button className="green-btn w-full" onClick={() => setListCreation(!listCreation)}>Add List +</button>
                </div>
            }
        </div>

    );
}