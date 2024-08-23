import { render, screen } from '@testing-library/react'
import { describe, expect, it } from "vitest";
import user from '@testing-library/user-event';
import ListItem from '../components/list-item';

describe('Item tests', () => {
    it('renders correctly', () => {
        render(<ListItem 
            item={{id: 1, listId: 1, title: "Item",  description: "Item description", dueDate: new Date()}}
            onUpdate={() => {}}
            onDelete={() => {}}
            />);

        const configBtn = screen.getByRole('button');

        const title = screen.getByRole('heading', {
            level: 3,
            name: "Item",
        }) 
        const description = screen.getByText(/item description/i) 
        const due = screen.getByText(/Due:/i);

        expect(configBtn).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(due).toBeInTheDocument();
        
    })
    it('renders item form after clicking the edit button', async () => {
        render(<ListItem 
            item={{id: 1, listId: 1, title: "Item",  description: "Item description", dueDate: new Date()}}
            onUpdate={() => {}}
            onDelete={() => {}}
            />);

        user.setup;

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);
        const editBtn = screen.getByRole('button', {
            name: 'Edit',
        })

        await user.click(editBtn);
        const formTitle = screen.getByText(/item info/i);
        const cancelBtn = screen.getByRole('button', {
            name: 'Cancel'
        })

        expect(formTitle).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();
    })
    it('renders item info after clicking the edit button twice', async () => {
        render(<ListItem 
            item={{id: 1, listId: 1, title: "Item",  description: "Item description", dueDate: new Date()}}
            onUpdate={() => {}}
            onDelete={() => {}}
            />);

        user.setup;

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);
        const editBtn = screen.getByRole('button', {
            name: 'Edit',
        })

        await user.click(editBtn);
        await user.click(editBtn);

        const title = screen.getByRole('heading', {
            level: 3,
            name: "Item",
        }) 
        const description = screen.getByText(/item description/i) 
        const due = screen.getByText(/Due:/i);

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(due).toBeInTheDocument();
    })
    it('renders item info after clicking the cancel button', async () => {
        render(<ListItem 
            item={{id: 1, listId: 1, title: "Item",  description: "Item description", dueDate: new Date()}}
            onUpdate={() => {}}
            onDelete={() => {}}
            />);

        user.setup;

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);
        const editBtn = screen.getByRole('button', {
            name: 'Edit',
        })
        await user.click(editBtn);


        const cancelBtn = screen.getByRole('button', {
            name: "Cancel",
        })
        await user.click(cancelBtn);


        const title = screen.getByRole('heading', {
            level: 3,
            name: "Item",
        }) 
        const description = screen.getByText(/item description/i) 
        const due = screen.getByText(/Due:/i);

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(due).toBeInTheDocument();
    })
    it('renders item info after clicking the accept button', async () => {
        render(<ListItem 
            item={{id: 1, listId: 1, title: "Item",  description: "Item description", dueDate: new Date()}}
            onUpdate={() => {}}
            onDelete={() => {}}
            />);


        user.setup;

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);

        const editBtn = screen.getByRole('button', {
            name: 'Edit',
        })
        await user.click(editBtn);

        const acceptBtn = screen.getByRole('button', {
            name: "Accept",
        })



        await user.click(acceptBtn);


        const title = screen.getByRole('heading', {
            level: 3,
            name: /item/i,
        }) 
        const description = screen.getByText(/item description/i) 
        const due = screen.getByText(/Due:/i);

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(due).toBeInTheDocument();
    })

})