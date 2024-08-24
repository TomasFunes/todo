import ListItem from "./list-item";
import Config from "./config";
import { useContext, useState, FormEvent } from "react";
import { ItemsContext } from "../item-context";
import ListForm from "./list-form";
import ItemForm from "./item-form";
import { ListType } from "../types";
import axios from "axios";


const BASE_URL = "http://localhost:8080";

export default function List (props: ListType) {

    const [editMode, setEditMode] = useState(false);
    const [itemCreation, setItemCreation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const items = useContext(ItemsContext);


    async function handleCreateItem(event: FormEvent<HTMLElement>) {
        event.preventDefault();
        const itemForm = event.target as HTMLFormElement;
        const description = (itemForm.elements[0] as HTMLInputElement).value;
        const dueDate = (itemForm.elements[1] as HTMLInputElement).value;

        const item = {
            todoListId: props.id,
            description: description,
            dueDate: new Date(dueDate).toISOString()
        }

        try {
            await axios.post(`${BASE_URL}/todoitems`, item)
            setItemCreation(false);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }


    async function handleUpdateItem(event: FormEvent<HTMLElement>, itemId: number) {
        event.preventDefault();
        const itemForm = event.target as HTMLFormElement;
        const descriptionInput = (itemForm.elements[0] as HTMLInputElement)
        const dueDateInput = (itemForm.elements[1] as HTMLInputElement)

        const item = {
            id: itemId,
            listId: props.id,
            description: descriptionInput.value,
            dueDate: new Date(dueDateInput.value).toISOString()
        }

        try {
            await axios.put(`${BASE_URL}/todoitems/${itemId}`, item);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }


    async function handleDeleteItem(id: number) {
        await axios.delete(`${BASE_URL}/todoitems/${id}`);
    }


    async function handleUpdateList(event: any) {
        event.preventDefault();
        const updatedList = {
            title: event.target.title.value
        }
        const listId = event.target.id.value;

        try {
            await axios.put(`${BASE_URL}/todolists/${listId}`, updatedList);
            setEditMode(!editMode)
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }


    async function handleDeleteList(listId: number) {
        await axios.delete(`${BASE_URL}/todolists/${listId}`);
    }

    
    return (
        <div className="list">
            <Config onEdit={() => setEditMode(!editMode)} onDelete={() => handleDeleteList(props.id)}/>
            { editMode ? 
            <>
            <ListForm list={{id: props.id, title: props.title, done: props.done}} onList={handleUpdateList} />
            <button onClick={() => setEditMode(!editMode)}>Cancel</button>
            </>
            :
            <h2 onClick={() => setIsOpen(!isOpen)}>{props.title}</h2>
            }
            {isOpen && items?.filter(item => item.todoListId === props.id)
            .map((item) => {
                return (
                <ListItem
                    key={item.id}
                    item={{
                        id: item.id,
                        todoListId: item.todoListId,
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
