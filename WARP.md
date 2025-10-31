# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A comprehensive student information system built with Angular 17 and PrimeNG that provides full CRUD operations for managing student records. The application uses a mock JSON Server backend for development and features a modern, responsive UI with reactive forms and lazy-loaded routing.

## Development Environment

### Prerequisites
- **Node.js**: Version 18.13.0+ or 20.9.0+ (avoid v19.x)
- **npm**: Version 8.0.0+

### Installation
```powershell
npm install
# If peer dependency issues occur:
npm install --legacy-peer-deps
```

## Common Commands

### Running the Application
The application requires two servers running simultaneously:

**Terminal 1 - Mock Backend (JSON Server):**
```powershell
npm run api
```
Starts JSON Server on `http://localhost:3000`

**Terminal 2 - Angular Dev Server:**
```powershell
npm start
```
Starts Angular on `http://localhost:4200`

**Run both in background (PowerShell):**
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run api"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
```

### Development Commands
```powershell
# Development build with watch mode
npm run watch

# Production build
npm run build

# Run unit tests (Karma + Jasmine)
npm test

# Serve specific port if 4200 is occupied
ng serve --port 4300
```

### Angular CLI Commands
```powershell
# Generate a new component
ng generate component components/component-name --standalone

# Generate a new service
ng generate service services/service-name

# Generate a model/interface
ng generate interface models/model-name
```

## Architecture

### Core Technology Stack
- **Angular 17**: Standalone components architecture (no NgModules)
- **PrimeNG 17**: UI component library with pre-built form controls, tables, dialogs
- **RxJS 7.8**: Reactive programming for asynchronous operations
- **JSON Server**: Mock REST API for development (not for production)
- **TypeScript 5.4**: Strict mode enabled

### Application Structure

**Standalone Components Pattern:**
This project uses Angular 17's standalone components exclusively. All components are self-contained with their own imports - there are NO NgModules. When creating new components, always use `standalone: true` and explicitly import required modules in the component's `imports` array.

**Routing Architecture:**
Lazy-loaded routing is configured in `app.routes.ts` using the `loadComponent` pattern. The default route redirects to `/overview`, and all unmatched routes also redirect there. Add new routes using the same lazy-loading pattern.

**Dependency Injection:**
- Services use `providedIn: 'root'` for application-wide singleton instances
- Component-level providers (like `ConfirmationService`, `MessageService`) are declared in individual component metadata

**HTTP Communication:**
The `StudentService` handles all REST API calls to the JSON Server backend at `http://localhost:3000/students`. The service returns RxJS Observables that components subscribe to. All HTTP operations follow standard REST conventions (GET, POST, PUT, DELETE).

**State Management:**
Simple local component state - no global state management library. The `StudentsOverviewComponent` maintains the students array and reloads/updates it after CRUD operations. Consider implementing a state management solution (NgRx, Akita, etc.) if the app grows more complex.

**Form Handling:**
Reactive Forms with validators are used throughout. Two separate FormGroups exist in the main component:
- `studentForm`: Full student creation with all fields
- `editStudentForm`: Simplified form for editing only courses
Forms use PrimeNG controls (InputText, MultiSelect, Calendar) bound to the FormGroup.

**UI/UX Pattern:**
PrimeNG's Dialog component is used for modals (add/edit operations), ConfirmDialog for deletions, and Toast for user feedback messages. The Table component includes built-in pagination (20 records per page).

### Key Files

**Configuration:**
- `app.config.ts`: Application-level providers (router, HTTP client, animations)
- `angular.json`: Build configuration, styles imports (PrimeNG themes)
- `tsconfig.json`: TypeScript strict mode enabled with Angular-specific compiler options

**Core Application Files:**
- `app.routes.ts`: Lazy-loaded routing configuration
- `models/student.model.ts`: Student interface definition (id, firstName, lastName, email, enrollmentDate, courses[])
- `services/student.service.ts`: HTTP service for student CRUD operations
- `components/students-overview/`: Main component with table, dialogs, and forms

**Data:**
- `db.json`: Mock database with 45 pre-populated student records

## Development Guidelines

### Adding New Features

**When adding a new entity (e.g., Course, Grade):**
1. Create the model interface in `models/`
2. Create a service in `services/` following the StudentService pattern
3. Create a standalone component in `components/`
4. Add a lazy-loaded route in `app.routes.ts`
5. Import necessary PrimeNG modules in the component's imports array

**When extending existing functionality:**
1. If adding fields to Student model, update:
   - `student.model.ts`
   - `db.json` sample data
   - Form definitions in the component
   - Template HTML to display/edit new fields

### Form Validation
Use Angular's built-in validators. Current validation patterns:
- Names: minimum 2 characters, required
- Email: email format validator, required
- Dates: required
- Courses: required, minimum 1 selection

### Error Handling
All HTTP operations should include error callbacks that:
1. Display user-friendly toast messages via `MessageService`
2. Log detailed errors to console for debugging
3. Handle both network errors and API errors gracefully

### PrimeNG Integration
Always import PrimeNG modules in the component's imports array. Common modules:
- `TableModule`, `ButtonModule`, `DialogModule`, `InputTextModule`
- `MultiSelectModule`, `CalendarModule`, `ConfirmDialogModule`, `ToastModule`

Component-level providers needed: `ConfirmationService`, `MessageService`

### TypeScript Configuration
Strict mode is enabled. Code must:
- Have explicit types (no implicit `any`)
- Handle nullable values with `!` assertion or optional chaining
- Use proper TypeScript interfaces for all data structures
- Enable strict template checking

## Testing

The project uses Karma + Jasmine for unit testing. Test files follow the `*.spec.ts` naming convention.

**Running tests:**
```powershell
npm test
```

**Test structure for new components:**
- Test component creation
- Test service method calls with mocked HttpClient
- Test form validation
- Test CRUD operations and state updates

## API Endpoints (JSON Server)

The mock backend provides REST endpoints:
- `GET /students` - Retrieve all students
- `GET /students/:id` - Retrieve specific student
- `POST /students` - Create new student
- `PUT /students/:id` - Update existing student
- `DELETE /students/:id` - Delete student

If port 3000 is occupied, update the `apiUrl` in `student.service.ts` when changing JSON Server port.

## Build and Deployment

**Development Build:**
```powershell
npm run watch
```

**Production Build:**
```powershell
npm run build
```
Output: `dist/student-information-system/`

**Bundle Size Limits (angular.json):**
- Initial bundle: 500kb warning, 1mb error
- Component styles: 2kb warning, 4kb error

## Troubleshooting

**Port conflicts:**
- Angular: Use `ng serve --port <alternative-port>`
- JSON Server: `json-server --watch db.json --port <alternative-port>` (update service URL)

**Module not found errors:**
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

**Node version issues:**
Verify with `node --version`. Use Node.js v18.13+, v20.9+, or v22.12+. Consider using nvm for version management.

## Project Conventions

### Naming
- Components: kebab-case (students-overview)
- Services: camelCase with Service suffix (StudentService)
- Models: PascalCase interfaces (Student)
- Files: kebab-case with type suffix (student.model.ts, student.service.ts)

### Code Organization
- Separate concerns: components handle UI/UX, services handle data operations
- Use RxJS operators for data transformation
- Keep components focused and single-purpose
- Extract reusable logic into services or utilities

### Styling
- SCSS for styles
- Component-scoped styles in `*.component.scss`
- Global styles in `src/styles.scss`
- PrimeNG theme: lara-light-blue (configured in angular.json)
