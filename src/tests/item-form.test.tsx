import { describe, expect, it, vi} from "vitest";
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import ItemForm from "../components/item-form";

describe ('List form', () => {

    it('renders correctly', () => {
        render(<ItemForm  onItem={() => {}} />);

        const titleInput = screen.getByLabelText(/title/i);
        expect(titleInput).toBeInTheDocument();

        const descriptionInput = screen.getByLabelText(/description/i);
        expect(descriptionInput).toBeInTheDocument();

        const dueInput = screen.getByLabelText(/due/i);
        expect(dueInput).toBeInTheDocument();

        const submitBtn = screen.getByRole('button', {
            name: /accept/i
        }) 
        expect(submitBtn).toBeInTheDocument();

    })

    it('call handlers', async () => {
        user.setup();
        const handleList = vi.fn();

        render(<ItemForm onItem={handleList} />);

        const submitBtn = screen.getByRole('button', {
            name: /accept/i
        });

        await user.click(submitBtn);

        expect(handleList).toHaveBeenCalledTimes(1);
    })
})