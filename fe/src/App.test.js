import { render, screen } from '@testing-library/react';
import App from './App';
import WrapperMobileShell from './screen/WrapperMobileShell';


test('renders learn react link', () => {
  render(
  
  // <WrapperMobileShell >
  
    <App />
  // </WrapperMobileShell >
  
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
