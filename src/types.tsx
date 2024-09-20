import { FormEventHandler } from "react"

export type ListType = {
    id: number,
    title: string,
    done: boolean
}

export type ItemType = {
    id: number,
    todoListId: number,
    description: string,
    dueDate: string,
    done: boolean
}

export type ItemsState = {
    items: ItemType[]
}

export type ItemAction = {
    type: string,
    payload: {
        todoListId: number,
        description: string,
        dueDate: string
    }
}

export type ItemInputType = {
    description: string,
    dueDate: string
}

export type ItemFormType = {
    item: ItemInputType,
    onItem: FormEventHandler<HTMLFormElement>
}