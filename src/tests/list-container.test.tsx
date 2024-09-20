import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListContainer from "../components/list-container";
import userEvent from "@testing-library/user-event";


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
})