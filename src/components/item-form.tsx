import { FormEventHandler } from "react";
import { useState } from "react";

type Item = {
    title: string,
    description: string,
    dueDate: Date
}

export default function ItemForm(props: {
    onItem: FormEventHandler<HTMLFormElement>,
    item?: Item
}) {
    
    const [itemData, setItemData] = useState((props.item ? props.item : {title: "", description: "", dueDate: new Date()}));

    const handleChange = (e: any) => {
        console.log(e.target);
        if (itemData) {
            setItemData({
                ...itemData,
                [e.target.name]: e.target.value,
            });
        }
    }

    return (
        <form onSubmit={props.onItem}>
            <h3>Item info</h3>
            <p>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" value={itemData.title} onChange={(e) => handleChange(e)} />
            </p>
            <p>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" value={itemData.description}  onChange={(e) => handleChange(e)}/>
            </p>
            <p>
                <label htmlFor="dueDate">Due: </label>
                <input type="date" id="dueDate" name="dueDate" />
            </p>
            <p>
                <button type="submit">Accept</button>
            </p>
        </form>

    );
}