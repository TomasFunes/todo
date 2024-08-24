import { FormEventHandler } from "react";
import { useState } from "react";
import { ItemType } from "../types";

export default function ItemForm(props: {
    onItem: FormEventHandler<HTMLFormElement>,
    item?: ItemType
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