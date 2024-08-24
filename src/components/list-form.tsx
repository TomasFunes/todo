import { FormEventHandler, useState } from "react";
import { ListType } from "../types";

export default function ListForm(props: {
    onList: FormEventHandler<HTMLFormElement>,
    list?: ListType
}) {

    const [title, setTitle] = useState(props.list?.title as string);

    const handleChange = (e: any) => {
        setTitle(e.target.value);
    }

    return (
        <form onSubmit={props.onList}>
            <label htmlFor="title">Title: </label>
            <input id="title" name="title" type="text" value={title} onChange={(e) => handleChange(e)}/>
            <input id="id" name="id" type="text" value={props.list?.id} hidden disabled />
            <button type="submit">Done</button>
        </form>
    )
}