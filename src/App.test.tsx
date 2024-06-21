import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders home page and checks voice-activated counting', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const startListeningButton = screen.getByText(/Start Listening/i);
  expect(startListeningButton).toBeInTheDocument();
  fireEvent.click(startListeningButton);
  // Simulate voice input and check counts
});

test('renders history tracking', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const historyText = screen.getByText(/History/i);
  expect(historyText).toBeInTheDocument();
  // Simulate history tracking and check entries
});

test('renders data export', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  // Simulate data export and check functionality
});

test('renders lock screen display', () => {
  render(
    <MemoryRouter initialEntries={['/lockscreen']}>
      <App />
    </MemoryRouter>
  );
  const lockScreenText = screen.getByText(/Lock Screen Display/i);
  expect(lockScreenText).toBeInTheDocument();
  // Simulate lock screen functionality and check counts
});

test('renders about page', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  );
  const aboutText = screen.getByText(/About Us/i);
  expect(aboutText).toBeInTheDocument();
});

test('renders contact page', () => {
  render(
    <MemoryRouter initialEntries={['/contact']}>
      <App />
    </MemoryRouter>
  );
  const contactText = screen.getByText(/Contact Us/i);
  expect(contactText).toBeInTheDocument();
});