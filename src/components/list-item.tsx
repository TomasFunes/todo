import { MouseEventHandler, FormEventHandler, useState } from "react";
import Config from "./config";
import ItemForm from "./item-form";
import { ItemType } from "../types";

export default function ListItem ({item, onUpdate, onDelete }: {item: ItemType, onUpdate: FormEventHandler<HTMLFormElement>, onDelete: MouseEventHandler<HTMLButtonElement>}) {

    const [editMode, setEditMode] = useState(false);

    return (
        <>
            <Config onEdit={() => setEditMode(!editMode)} onDelete={onDelete} />
            {editMode ?
                <>
                <ItemForm item={item} onItem={(e) => {
                    setEditMode(false);
                    onUpdate(e)}}
                />
                <button onClick={() => setEditMode(!editMode)}>Cancel</button>
                </>
                :
                <div className="list-item">
                    <p>{item.description}</p>
                    <p>Due: {item.dueDate.split("T")[0] + " " + item.dueDate.split("T")[1].slice(0, -1)}</p>
                </div>
            }
        </>
    );
}