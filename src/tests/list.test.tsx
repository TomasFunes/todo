import { describe, expect, it} from "vitest";
import { render, screen } from '@testing-library/react';
import List from "../components/list";
import { ItemsProvider } from "../item-context";
import user, { userEvent } from "@testing-library/user-event";


describe ('list testing', () => {
    it('renders correctly', () => {
        render(<List list={{id: 1, title: "List title1", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title1",
        });
        const configBtn = screen.getByRole('button');

        expect(listTitle).toBeInTheDocument();
        expect(configBtn).toBeInTheDocument();
    })
    it('renders list form after clicking the edit button', async () => {
        render(<List list={{id: 2, title: "List title2", done: false}} onUpdate={() => {}} onDelete={() => {}}/>)
        user.setup;

        const configBtn = screen.getByRole('button');
        
        await user.click(configBtn);

        const editBtn = screen.getByRole('button', {
            name: /edit/i,
        })

        await user.click(editBtn);

        const titleInput = screen.getByLabelText(/title/i);
        const doneBtn = screen.getByRole('button', {
            name: /done/i,
        })

        expect(titleInput).toBeInTheDocument();
        expect(doneBtn).toBeInTheDocument();


    })

    it('renders only add item button when a list with 0 items is clicked', async () => {
        render(<List list={{id: 3, title: "List title3", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title3",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })        

        expect(addItemBtn).toBeInTheDocument();
    })

    it('renders only list title when heading is clicked two times', async () => {
        render(<List list={{id: 4, title: "List title4", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title4",
        });
        await user.click(listTitle)
        await user.click(listTitle)

        const addItemBtn = screen.queryByRole('button', {
            name: /add item/i
        })        

        expect(addItemBtn).not.toBeInTheDocument();
    })

    it('renders item form when click on add item', async () => {
        render(<List list={{id: 5, title: "List title5", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title5",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })        
        await user.click(addItemBtn)

        const formTitle = screen.getByRole('heading', {
            name: /item info/i
        })
        const description = screen.getByLabelText(/description/i);
        const dueDate = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })

        expect(formTitle).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(dueDate).toBeInTheDocument();
        expect(acceptBtn).toBeInTheDocument();
    })

    it('renders an item when added to the list and not the form', async () => {
        render(<List list={{id: 6, title: "List title6", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })
        
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title6",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })        
        await user.click(addItemBtn)

        const descriptionInput = screen.getByLabelText(/description/i);
        const dueDateInput = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getAllByRole('button')[1];

        await user.type(descriptionInput, "some item");
        await user.type(dueDateInput, "2024-08-26");


        await user.click(acceptBtn);

        
        const itemDescription = screen.getByText(/some item/i);
        const itemDueDate = screen.getByText(/due: 2024-08-26/i);


        expect(itemDescription).toBeInTheDocument();
        expect(itemDueDate).toBeInTheDocument();

        expect(descriptionInput).not.toBeInTheDocument();
        expect(dueDateInput).not.toBeInTheDocument();
    })

    it('renders nothing when added to the list and deleted', async () => {
        render(<List list={{id: 7, title: "List title7", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })
        user.setup();

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title7",
        });
        await user.click(listTitle)
        
        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })
        await user.click(addItemBtn)
        
        const descriptionInput = screen.getByLabelText(/description/i);
        const dueDateInput = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })
        

        await user.type(descriptionInput, "some item");
        await user.type(dueDateInput, "2024-08-26");


        await user.click(acceptBtn);


        const itemDescription = screen.getByText(/some item/i);
        const itemDueDate = screen.getByText(/due: 2024-08-26/i);


        expect(itemDescription).toBeInTheDocument();
        expect(itemDueDate).toBeInTheDocument();

        const itemConfigBtn = screen.getAllByRole('button')[1];
        await user.click(itemConfigBtn);

        
        const deleteBtn = screen.getByRole('button', {
            name: /delete/i
        });
        await user.click(deleteBtn);
        

        expect(itemDescription).not.toBeInTheDocument();
        expect(itemDueDate).not.toBeInTheDocument();
    })

    
    
    it('renders the updated item', async () => {
        render(<List list={{id: 8, title: "List title8", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })
        
        const user = userEvent.setup();

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title8",
        });
        await user.click(listTitle)


        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })
        await user.click(addItemBtn)
        
        const descriptionInput = screen.getByLabelText(/Description:/i);
        const dueDateInput = screen.getByLabelText(/Due:/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })
        
        
        await user.type(descriptionInput, "some item");
        await user.type(dueDateInput, "2024-08-26");
        

        await user.click(acceptBtn);
        
        
        const itemConfigBtn = screen.getAllByRole('button')[1];
        await user.click(itemConfigBtn);
        
        
        const editBtn = screen.getByRole('button', {
            name: /edit/i
        })
        await user.click(editBtn);
        
        const descriptionInput2 = screen.getByLabelText(/description:/i);
        const dueDateInput2 = screen.getByLabelText(/due:/i);
        const acceptBtn2 = screen.getByRole('button', {
            name: /accept/i
        })
        
        await user.type(descriptionInput2, "2");
        await user.clear(dueDateInput2);
        await user.type(dueDateInput2, "2024-08-27");
        await user.click(acceptBtn2);
        
        
        const itemDescription = screen.getByText(/some item2/i);
        const itemDueDate = screen.getByText(/due: 2024-08-27/i);


        expect(itemDescription).toBeInTheDocument();
        expect(itemDueDate).toBeInTheDocument();

    })
})
