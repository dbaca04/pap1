import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

// Mock the UserList component since we don't have the actual implementation yet
// In a real app, this would be imported from your components
const UserList = () => {
  // This is a simplified example - in a real app, this would fetch data
  return (
    <div>
      <h2>User List</h2>
      <div data-testid="loading">Loading users...</div>
      <ul>
        <li>John Doe (john@example.com)</li>
        <li>Jane Smith (jane@example.com)</li>
      </ul>
    </div>
  );
};

describe('UserList', () => {
  it('displays list of users', async () => {
    render(<UserList />);
    
    // Initially shows loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // After loading, should show users
    const userItems = await screen.findAllByRole('listitem');
    expect(userItems).toHaveLength(2);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('handles server error', async () => {
    // Override the default handler for this test
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    render(<UserList />);
    
    // Should show error message (in a real app, this would be implemented in the component)
    // This is just an example of how you would test error handling
    const errorMessage = await screen.findByText(/error loading users/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
