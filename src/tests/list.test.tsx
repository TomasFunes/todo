import { describe, expect, it} from "vitest";
import { render, screen } from '@testing-library/react';
import List from "../components/list";
import { ItemsProvider } from "../item-context";
import userEvent  from "@testing-library/user-event";

describe ('list testing', () => {
    it('renders correctly', () => {
        render(<List list={{id: 1, title: "List title1", done: false}} onUpdate={() => {}} onDelete={() => {}}/>, {
            wrapper: ItemsProvider
        })

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title1",
        });

        expect(listTitle).toBeInTheDocument();
    })

    it('renders list form after clicking the edit button', async () => {
        render(<List list={{id: 2, title: "List title2", done: false}} onUpdate={() => {}} onDelete={() => {}}/>)
        const user = userEvent.setup();

        const editBtn = screen.getByRole('button', {
            name: /edit/i,
        })

        await user.click(editBtn);

        const titleInput = screen.getByRole("textbox");
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
        const user = userEvent.setup();

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
        const user = userEvent.setup();

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
        const user = userEvent.setup();

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title5",
        });
        await user.click(listTitle)

        const addItemBtn = screen.getByRole('button', {
            name: /add item/i
        })        
        await user.click(addItemBtn)


        const description = screen.getByLabelText(/description/i);
        const dueDate = screen.getByLabelText(/due/i);
        const acceptBtn = screen.getByRole('button', {
            name: /accept/i
        })

        expect(description).toBeInTheDocument();
        expect(dueDate).toBeInTheDocument();
        expect(acceptBtn).toBeInTheDocument();
    })

})
