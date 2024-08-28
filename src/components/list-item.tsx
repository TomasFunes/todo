import { useState, FormEvent, MouseEventHandler, FormEventHandler } from "react";
import Config from "./config";
import ItemForm from "./item-form";
import "../static/list-styles.css"

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
        <div className="list-item">
            {editMode ?
                <>
                <ItemForm item={item} onItem={handleUpdateItem} />
                <button className="cancel-item-btn" onClick={() => setEditMode(!editMode)}>Cancel</button>
                </>
                :
                <>
                <Config onEdit={() => setEditMode(!editMode)} onDelete={props.onDelete} />
                <p>{item.description}</p>
                <p>Due: {item.dueDate.split("T")[0]}</p>
                </>
                }
        </div>
    );
}