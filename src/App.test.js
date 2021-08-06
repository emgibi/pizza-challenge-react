import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const customer = {
  name: "John Doe",
  streetName: "John Doe",
  houseNumber: "34",
  postalCode: "234567",
  city: "My City",
  phoneNumber: "+0044 345 005 421",
};

describe("App", () => {
  test('renders Order a pizza', () => {
    render(<App />);

    const element = screen.getByText(/Order a pizza/i);

    expect(element).toBeInTheDocument();
  });

  test('renders Customer information', () => {
    render(<App />);

    const element = screen.getByText(/Customer information/i);

    expect(element).toBeInTheDocument();
  });

  test('renders Pizza selection', () => {
    render(<App />);

    const element = screen.getByText(/Pizza selection/i);

    expect(element).toBeInTheDocument();
  });

  test('renders Payment information', () => {
    render(<App />);

    const element = screen.getByText(/Payment information/i);

    expect(element).toBeInTheDocument();
  });

  test('renders Place Order', () => {
    render(<App />);

    const element = screen.getByText(/Place Order/i);

    expect(element).toBeInTheDocument();
  });

  test('renders Please enter the following information:', () => {
    render(<App />);

    expect(screen.getByText(/Please enter the following information:/i)).toBeInTheDocument();
  });

  test('render name input', () => {
    render(<App />);

    const nameInput = screen.getByTestId("name-input");

    expect(nameInput).toBeInTheDocument();
  });

  test('shows error message for empty name input', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Next'))

    expect(getByText(/Please enter your name./i)).toBeInTheDocument();
  });

  test('pass input to test name input field', () => {
    const { getByTestId, getByText } = render(<App />);
    const nameInput = getByTestId("name-input");

    userEvent.type(nameInput, customer.name);
    fireEvent.click(getByText('Next'))

    expect(getByTestId("name-input")).toHaveValue(customer.name);
    expect(getByText(/Please enter street name./i)).toBeInTheDocument();
  });

  test('render street name input', () => {
    render(<App />);

    const streetNameInput = screen.getByTestId("streetName-input");

    expect(streetNameInput).toBeInTheDocument();
  });

  test('shows error message for empty street name input', () => {
    const { getByTestId, getByText } = render(<App />);
    const nameInput = getByTestId("name-input");

    userEvent.type(nameInput, customer.name);
    fireEvent.click(getByText('Next'))

    expect(getByText(/Please enter street name./i)).toBeInTheDocument();
  });

  test('pass input to test street name input field', () => {
    const { getByTestId, getByText } = render(<App />);
    const nameInput = getByTestId("name-input");
    const streetNameInput = getByTestId("streetName-input");

    userEvent.type(nameInput, customer.name);
    userEvent.type(streetNameInput, customer.streetName);
    fireEvent.click(getByText('Next'))

    expect(getByTestId("streetName-input")).toHaveValue(customer.streetName);
    expect(getByText(/Please enter house number./i)).toBeInTheDocument();
  });

  test('render house number input', () => {
    render(<App />);

    const houseNumberInput = screen.getByTestId("houseNumber-input");

    expect(houseNumberInput).toBeInTheDocument();
  });

  test('shows error message for empty house number input', () => {
    const { getByTestId, getByText } = render(<App />);
    const nameInput = getByTestId("name-input");
    const streetNameInput = getByTestId("streetName-input");

    userEvent.type(nameInput, customer.name);
    userEvent.type(streetNameInput, customer.streetName);
    fireEvent.click(getByText('Next'))

    expect(getByText(/Please enter house number./i)).toBeInTheDocument();
  });

  test('pass input to test house number input field', () => {
    const { getByTestId, getByText } = render(<App />);
    const nameInput = getByTestId("name-input");
    const streetNameInput = getByTestId("streetName-input");
    const houseNumberInput = getByTestId("houseNumber-input");

    userEvent.type(nameInput, customer.name);
    userEvent.type(streetNameInput, customer.streetName);
    userEvent.type(houseNumberInput, customer.houseNumber);
    fireEvent.click(getByText('Next'))

    expect(getByTestId("houseNumber-input")).toHaveValue(customer.houseNumber);
    expect(getByText(/Please enter postal code./i)).toBeInTheDocument();
  });
});