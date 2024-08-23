import { useEffect, useState, useRef } from "react";
import { MouseEventHandler, MouseEvent } from "react";

export default function Config (props: {
    onEdit: MouseEventHandler<HTMLButtonElement>,
    onDelete: MouseEventHandler<HTMLButtonElement> 
}) {
    const [isActive, setIsActive] = useState(false); 
    let divRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: any) => {
        if(divRef.current && !divRef.current.contains(event.target)) {
            setIsActive(false);
        }
    }

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        setIsActive(!isActive);
        event.stopPropagation();
    }


    useEffect(() => {
        document.addEventListener('click', (event) => handleOutsideClick(event));
    }, [])

    
    return (
        <>
        <button onClick={(event) => handleButtonClick(event)} className="config-btn">
            <img src="/settings-icon.png" 
                width={32}
                height={32} 
                alt="A settings icon"
                />
        </button>
        { isActive && 
        <div className="config-options" ref={divRef}>
            <button onClick={props.onEdit}>Edit</button>
            <button onClick={props.onDelete}>Delete</button>
        </div>  
        }
        </>
    )
}