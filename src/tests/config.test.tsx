import { describe, expect, it, vi} from "vitest";
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Config from "../components/config";

describe ('Config Button', () => {
    it('renders correctly', () => {
        render(<Config onEdit={() => {}} onDelete={() => {}} />);

        const configBtn = screen.getByRole('button');
        expect(configBtn).toBeInTheDocument();

        const configImg = screen.getByRole('img');
        expect(configImg).toBeInTheDocument();

    })
    it('does not render config menu initially', () => {
        render(<Config onEdit={() => {}} onDelete={() => {}} />);

        const editButton = screen.queryByRole('button', {
            name: 'Edit',
        });
        const deleteButton = screen.queryByRole('button', {
            name: 'Delete',
        });

        expect(editButton).not.toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();

    })

    it('renders menu after clicking the config button', async () => {
        user.setup;
        render(<Config onEdit={() => {}} onDelete={() => {}} />);

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);

        const editButton = screen.getByRole('button', {
            name: 'Edit',
        });
        const deleteButton = screen.getByRole('button', {
            name: 'Delete',
        });

        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();

    })

    it('does not render menu after clicking the config button twice', async () => {
        user.setup;
        render(<Config onEdit={() => {}} onDelete={() => {}} />);

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);

        const editButton = screen.getByRole('button', {
            name: 'Edit',
        });
        const deleteButton = screen.getByRole('button', {
            name: 'Delete',
        });

        await user.click(configBtn);
        setTimeout(() => {}, 2000)

        expect(editButton).not.toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();

    })

    it('does not render menu after clicking away the config menu', async () => {
        user.setup;
        render(<Config onEdit={() => {}} onDelete={() => {}} />);
        render(<p>Some paragraph</p>);

        const paragraph = screen.getByRole('paragraph');

        const configBtn = screen.getByRole('button');
        await user.click(configBtn);

        const editButton = screen.getByRole('button', {
            name: 'Edit',
        }) as Element;
        const deleteButton = screen.getByRole('button', {
            name: 'Delete',
        });

        await user.click(paragraph);

        expect(editButton).not.toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();


    })
    it('call handlers', async () => {
        user.setup();
        const handleUpdate = vi.fn();
        const handleDelete = vi.fn();
        render(<Config onEdit={handleUpdate} onDelete={handleDelete} />);


        const configBtn = screen.getByRole('button');
        await user.click(configBtn);

        const editBtn = screen.getByRole('button', {
            name: /edit/i
        })
        const deleteBtn = screen.getByRole('button', {
            name: /delete/i
        })

        await user.click(editBtn);
        await user.click(deleteBtn);

        expect(handleDelete).toHaveBeenCalledTimes(1);
        expect(handleUpdate).toHaveBeenCalledTimes(1);
    })
})