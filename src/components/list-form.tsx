import { FormEventHandler, useState } from "react";

interface ListFormProps {
    list: {
        id?: number,
        title: string
    }
    onList: FormEventHandler<HTMLFormElement>
}

export default function ListForm(props: ListFormProps) {

    const list = props.list
    const [id] = useState(list.id)
    const [title, setTitle] = useState(list.title);

    return (
        <form onSubmit={props.onList}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="hidden" id="id" name="id"  value={id} />
            <button type="submit">Done</button>
        </form>
    )
}