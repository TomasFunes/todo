import { MouseEventHandler } from "react";

export default function Config (props: {
    onEdit: MouseEventHandler<HTMLButtonElement>,
    onDelete: MouseEventHandler<HTMLButtonElement> 
}) {

    return (
        <div className="flex">
            <button className="text-sm text-gray-500 hover:bg-yellow-100 px-2 py-1" onClick={props.onEdit}>Edit</button>
            <button className="text-sm text-red-500 hover:bg-red-100 px-2 py-1" onClick={props.onDelete}>Delete</button>
        </div>  
    )
}