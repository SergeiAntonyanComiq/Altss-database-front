# System Architecture & Patterns

## Component Architecture

### Table System
```mermaid
graph TD
    subgraph Companies
        CL[CompaniesList] --> |state & handlers| CS[CompaniesSearchBar]
        CL --> |data & handlers| CT[CompaniesTable]
        CT --> |row data| TR[TableRow]
        CT --> |header data| TH[TableHeader]
        CL --> |modal state| CM[ColumnModal]
        CL --> |column state| CPC[PersistedColumns Hook]
    end
    
    subgraph Persons
        PL[PersonsList] --> |state & handlers| PS[PersonsSearchBar]
        PL --> |data & handlers| PT[PersonsTable]
        PT --> |row data| PTR[PersonTableRow]
        PT --> |header data| PTH[PersonTableHeader]
        PL --> |modal state| PM[PersonsColumnModal]
        PL --> |column state| PPC[PersistedColumns Hook]
    end
    
    style Companies fill:#f5f5f5,stroke:#333,stroke-width:2px
    style Persons fill:#f5f5f5,stroke:#333,stroke-width:2px
```

### State Management
```mermaid
graph TD
    PC[PersistedColumns Hook] --> |read/write| LS[LocalStorage]
    CL[CompaniesList] --> |column state| PC
    CL --> |favorites| FS[FavoritesService]
    FS --> |sync| DB[Supabase]
    FS --> |fallback| LS
```

## Design Patterns

### Component Patterns
1. **Container Components**
   - `CompaniesList`: Manages state and data flow
   - `PersonsList`: Similar pattern for persons section
   - Handles data fetching, state, and child component coordination

2. **Presentational Components**
   - `CompaniesTable`: Pure rendering of data
   - `TableRow`: Handles single row presentation
   - `SearchBar`: User input interface

3. **Modal Components**
   - Controlled by parent state
   - Self-contained UI logic
   - Consistent close/apply pattern

### State Management Patterns
1. **State Lifting**
   - Column visibility state in parent
   - Modal state controlled by parent
   - Shared state at list level

2. **Persistence Patterns**
   - LocalStorage for user preferences
   - Supabase for server data
   - Fallback mechanisms for offline

3. **Event Handling**
   - Delegated to parent components
   - Consistent handler naming
   - Type-safe event props

## Data Flow

### Table Data Flow
```mermaid
graph LR
    API[API/Supabase] --> |fetch| List[List Component]
    List --> |filter| Table[Table Component]
    Table --> |render| Row[Row Component]
    List --> |search| Search[Search Component]
    List --> |columns| Modal[Column Modal]
```

### Filter Application Flow
```mermaid
graph TD
    URL[URL Parameters] --> |extract| Parent[Parent Component]
    Parent --> |load| Filter[Saved Filter]
    Filter --> |apply| Parent
    Parent --> |props| List[List Component]
    List --> |sync| Local[Local Filter State]
    Local --> |params| Hook[Data Hook]
    Hook --> |request| API[API]
    Parent --> |update| URL[URL State]
```

### User Preferences Flow
```mermaid
graph TD
    User[User Action] --> |change| Component[Component]
    Component --> |update| State[State]
    State --> |persist| Storage[LocalStorage]
    State --> |render| UI[UI Update]
```

## Implementation Guidelines

### Component Structure
- Clear separation of concerns
- State management at appropriate level
- Consistent prop patterns
- Type-safe interfaces
- Filter state propagation through component hierarchy

### State Management
- Prefer local state when possible
- Lift state when shared
- Use persistence for user preferences
- Handle loading/error states

### UI Patterns
- Consistent button placement
- Modal management
- Loading states (dynamic skeleton height matches table for pagination)
- No empty state flicker in /persons or /companies
- Error handling

### Code Organization
- Feature-based directory structure
- Shared components in ui/
- Hooks in separate directory
- Service layer for API calls

## Recent Patterns Added

### Filter Application Pattern
- Parent components manage filter state
- URL parameters trigger filter loading
- Filter changes propagate down through props
- List components synchronize local state with props
- Data hooks map UI filter fields to API parameters
- Page resets to 1 when applying filters
- URL state updates to reflect current filters
- Detailed logging for debugging filter flow

### Type-Based Content Organization
- Consistent grouping by content type (Companies/Persons)
- Unified navigation patterns based on type
- Shared styling between similar sections
- Clear visual hierarchy for grouped content

### Saved Searches Management
- Type-based filtering and display
- Consistent navigation patterns
- Integration with sidebar navigation
- Shared styling with favorites system

### Column Management
- State lifted to list component in both companies and persons sections
- Persistence through localStorage with section-specific keys
- Modal state controlled by parent components
- Consistent button placement in search bar area
- Unified column resizing behavior
- Standardized column header titles
- Column visibility toggles with required columns (e.g., name)
- Shared styling for column management UI elements
- Consistent Settings icon usage for column buttons

### Button Organization
- Action buttons grouped in search bar
- Consistent styling and placement
- Clear visual hierarchy
- Standardized interaction patterns

### State Persistence
- User preferences in localStorage
- Fallback mechanisms
- Sync with server when available
- Clear update patterns
- Type-aware navigation and filtering

## Best Practices

1. **State Management**
   - Single source of truth
   - Clear update patterns
   - Type-safe state
   - Content type awareness
   - Proper state propagation through component hierarchy

2. **Component Design**
   - Clear responsibilities
   - Consistent interfaces
   - Reusable patterns

3. **User Experience**
   - Consistent interactions
   - Predictable behavior
   - Persistent preferences
   - Type-based content organization
   - Unified navigation patterns
   - URL synchronization with application state

4. **Performance**
   - Optimized renders
   - Efficient data flow
   - Smart persistence
