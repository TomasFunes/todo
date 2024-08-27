import { render, screen } from '@testing-library/react'
import { describe, expect, it } from "vitest";
import user from '@testing-library/user-event';
import ListItem from '../components/list-item';

describe('Item tests', () => {
    it('renders correctly', () => {
        render(<ListItem 
            item={{id: 1, todoListId: 1,  description: "Item description", dueDate: new Date().toISOString()}} 
            onDelete={() => {}} 
            onUpdate={() => {}}
            />);

        const configBtn = screen.getByRole('button');

        const description = screen.getByText(/item description/i) 
        const due = screen.getByText(/Due:/i);

        expect(configBtn).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(due).toBeInTheDocument();
        
    })

    it('renders item form after clicking the edit button', async () => {
        render(<ListItem 
            item={{id: 1, todoListId: 1,  description: "Item description", dueDate: new Date().toISOString()}} 
            onDelete={() => {}} 
            onUpdate={() => {}}
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
            item={{id: 1, todoListId: 1,  description: "Item description", dueDate: new Date().toISOString()}} 
            onDelete={() => {}} 
            onUpdate={() => {}}
            />);

        user.setup;

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);
        const editBtn = screen.getByRole('button', {
            name: 'Edit',
        })

        await user.click(editBtn);
        await user.click(editBtn);

        const description = screen.getByText(/item description/i) 
        const due = screen.getByText(/Due:/i);

        expect(description).toBeInTheDocument();
        expect(due).toBeInTheDocument();
    })

    it('renders item info after clicking the cancel button', async () => {
        render(<ListItem 
            item={{id: 1, todoListId: 1,  description: "Item description", dueDate: new Date().toISOString()}} 
            onDelete={() => {}} 
            onUpdate={() => {}}
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


        const description = screen.getByText(/item description/i) 
        const due = screen.getByText(/Due:/i);

        expect(description).toBeInTheDocument();
        expect(due).toBeInTheDocument();
    })

})