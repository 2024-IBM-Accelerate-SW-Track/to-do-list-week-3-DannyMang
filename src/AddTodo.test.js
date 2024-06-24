import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Add New Item'), { target: { value: 'Test' } });
  fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2024-01-30' } });
  fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  fireEvent.change(screen.getByPlaceholderText('Add New Item'), { target: { value: 'Test' } });
  fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2024-01-30' } });
  fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  const tasks = screen.getAllByText('Test');
  expect(tasks).toHaveLength(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2024-01-30' } });
  fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  const tasks = screen.queryAllByRole('checkbox');
  expect(tasks).toHaveLength(0);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Add New Item'), { target: { value: 'Test' } });
  fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  const tasks = screen.queryAllByText('Test');
  expect(tasks).toHaveLength(0);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Add New Item'), { target: { value: 'Test' } });
  fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2024-01-30' } });
  fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const tasks = screen.queryAllByText('Test');
  expect(tasks).toHaveLength(0);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);
  const pastDateString = pastDate.toISOString().split('T')[0];
  
  fireEvent.change(screen.getByPlaceholderText('Add New Item'), { target: { value: 'Past Due Task' } });
  fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: pastDateString } });
  fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); 
  const futureDateString = futureDate.toISOString().split('T')[0];
  
  fireEvent.change(screen.getByPlaceholderText('Add New Item'), { target: { value: 'Future Task' } });
  fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: futureDateString } });
  fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

  const pastDueTask = screen.getByTestId('Past Due Task');
  const futureTask = screen.getByTestId('Future Task');

  expect(pastDueTask).toHaveStyle('background-color: red');
  expect(futureTask).toHaveStyle('background-color: #ffffffff');
 });
