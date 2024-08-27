import {  FormEventHandler, useState } from "react";

interface ItemFormProps {
    item: {
        id?: number;
        todoListId: number;
        description: string;
        dueDate: string;
    };
    onItem: FormEventHandler<HTMLFormElement>;
}


export default function ItemForm(props: ItemFormProps) {
    const item = props.item;
    const [description, setDescription] = useState(item.description);
    const [dueDate, setDueDate] = useState(item.dueDate);
    const [id] = useState(item.id);

    return (
        <form onSubmit={props.onItem}>
            <h3>Item info</h3>
            <p>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description"  name="description" value={description} onChange={(e) => setDescription(e.target.value)}  />
            </p>
            <p>
                <label htmlFor="dueDate">Due: </label>
                <input type="date" id="dueDate"  name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </p>
            <p>
                <input type="hidden" name="id" value={id} />
            </p>
            <p>
                <button type="submit">Accept</button>
            </p>
        </form>
    );
}