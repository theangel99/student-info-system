# Student Information System

A comprehensive web application for managing student information, built with Angular 17 and PrimeNG. This system allows administrators to add, edit, delete, and view student records with an intuitive and modern user interface.

## Features

- **Student Management**: Complete CRUD operations for student records
- **Add New Students**: Create student profiles with basic information and course assignments
- **Edit Student Courses**: Update course enrollments for existing students
- **Delete Students**: Remove student records with confirmation dialogs
- **Student Overview Table**: Paginated table displaying all student information (20 students per page)
- **Super Admin Display**: Shows the name of the administrator using the system
- **Lazy Loading**: Optimized routing with lazy-loaded components
- **Mock Backend**: Uses JSON Server for simulating REST API calls
- **Responsive Design**: Built with PrimeNG components for a modern UI

## Technologies Used

- **Angular 17**: Latest Angular framework with standalone components
- **PrimeNG 17**: UI component library for rich interface elements
- **TypeScript**: Type-safe development
- **SCSS**: Styling with Sass preprocessor
- **JSON Server**: Mock REST API for development
- **RxJS**: Reactive programming for data management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.13.0 or higher, or version 20.9.0 or higher (recommended: v20.x or v22.x)
- **npm**: Version 8.0.0 or higher

**Note**: This project uses Angular 17, which requires Node.js v18.13+ or v20.9+. If you're using Node.js v19.x (odd-numbered version), you may encounter compatibility issues. Please upgrade to a stable LTS version.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd student-information-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   If you encounter peer dependency warnings, you can use:
   ```bash
   npm install --legacy-peer-deps
   ```

## Running the Application

The application requires two servers to run: the Angular development server and the JSON Server for the mock backend.

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Start the JSON Server (Mock Backend)**:
```bash
npm run api
```
This starts the JSON Server on `http://localhost:3000`

**Terminal 2 - Start the Angular Application**:
```bash
npm start
```
This starts the Angular dev server on `http://localhost:4200`

### Option 2: Run in Background (PowerShell on Windows)

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run api"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
```

### Accessing the Application

Once both servers are running:

1. Open your browser and navigate to `http://localhost:4200`
2. The application will automatically redirect to `/overview`
3. You should see the Student Information System with a table of students

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── students-overview/      # Main students overview component
│   │       ├── students-overview.component.ts
│   │       ├── students-overview.component.html
│   │       └── students-overview.component.scss
│   ├── models/
│   │   └── student.model.ts        # Student interface definition
│   ├── services/
│   │   └── student.service.ts      # Student service for API calls
│   ├── app.component.ts            # Root component
│   ├── app.routes.ts               # Lazy-loaded routing configuration
│   └── app.config.ts               # Application configuration
├── assets/                         # Static assets
├── styles.scss                     # Global styles
db.json                            # Mock database for JSON Server
package.json                       # Project dependencies and scripts
```

## Usage Guide

### Adding a New Student

1. Click the **"Add New Student"** button at the top of the page
2. Fill in the required information:
   - First Name
   - Last Name
   - Email
   - Enrollment Date
   - Courses (select one or more)
3. Click **"Add Student"** to save

### Editing Student Courses

1. Locate the student in the table
2. Click the **pencil icon** (Edit) in the Actions column
3. Modify the selected courses
4. Click **"Update"** to save changes

### Deleting a Student

1. Locate the student in the table
2. Click the **trash icon** (Delete) in the Actions column
3. Confirm the deletion in the dialog that appears

### Navigating the Table

- The table displays 20 students per page by default
- Use the pagination controls at the bottom to navigate between pages
- View total count and current range of displayed students

## API Endpoints (JSON Server)

The mock backend provides the following REST API endpoints:

- `GET /students` - Get all students
- `GET /students/:id` - Get a specific student
- `POST /students` - Create a new student
- `PUT /students/:id` - Update a student
- `DELETE /students/:id` - Delete a student

## Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

To execute unit tests:

```bash
npm test
```

## Code Quality

The project is structured with:

- **Modular Architecture**: Separation of concerns with components, services, and models
- **Type Safety**: Full TypeScript implementation
- **Reactive Programming**: RxJS observables for asynchronous operations
- **Form Validation**: Reactive forms with built-in validation
- **Error Handling**: Comprehensive error handling with user feedback
- **Clean Code**: Well-documented and maintainable codebase

## Troubleshooting

### Port Already in Use

If port 4200 or 3000 is already in use:

- **Angular**: `ng serve --port 4300`
- **JSON Server**: `json-server --watch db.json --port 3001` (update API URL in service)

### Node Version Issues

If you encounter engine warnings:

```bash
node --version
```

Ensure you're using Node.js v18.13+, v20.9+, or v22.12+. Consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.

### Module Not Found Errors

Delete `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

Potential improvements for the system:

- User authentication and authorization
- Advanced filtering and search functionality
- Export student data (CSV, PDF)
- Student profile pictures
- Grade management
- Attendance tracking
- Email notifications
- Real backend integration

## Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Add comments for complex logic
3. Update documentation as needed
4. Test all changes thoroughly

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the repository or contact the development team.
