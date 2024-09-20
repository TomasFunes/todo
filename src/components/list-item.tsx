import { useState, FormEvent, MouseEventHandler, FormEventHandler, useContext } from "react";
import Config from "./config";
import ItemForm from "./item-form";
import { ItemsDispatchContext } from "../item-context";

interface ListItemProps {
    item: {
        id: number;
        todoListId: number;
        description: string;
        dueDate: string;
        done: boolean;
    };
    onUpdate: FormEventHandler<HTMLFormElement>;
    onDelete: MouseEventHandler<HTMLButtonElement>;
}

export default function ListItem (props: ListItemProps) {

    const item = props.item;
    const [editMode, setEditMode] = useState(false);
    const dispatch = useContext(ItemsDispatchContext);

    async function handleUpdateItem(event: FormEvent<HTMLFormElement>) {
        setEditMode(false);
        props.onUpdate(event);
    }

    function handleCheckItem() {
        dispatch({
            type: 'update',
            payload: {
                id: item.id,
                todoListId: item.todoListId,
                description: item.description,
                dueDate: item.dueDate,
                done: !item.done
            }
        })
    }
    


    return (
        <div className="flex border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={handleCheckItem}>
            {editMode ?
                <>
                <ItemForm item={item} onItem={handleUpdateItem} onCancel={() => setEditMode(!editMode)} />
                </>
                :
                <>
                <div className="flex-1 pl-4 py-2">
                    <p className={`${item.done ? "line-through" : ""} font-bold py-1`}>{item.description}</p>
                    <p className={`text-sm text-gray-500 py-1`}>Due: {item.dueDate.split("T")[0]}</p>
                </div>
                <Config onEdit={() => setEditMode(!editMode)} onDelete={props.onDelete}/>
                </>
                }
        </div>
    );
}