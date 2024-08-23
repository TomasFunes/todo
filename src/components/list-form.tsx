import { FormEventHandler, useState } from "react";

type List = {
    id: number,
    title: string
}



export default function ListForm(props: {
    onList: FormEventHandler<HTMLFormElement>,
    list?: List
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