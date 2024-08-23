import { MouseEventHandler, FormEventHandler, useState } from "react";
import Config from "./config";
import ItemForm from "./item-form";

type Item = {
    id: number,
    listId: number,
    title: string,
    description: string,
    dueDate: Date
}

export default function ListItem ({item, onUpdate, onDelete }: {item: Item, onUpdate: FormEventHandler<HTMLFormElement>, onDelete: MouseEventHandler<HTMLButtonElement>}) {

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
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Due: {item.dueDate.toISOString().split("T")[0]}</p>
                </div>
            }
        </>
    );
}