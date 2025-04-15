# Technical Context

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Shadcn/ui for component library
- Lucide for icons

### Backend
- Supabase for database and authentication
- PostgreSQL as the database
- Row Level Security (RLS) for data protection

### State Management
- React hooks for local state
- Custom hooks for reusable logic
- LocalStorage for persistence
- Context API for global state

## Key Components

### Table System
```typescript
// Column definition
interface Column {
  id: string;
  width: number;
  minWidth: number;
}

// Persisted columns hook
const usePersistedColumns = () => {
  const [columns, setColumns] = useState<Column[]>();
  // LocalStorage persistence
  // Column management logic
};

// Table props
interface TableProps {
  columns: Column[];
  onColumnResize: (columns: Column[]) => void;
  onColumnsChange: (columns: Column[]) => void;
  isColumnModalOpen?: boolean;
  onColumnModalClose?: () => void;
}
```

### State Management
```typescript
// Column state management
const [columns, setColumns] = useState<Column[]>(defaultColumns);
const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

// Persistence pattern
useEffect(() => {
  localStorage.setItem('table-columns', JSON.stringify(columns));
}, [columns]);
```

## Implementation Details

### Column Management
- Column state lifted to list component
- Persistence through localStorage
- Modal state controlled by parent
- Column visibility toggles
- Width persistence
- Default column settings

### Button Organization
- Consistent styling with Tailwind
- Grouped in search bar
- Standard interaction patterns
- Clear visual hierarchy

### Data Flow
- Parent manages state
- Children receive handlers
- Type-safe props
- Clear update patterns

## Development Patterns

### Component Structure
```typescript
// Container component
const CompaniesList: React.FC<Props> = () => {
  // State management
  // Data fetching
  // Event handlers
  return <CompaniesTable {...props} />;
};

// Presentational component
const CompaniesTable: React.FC<TableProps> = (props) => {
  // Pure rendering
  // Local UI state only
};
```

### Hook Patterns
```typescript
// Custom hook pattern
const useColumnModal = (initialColumns: Column[]) => {
  // State
  // Handlers
  // Effects
  return {
    columns,
    visibleColumns,
    toggleColumn,
    resetColumns,
    applyColumnChanges,
  };
};
```

## Recent Technical Updates

### Column Management
- Moved column button to search bar
- Improved column state persistence
- Enhanced modal state management
- Better type safety for column operations

### UI Improvements
- Standardized button placement
- Removed redundant spacing
- Improved visual consistency
- Better component organization

### State Management
- Lifted column state to parent
- Added persistence layer
- Improved type definitions
- Enhanced error handling

## Development Guidelines

### Component Development
- Use TypeScript for all new components
- Follow existing naming conventions
- Implement proper prop types
- Add JSDoc comments for complex logic

### State Management
- Lift state when shared between components
- Use local state when possible
- Implement persistence where needed
- Handle all edge cases

### Styling
- Use Tailwind utility classes
- Follow existing color scheme
- Maintain consistent spacing
- Use design system components

### Testing
- Write unit tests for hooks
- Test edge cases
- Mock external dependencies
- Use React Testing Library

## Technical Debt

### Current
- Need to improve test coverage
- Consider component library updates
- Review performance optimizations
- Document component APIs

### Planned Improvements
- Add E2E tests
- Implement proper error boundaries
- Review bundle size
- Add performance monitoring

## Development Setup
- Node.js 18+
- pnpm for package management
- VSCode with recommended extensions
- ESLint + Prettier for code formatting
