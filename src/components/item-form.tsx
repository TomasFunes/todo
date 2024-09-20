import {  FormEventHandler, useState } from "react";

interface ItemFormProps {
    item: {
        id?: number;
        todoListId: number;
        description: string;
        dueDate: string;
    };
    onItem: FormEventHandler<HTMLFormElement>;
    onCancel: () => void;
}


export default function ItemForm(props: ItemFormProps) {
    const item = props.item;
    const [description, setDescription] = useState(item.description);
    const [dueDate, setDueDate] = useState(item.dueDate);
    const [id] = useState(item.id);

    return (
        <form className="bg-white pt-2 w-full" onSubmit={props.onItem}>
            <p className="flex justify-between px-2 mb-4">
                <label htmlFor="description" className="text-lg font-bold self-center flex-1 px-2">Description</label>
                <input type="text" id="description"  name="description" value={description} onChange={(e) => setDescription(e.target.value)}  className="border-b border-gray-300 p-2 w-full flex-2"/>
            </p>
            <p className="flex justify-between px-2 mb-4">
                <label htmlFor="dueDate" className="text-lg font-bold self-center flex-1 px-2">Due: </label>
                <input type="date" id="dueDate"  name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border-b border-gray-300 p-2 w-full flex-2"/>
            </p>
            <p className="flex justify-between px-2 mb-4">
                <input type="hidden" name="id" value={id} />
            </p>
            <p className="flex justify-between mb-4">
                <button type="submit" className="green-btn flex-1">Done</button>
                <button type="button" className="grey-btn flex-1" onClick={props.onCancel}>Cancel</button>
            </p>
        </form>
    );
}