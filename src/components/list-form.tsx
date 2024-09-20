import { FormEventHandler, useState } from "react";

interface ListFormProps {
    list: {
        id?: number,
        title: string
    }
    onList: FormEventHandler<HTMLFormElement>
    onCancel: () => void
}

export default function ListForm(props: ListFormProps) {

    const list = props.list
    const [id] = useState(list.id)
    const [title, setTitle] = useState(list.title);

    return (
        <form className="bg-white pt-2 w-full" onSubmit={props.onList}>
            <p className="flex justify-between px-2 mb-4">
                <label htmlFor="title" className="text-lg font-bold self-center flex-1 px-2">Title</label>
                <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-b border-gray-300 p-2 w-full flex-2"/>
            </p>
            <input type="hidden" id="id" name="id"  value={id} />
            <p className="flex justify-between">   
                <button type="submit" className="green-btn flex-1">Done</button>
                <button type="button" className="grey-btn flex-1" onClick={props.onCancel}>Cancel</button>
            </p>
        </form>
    )
}