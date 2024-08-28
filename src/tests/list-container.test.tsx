import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListContainer from "../components/list-container";
import userEvent from "@testing-library/user-event";
import { ListsProvider } from "../list-context";



describe('list container testing', () => {
    it('renders correctly', () => {
        render(<ListContainer />);

        const addListBtn = screen.getByRole('button', {
            name: /add list/i
        })

        expect(addListBtn).toBeInTheDocument();
    })

    it('renders list form after clicking de add list button', async () => {
        render(<ListContainer />)

        const user = userEvent.setup();

        const addListBtn = screen.getByRole('button', {
            name: /add list/i
        })
        
        await user.click(addListBtn);

        const titleInput = screen.getByRole("textbox");

        const doneBtn = screen.getByRole('button', {
            name: /done/i
        })

        expect(titleInput).toBeInTheDocument();
        expect(doneBtn).toBeInTheDocument();
    }) 

    it('renders list after creating it', async () => {
        render(<ListContainer />, {
            wrapper: ListsProvider
        })

        const user = userEvent.setup();

        const addListBtn = screen.getByRole('button', {
            name: /add list/i
        })
        
        await user.click(addListBtn);

        const titleInput = screen.getByRole("textbox");

        const doneBtn = screen.getByRole('button', {
            name: /done/i
        })

        await user.type(titleInput, "list");
        await user.click(doneBtn);

        const listTitle = screen.getByRole('heading', {
            name: /list/i
        })

        expect(listTitle).toBeInTheDocument();
    }) 

    it('renders the updated list', async () => {
        render(<ListContainer />, {
            wrapper: ListsProvider
        })

        const user = userEvent.setup();

        const addListBtn = screen.getByRole('button', {
            name: /add list/i
        })
        
        await user.click(addListBtn);

        const titleInput = screen.getByRole("textbox");
        const doneBtn = screen.getByRole('button', {
            name: /done/i
        })

        await user.type(titleInput, "list");
        await user.click(doneBtn);


        
        const configBtn = screen.getAllByRole('button', {
            name: /settings icon/i
        })[1];
        
        await user.click(configBtn);
        
        const editBtn = screen.getByRole("button", {
            name: /edit/i
        })
        
        await user.click(editBtn);
        
        const titleInput2 = screen.getByRole("textbox");
        const doneBtn2 = screen.getByRole('button', {
            name: /done/i
        })
        
        await user.type(titleInput2, "2");
        await user.click(doneBtn2);
        
        const listTitle = screen.getByRole('heading', {
            name: /list2/i
        })

        expect(listTitle).toBeInTheDocument();
    }) 
})