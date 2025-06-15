import { http, HttpResponse, delay as mswDelay } from 'msw';
import type { DefaultBodyType } from 'msw';

// Define types for our API
type User = {
  id: number;
  name: string;
  email: string;
};

type CreateUserRequest = Omit<User, 'id'>;

// Define mock data
export const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Define request handlers
export const handlers = [
  // GET /api/users - Get all users
  http.get('/api/users', async () => {
    await mswDelay(150); // Simulate network delay
    return HttpResponse.json(mockUsers);
  }),

  // GET /api/users/:id - Get user by ID
  http.get<{ id: string }>('/api/users/:id', async ({ params }) => {
    const user = mockUsers.find(u => u.id === Number(params.id));
    
    if (!user) {
      await mswDelay(100);
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    await mswDelay(100);
    return HttpResponse.json(user);
  }),

  // POST /api/users - Create new user
  http.post<never, CreateUserRequest>('/api/users', async ({ request }) => {
    const newUser = await request.json();
    const user: User = {
      id: Math.max(...mockUsers.map(u => u.id), 0) + 1,
      ...newUser
    };
    
    mockUsers.push(user);
    
    await mswDelay(200);
    return HttpResponse.json(user, { status: 201 });
  }),
];
