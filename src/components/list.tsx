import { useContext, useState, FormEvent, FormEventHandler, MouseEventHandler } from "react";
import { ItemsContext, ItemsDispatchContext } from "../item-context";
import ListItem from "./list-item";
import ListForm from "./list-form";
import ItemForm from "./item-form";
import Config from "./config";


interface ListProps {
    list: {
        id: number;
        title: string;
        done: boolean;
    }
    onUpdate: FormEventHandler<HTMLFormElement>
    onDelete: MouseEventHandler<HTMLButtonElement>
    onSelect: MouseEventHandler<HTMLHeadingElement>
    isOpen: boolean
}


export default function List (props: ListProps) {

    const list = props.list;
    
    const [editMode, setEditMode] = useState(false);
    const [itemCreation, setItemCreation] = useState(false);
    
    const items = useContext(ItemsContext);
    const dispatch = useContext(ItemsDispatchContext);

    
    async function handleUpdateList(event: any) {
        setEditMode(false)
        props.onUpdate(event);
    }
    

    async function handleCreateItem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const description = formData.get("description") as string;
        const dueDate = formData.get("dueDate") as string;

        const item = {
            id: Math.floor(Math.random() * (100000000 - 1) + 1),
            todoListId: list.id,
            description,
            dueDate,
            done: false
        }

        dispatch({
            type: 'create',
            payload: item
        })
  
        setItemCreation(false);
    }


    async function handleUpdateItem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const inputItem = {
            id: Number(formData.get("id")),
            todoListId: list.id,
            description: formData.get("description") as string,
            dueDate: formData.get("dueDate") as string,
            done: false
        }

        dispatch({
            type: 'update',
            payload: inputItem
        });

        setEditMode(false);
    }

    
    async function handleDeleteItem(id: number) {
        dispatch({
            type: 'delete',
            payload: {
                id: id,
                todoListId: list.id,
                description: "",
                dueDate: "",
                done: false
            }
        });
    }
    
    return (
        <div className="bg-white my-4 ">
            <div className="flex justify-between rounded-md shadow-md cursor-pointer">
            { editMode ? 
                <>
                <ListForm list={list} onList={handleUpdateList} onCancel={() => setEditMode(!editMode)} />
                </>
                :
                <>
                <h2 className="text-lg font-bold flex-1 py-2 px-4 select-none" onClick={props.onSelect}>{list.title}</h2>
                <Config onEdit={() => setEditMode(!editMode)} onDelete={props.onDelete}/>
                </>
            }
            </div>
            {props.isOpen && items?.filter(item => item.todoListId === list.id)
            .map((item) => {
                return (
                <ListItem
                    key={item.id}
                    item={{
                        id: item.id,
                        todoListId: item.todoListId,
                        description: item.description,
                        dueDate: item.dueDate,
                        done: item.done
                    }}
                    onDelete={() => handleDeleteItem(item.id)}
                    onUpdate={handleUpdateItem}
                />
                );
            })
            }
            {props.isOpen && (itemCreation ? 
            <>
            <ItemForm item={{todoListId: list.id, description: "", dueDate: ""}} onItem={handleCreateItem} onCancel={() => setItemCreation(!itemCreation)} />
            </>
            :
            <button className="green-btn w-full" onClick={() => setItemCreation(!itemCreation)}>Add Item +</button>
            )}
        </div>
    );

}