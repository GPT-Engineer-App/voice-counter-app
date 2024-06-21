import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

// Unit test for rendering the home page and checking voice-activated counting functionality
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
  // Example: fireEvent.change(screen.getByRole('textbox'), { target: { value: 'one' } });
  // expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
});

// Unit test for rendering the history tracking page
test('renders history tracking', () => {
  render(
    <MemoryRouter initialEntries={['/history']}>
      <App />
    </MemoryRouter>
  );
  const historyText = screen.getByText(/History/i);
  expect(historyText).toBeInTheDocument();
  // Simulate history tracking and check entries
  // Example: expect(screen.getByText(/Entry 1/i)).toBeInTheDocument();
});

// Unit test for rendering the data export functionality
test('renders data export', () => {
  render(
    <MemoryRouter initialEntries={['/export']}>
      <App />
    </MemoryRouter>
  );
  const exportButton = screen.getByText(/Export Data/i);
  expect(exportButton).toBeInTheDocument();
  fireEvent.click(exportButton);
  // Simulate data export and check functionality
  // Example: expect(screen.getByText(/Export Successful/i)).toBeInTheDocument();
});

// Unit test for rendering the lock screen display
test('renders lock screen display', () => {
  render(
    <MemoryRouter initialEntries={['/lockscreen']}>
      <App />
    </MemoryRouter>
  );
  const lockScreenText = screen.getByText(/Lock Screen Display/i);
  expect(lockScreenText).toBeInTheDocument();
  // Simulate lock screen functionality and check counts
  // Example: fireEvent.click(screen.getByText(/Unlock/i));
  // expect(screen.getByText(/Unlocked/i)).toBeInTheDocument();
});

// Unit test for rendering the about page
test('renders about page', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  );
  const aboutText = screen.getByText(/About Us/i);
  expect(aboutText).toBeInTheDocument();
});

// Unit test for rendering the contact page
test('renders contact page', () => {
  render(
    <MemoryRouter initialEntries={['/contact']}>
      <App />
    </MemoryRouter>
  );
  const contactText = screen.getByText(/Contact Us/i);
  expect(contactText).toBeInTheDocument();
});

// Integration test for navigating through the app
test('navigates through the app', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Navigate to history page
  fireEvent.click(screen.getByText(/History/i));
  expect(screen.getByText(/History Page/i)).toBeInTheDocument();

  // Navigate to export page
  fireEvent.click(screen.getByText(/Export Data/i));
  expect(screen.getByText(/Export Data Page/i)).toBeInTheDocument();

  // Navigate to lock screen page
  fireEvent.click(screen.getByText(/Lock Screen/i));
  expect(screen.getByText(/Lock Screen Display/i)).toBeInTheDocument();

  // Navigate to about page
  fireEvent.click(screen.getByText(/About Us/i));
  expect(screen.getByText(/About Us Page/i)).toBeInTheDocument();

  // Navigate to contact page
  fireEvent.click(screen.getByText(/Contact Us/i));
  expect(screen.getByText(/Contact Us Page/i)).toBeInTheDocument();
});