import { describe, expect, it, vi} from "vitest";
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import ListForm from "../components/list-form";

describe ('List form', () => {

    it('renders correctly', () => {
        render(<ListForm  list={{id: 0, title: ""}} onList={() => {}} />);

        const titleInput = screen.getByLabelText(/title/i);
        expect(titleInput).toBeInTheDocument();

        const doneBtn = screen.getByRole('button', {
            name: /done/i
        }) 
        expect(doneBtn).toBeInTheDocument();

    })

    it('call handlers', async () => {
        user.setup();
        const handleList = vi.fn();

        render(<ListForm list={{id: 0, title: ""}} onList={handleList} />);

        const submitBtn = screen.getByRole('button', {
            name: /done/i
        });

        await user.click(submitBtn);

        expect(handleList).toHaveBeenCalledTimes(1);
    })
})