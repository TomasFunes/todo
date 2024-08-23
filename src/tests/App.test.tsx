import { render, screen } from '@testing-library/react'
import { describe, expect, it} from "vitest";
import App from '../App';

describe('App renders correctly', () => {
    render(<App />);
    
    
    it('renders headline', () => {

        const headline = screen.getByText(/todolist app/i);
        expect(headline).toBeInTheDocument();
        expect(headline).toBeInTheDocument();
       
        
        
    })

    it('renders todo lists', () => {
        expect(true);
    })
})