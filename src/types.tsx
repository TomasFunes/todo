export type ListType = {
    id: number,
    title: string,
    done: boolean
}

export type ItemType = {
    id: number,
    todoListId: number,
    description: string,
    dueDate: string
}