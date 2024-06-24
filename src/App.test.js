import { render, screen } from '@testing-library/react';
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

test('test that App component renders', () => {
  render(<App />, container);
 });

 test('test that new-item-button is a button', () => {
  render(<App/>);
  const element = screen.getByRole('button', {name: /Add/i});
  expect(element.tagName.toLowerCase()).toBe('button');
});

test('test that new-item-input is an input', () => {
  render(<App/>);
  const element = screen.getByRole('textbox', {name: /Add New Item/i});
  expect(element.tagName.toLowerCase()).toBe('input');
});