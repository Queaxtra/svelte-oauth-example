# SvelteKit + PocketBase Example Project

A modern web application built with SvelteKit and PocketBase, demonstrating user authentication and profile management.

## Technologies Used
- **SvelteKit**: A framework for building web applications with a focus on simplicity and performance.
- **PocketBase**: A lightweight backend platform for building web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

## Getting Started

### Prerequisites

- Node.js and bun (bun.sh) installed on your machine.

### Installation
1. Clone the repository:
```bash
git clone https://github.com/queaxtra/svelte-oauth-example.git
```

2. Navigate to the project directory:
```bash
cd svelte-oauth-example
```

3. Install the dependencies:
```bash
bun install
```

4. Start the development server:
```bash
bun run dev
```

## Project Setup

### Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:
```
VITE_APP_PBURL=http://localhost:8090
```

### Database Connection
Database connection is handled through `db.ts` using PocketBase client:

```typescript
import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_APP_PBURL;
const db = new PocketBase(url);

export default db;
```

## Core Features

### User Management
The `user.ts` module provides the following functionality:

1. User Authentication
   - Login with email/password
   - Automatic session management
   - Logout functionality

2. User Operations
   - Create a new user
   - Edit user profile
   - Delete user account

3. Session Validation
   - Check if the user is logged in
   - Validate user sessions

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.