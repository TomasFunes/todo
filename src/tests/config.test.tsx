import { describe, expect, it, vi} from "vitest";
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Config from "../components/config";

describe ('Config Button', () => {
    it('renders correctly', () => {
        render(<Config onEdit={() => {}} onDelete={() => {}} />);

        const editBtn = screen.getByRole('button', {
                name: 'Edit',
        });
        expect(editBtn).toBeInTheDocument();

        const deleteBtn = screen.getByRole('button', {
            name: 'Delete',
        });
        expect(deleteBtn).toBeInTheDocument();

    })

    it('call handlers', async () => {
        user.setup();
        const handleUpdate = vi.fn();
        const handleDelete = vi.fn();
        render(<Config onEdit={handleUpdate} onDelete={handleDelete} />);

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