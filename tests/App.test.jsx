import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import App from '../src/App';
import TodoListItem from '../src/components/TodoListItem';

vi.mock('axios');

// test data
const errorMessage = 'Oopsie! Error getting the list. Please refresh the page or try again later';
const removeButtonText = 'Remove';
const todoTestTitle = 'TestTitle';

const testDataGenerator = (numberOfElements) => {
  let objectArray = [];
  for (let i = 0; i < numberOfElements; i++) {
    let object = {
      id: `${i + 1}`,
      fields: {
        title: `${todoTestTitle}${i + 1}`
      }
    };
    objectArray.push(object)
  }
  return objectArray;
};

const todoOne = {
  id: '1',
  title: 'TestTitle1'
};

describe('presence of Todo Item', () => {
  it('renders all properties', () => {
    render(<TodoListItem {...todoOne} />);
    // screen.debug();
    expect(screen.getByText('TestTitle1')).toBeInTheDocument();
    expect(screen.getByText('TestTitle1')).toHaveAttribute('class');
  });

  it('renders a clickable remove button', () => {
    render(<TodoListItem {...todoOne} />);
    // screen.getByRole(''); // suggests roles if the provided role is not available, fails the test
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('clicking the remove button calls the callback handler', () => {
    const handleRemoveItem = vi.fn();
    render(<TodoListItem  {...todoOne} onRemoveTodo={handleRemoveItem} />);
    fireEvent.click(screen.getByRole('button')); // catch event when clicking button
    expect(handleRemoveItem).toHaveBeenCalledTimes(1); // which event
  });

  it('each todo title is present', async () => {
    const numberOfElements = 5;
    const promise = Promise.resolve({
      data: 
        {
          records: testDataGenerator(numberOfElements)
        },
      status: 200
      });
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);
    await waitFor(async () => await promise);
    // screen.debug();
    let allCheckList = [];
    const numberOfTodos = screen.getAllByRole('listitem').length;
    for (let todoNumber = 1; todoNumber <= numberOfTodos; todoNumber++) {
      allCheckList.push(!!screen.queryByText(`${todoTestTitle}${todoNumber}`))
    }
    expect(allCheckList.every(Boolean)).toBe(true);
  });

  it('each todo has remove button', async () => {
    const numberOfElements = 5;
    const promise = Promise.resolve({
      data: 
        {
          records: testDataGenerator(numberOfElements)
        },
      status: 200
      });
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);
    // screen.debug();
    expect(screen.queryByText(/Loading/)).toBeInTheDocument();
    await waitFor(async () => await promise);
    // screen.debug();
    expect(screen.queryByText(/Loading/)).toBeNull();
    expect(screen.getAllByText(removeButtonText).length).toBe(numberOfElements);
    expect(screen.getAllByRole('listitem').length).toBe(numberOfElements)
  });

  // unhappy path
  it('fails fetching data and error message is displayed', async () => {
    const promise = Promise.reject();
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    try {
      await waitFor(async () => await promise);
    } catch (error) {
      expect(screen.queryByText(/Loading/)).toBeNull(); // use getBy or the queryBy search variants. As a rule of thumb, use getBy for single elements, and getAllBy for multiple elements. If you are checking for elements that aren’t present, use queryBy (or queryAllBy)
      expect(screen.queryByText(errorMessage)).toBeInTheDocument();
    }
  });
});
