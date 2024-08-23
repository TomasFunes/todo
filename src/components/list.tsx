import ListItem from "./list-item";
import Config from "./config";
import { useContext } from "react";
import { useState } from "react";
import { ItemsContext, ItemsDispatchContext } from "../item-context";
import ListForm from "./list-form";
import ItemForm from "./item-form";
import { FormEvent } from "react";
import axios from "axios";


export default function List (props: {
    id: number,
    title: string,
}) {

    const [editMode, setEditMode] = useState(false);
    const [itemCreation, setItemCreation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const items = useContext(ItemsContext);
    const dispatch = useContext(ItemsDispatchContext);


    function handleCreateItem(event: FormEvent<HTMLElement>) {
        event.preventDefault();
        setItemCreation(false);
        const itemForm = event.target as HTMLFormElement;
        const titleInput = (itemForm.elements[0] as HTMLInputElement)
        const descriptionInput = (itemForm.elements[1] as HTMLInputElement)
        const dueDateInput = (itemForm.elements[2] as HTMLInputElement)

        if(dispatch) {
            dispatch({
                type: 'createdItem',
                item: {
                    id: parseInt(crypto.randomUUID()),
                    listId: props.id,
                    title: titleInput.value,
                    description: descriptionInput.value,
                    dueDate: new Date(dueDateInput.value)
                }

            });
        }
    }

    function handleUpdateItem(event: FormEvent<HTMLElement>, itemId: number) {
        event.preventDefault();
        const itemForm = event.target as HTMLFormElement;
        const titleInput = (itemForm.elements[0] as HTMLInputElement)
        const descriptionInput = (itemForm.elements[1] as HTMLInputElement)
        const dueDateInput = (itemForm.elements[2] as HTMLInputElement)

        if(dispatch) {
            dispatch({
                type: 'updatedItem',
                item: {
                    id: itemId,
                    listId: props.id,
                    title: titleInput.value,
                    description: descriptionInput.value,
                    dueDate: new Date(dueDateInput.value)
                }

            });
        }

    }

    function handleDeleteItem(id: number) {
        if(dispatch) {
            dispatch({
                type: 'deletedItem',
                item: {
                    id,
                    listId: props.id,
                    title: "",
                    description: "",
                    dueDate: new Date() 
                }
            });
        }
    }


    async function handleUpdateList(event: any) {
        event.preventDefault();
        const updatedList = {
            title: event.target.title.value
        }
        const listId = event.target.id.value;

        try {
            const response = await axios.put(`http://localhost:8000/api/lists/update/${listId}`, updatedList);
            setEditMode(!editMode)
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    function handleDeleteList(listId: number) {
        // if (dispatchLists) {
        //     dispatchLists({
        //         type: 'deletedList',
        //         list: {
        //             id: listId,
        //             title: ""
        //         }

        //     });
        // }
    }
    
    return (
        <div className="list">
            <Config onEdit={() => setEditMode(!editMode)} onDelete={() => handleDeleteList(props.id)}/>
            { editMode ? 
            <>
            <ListForm list={{id: props.id, title: props.title}} onList={handleUpdateList} />
            <button onClick={() => setEditMode(!editMode)}>Cancel</button>
            </>
            :
            <h2 onClick={() => setIsOpen(!isOpen)}>{props.title}</h2>
            }
            {isOpen && items?.filter(item => item.listId === props.id)
            .map((item) => {
                return (
                <ListItem
                    key={item.id}
                    item={{
                        id: item.id,
                        listId: item.listId,
                        title: item.title,
                        description: item.description,
                        dueDate: item.dueDate
                    }}
                    onUpdate={(e) => handleUpdateItem(e, item.id)}
                    onDelete={() => handleDeleteItem(item.id)}
                />
                );
            })
            }
            {isOpen && (itemCreation ? 
            <>
            <ItemForm onItem={(event) => handleCreateItem(event)} />
            <button onClick={() => setItemCreation(!itemCreation)}>Cancel</button>
            </>
            :
            <button onClick={() => setItemCreation(!itemCreation)}>Add Item</button>
            )}
        </div>
    );

}
