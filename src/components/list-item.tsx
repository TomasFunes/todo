import { useState, FormEvent, MouseEventHandler, FormEventHandler } from "react";
import Config from "./config";
import ItemForm from "./item-form";

interface ListItemProps {
    item: {
        id: number;
        todoListId: number;
        description: string;
        dueDate: string;
    };
    onUpdate: FormEventHandler<HTMLFormElement>;
    onDelete: MouseEventHandler<HTMLButtonElement>;
}

export default function ListItem (props: ListItemProps) {

    const item = props.item;
    const [editMode, setEditMode] = useState(false);


    async function handleUpdateItem(event: FormEvent<HTMLFormElement>) {
        setEditMode(false);
        props.onUpdate(event);
    }
    


    return (
        <>
            <Config onEdit={() => setEditMode(!editMode)} onDelete={props.onDelete} />
            {editMode ?
                <>
                <ItemForm item={item} onItem={handleUpdateItem} />
                <button onClick={() => setEditMode(!editMode)}>Cancel</button>
                </>
                :
                <div className="list-item">
                    <p>{item.description}</p>
                    <p>Due: {item.dueDate.split("T")[0]}</p>
                </div>
            }
        </>
    );
}