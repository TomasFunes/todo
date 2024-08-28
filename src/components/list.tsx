import axios from "axios";
import { useContext, useState, useEffect, FormEvent, FormEventHandler, MouseEventHandler } from "react";
import { ItemsContext, ItemsFetchContext } from "../item-context";
import ListItem from "./list-item";
import ListForm from "./list-form";
import ItemForm from "./item-form";
import Config from "./config";
import { urlContext } from "../url-context";


interface ListProps {
    list: {
        id: number;
        title: string;
        done: boolean;
    }
    onUpdate: FormEventHandler<HTMLFormElement>
    onDelete: MouseEventHandler<HTMLButtonElement>
}


export default function List (props: ListProps) {
    const BASE_URL = useContext(urlContext);

    const list = props.list;
    
    const [editMode, setEditMode] = useState(false);
    const [itemCreation, setItemCreation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [itemChanges, setItemChanges] = useState(0);
    
    const items = useContext(ItemsContext);
    const fetchItems = useContext(ItemsFetchContext);

    useEffect(() => {
        fetchItems();
    }, [itemChanges]);    
    
    async function handleUpdateList(event: any) {
        setEditMode(false)
        props.onUpdate(event);
    }
    

    async function handleCreateItem(event: FormEvent<HTMLElement>) {
        event.preventDefault();
        const itemForm = event.target as HTMLFormElement;
        const description = (itemForm.elements[0] as HTMLInputElement).value;
        const dueDate = (itemForm.elements[1] as HTMLInputElement).value;

        const item = {
            todoListId: list.id,
            description,
            dueDate
        }

        try {
            await axios.post(`${BASE_URL}/todoitems`, item)
  
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        setItemChanges(itemChanges + 1);
        setItemCreation(false);
    }


    async function handleUpdateItem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const inputItem = {
            id: formData.get("id"),
            todoListId: list.id,
            description: formData.get("description"),
            dueDate: formData.get("dueDate")
        }

        try {
            await axios.put(`${BASE_URL}/todoitems/${inputItem.id}`, inputItem);
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        setItemChanges(itemChanges + 1);
        setEditMode(false);

    }

    
    async function handleDeleteItem(id: number) {
        try {
            await axios.delete(`${BASE_URL}/todoitems/${id}`);            
        } catch (err) {
            console.log(`Error: ${err}` )
        }
        
        setItemChanges(itemChanges + 1);
    }
    
    return (
        <div className="list">
            <div className="list-header">
            { editMode ? 
                <>
                <button className="cancel-btn" onClick={() => setEditMode(!editMode)}>X</button>
                <ListForm list={list} onList={handleUpdateList} />
                </>
                :
                <>
                <h2 onClick={() => setIsOpen(!isOpen)}>{list.title}</h2>
                <Config onEdit={() => setEditMode(!editMode)} onDelete={props.onDelete}/>
                </>
            }
            </div>
            {isOpen && items?.filter(item => item.todoListId === list.id)
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
                    onDelete={() => handleDeleteItem(item.id)}
                    onUpdate={handleUpdateItem}
                />
                );
            })
            }
            {isOpen && (itemCreation ? 
            <>
            <ItemForm item={{todoListId: list.id, description: "", dueDate: ""}} onItem={handleCreateItem} />
            <button className="cancel-item-btn" onClick={() => setItemCreation(!itemCreation)}>Cancel</button>
            </>
            :
            <button className="add-item-btn" onClick={() => setItemCreation(!itemCreation)}>Add Item</button>
            )}
        </div>
    );

}