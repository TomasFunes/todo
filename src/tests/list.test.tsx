import { describe, expect, it} from "vitest";
import { render, screen } from '@testing-library/react';
import List from "../components/list";
import { ItemsProvider } from "../item-context";
import user from "@testing-library/user-event";

describe ('list testing', () => {
    it('renders correctly', () => {
        render(<List id={1} title="List title" />, {
            wrapper: ItemsProvider
        })

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title",
        });
        const configBtn = screen.getByRole('button');

        expect(listTitle).toBeInTheDocument();
        expect(configBtn).toBeInTheDocument();
    })
    it('renders list form after clicking the edit button', async () => {
        render(<List id={1} title="List title" />)
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
        render(<List id={1} title="List title" />, {
            wrapper: ItemsProvider
        })
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })        

        expect(addItemBtn).toBeInTheDocument();
    })

    it('renders only list title when heading is clicked two times', async () => {
        render(<List id={1} title="List title" />, {
            wrapper: ItemsProvider
        })
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title",
        });
        await user.click(listTitle)
        await user.click(listTitle)

        const addItemBtn = screen.queryByRole('button', {
            name: /add item/i
        })        

        expect(addItemBtn).not.toBeInTheDocument();
    })

    it('renders item form when click on add item', async () => {
        render(<List id={1} title="List title" />, {
            wrapper: ItemsProvider
        })
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })        
        await user.click(addItemBtn)

        const formTitle = screen.getByRole('heading', {
            name: /item info/i
        })
        const title = screen.getByLabelText(/title/i);
        const description = screen.getByLabelText(/description/i);
        const dueDate = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })

        expect(formTitle).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(dueDate).toBeInTheDocument();
        expect(acceptBtn).toBeInTheDocument();
    })

    it('renders an item when added to the list and not the form', async () => {
        render(<List id={32} title="List title" />, {
            wrapper: ItemsProvider
        })
        user.setup;

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })        
        await user.click(addItemBtn)

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const dueDateInput = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })


        await user.type(titleInput, "item 1");
        await user.type(descriptionInput, "some item");
        await user.type(dueDateInput, "2020-01-30");


        await user.click(acceptBtn);


        const itemTitle = screen.getByText(/item 1/i);
        const itemDescription = screen.getByText(/some item/i);
        const itemDueDate = screen.getByText(/due: 2020-01-30/i);


        expect(itemTitle).toBeInTheDocument();
        expect(itemDescription).toBeInTheDocument();
        expect(itemDueDate).toBeInTheDocument();

        expect(titleInput).not.toBeInTheDocument();
        expect(descriptionInput).not.toBeInTheDocument();
        expect(dueDateInput).not.toBeInTheDocument();
    })

    it('renders nothing when added to the list and deleted', async () => {
        render(<List id={32} title="List title" />, {
            wrapper: ItemsProvider
        })
        user.setup();

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })
        await user.click(addItemBtn)

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const dueDateInput = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })


        await user.type(titleInput, "item 1");
        await user.type(descriptionInput, "some item");
        await user.type(dueDateInput, "2020-01-30");


        await user.click(acceptBtn);


        const itemTitle = screen.getByText(/item 1/i);
        const itemDescription = screen.getByText(/some item/i);
        const itemDueDate = screen.getByText(/due: 2020-01-30/i);


        expect(itemTitle).toBeInTheDocument();
        expect(itemDescription).toBeInTheDocument();
        expect(itemDueDate).toBeInTheDocument();

        const itemConfigBtn = screen.getAllByRole('button')[1];
        await user.click(itemConfigBtn);

        const deleteBtn = screen.getByRole('button', {
            name: /delete/i
        })
        await user.click(deleteBtn);


        expect(itemTitle).not.toBeInTheDocument();
        expect(itemDescription).not.toBeInTheDocument();
        expect(itemDueDate).not.toBeInTheDocument();
    })

    it('renders the updated item', async () => {
        render(<List id={34} title="List title2" />, {
            wrapper: ItemsProvider
        })
        user.setup();

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title2",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })
        await user.click(addItemBtn)

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const dueDateInput = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })


        await user.type(titleInput, "item 1");
        await user.type(descriptionInput, "some item");
        await user.type(dueDateInput, "2020-01-30");


        await user.click(acceptBtn);


        const itemConfigBtn = screen.getAllByRole('button')[1];
        await user.click(itemConfigBtn);


        const editBtn = screen.getByRole('button', {
            name: /edit/i
        })
        await user.click(editBtn);

        const titleInput2 = screen.getByLabelText(/title/i);
        const descriptionInput2 = screen.getByLabelText(/description/i);
        const dueDateInput2 = screen.getByLabelText(/due/i);
        const acceptBtn2 = screen.getByRole('button', {
            name: /accept/i
        })

        await user.type(titleInput2, '{backspace}2');
        await user.type(descriptionInput2, "some item");
        await user.type(dueDateInput2, "2020-01-30");
        await user.click(acceptBtn2);

        const itemTitle = screen.getByText(/item 2/i);
        const itemDescription = screen.getByText(/some itemsome item/i);
        const itemDueDate = screen.getByText(/due: 2020-01-30/i);


        expect(itemTitle).toBeInTheDocument();
        expect(itemDescription).toBeInTheDocument();
        expect(itemDueDate).toBeInTheDocument();

    })
})
