# Altss - Company and Person Data Management Platform

A comprehensive platform for managing company and person data, focusing on efficient data organization, intuitive user experience, and reliable data management.

## 🌟 Features

### Implemented
- ✅ Company data management with advanced filtering and search
- ✅ Person data management with customizable views
- ✅ Advanced filtering system with saved searches
- ✅ Customizable column management with persistence
- ✅ Favorites system for quick access
- ✅ User preferences persistence
- ✅ Real-time data updates
- ✅ Type-safe implementation

### In Progress
- 🔄 Column order persistence enhancements
- 🔄 Advanced filtering options
- 🔄 Performance optimizations
- 🔄 Component architecture refinements

### Planned
- 📋 Bulk actions for efficient data management
- 📋 Export functionality
- 📋 Custom views
- 📋 Advanced analytics

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Shadcn/ui component library
- Lucide for icons
- Custom hooks architecture

### Backend
- Supabase platform
- PostgreSQL database
- Row Level Security (RLS)
- Real-time capabilities

### State Management
- React hooks for local state
- Context API for global state
- LocalStorage for persistence
- Type-safe interfaces

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager
- Supabase account and project

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/avasiliev1/altss.com.git
cd altss.com
\`\`\`

2. Install dependencies
\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env
# Edit .env with your Supabase credentials
\`\`\`

4. Start the development server
\`\`\`bash
pnpm dev
\`\`\`

## 💻 Development

### Scripts
- \`pnpm dev\`: Start development server
- \`pnpm build\`: Build for production
- \`pnpm build:dev\`: Build for development
- \`pnpm preview\`: Preview production build
- \`pnpm lint\`: Run ESLint

### Component Development Guidelines
- Use TypeScript for all new components
- Follow existing naming conventions
- Implement proper prop types
- Add JSDoc comments for complex logic
- Use Tailwind utility classes
- Follow existing color scheme
- Maintain consistent spacing
- Use design system components

### State Management Patterns
- Lift state when shared between components
- Use local state when possible
- Implement persistence where needed
- Handle all edge cases

### Code Structure
\`\`\`typescript
// Container component pattern
const CompaniesList: React.FC<Props> = () => {
  // State management
  // Data fetching
  // Event handlers
  return <CompaniesTable {...props} />;
};

// Custom hook pattern
const useColumnModal = (initialColumns: Column[]) => {
  // State and handlers
  return {
    columns,
    visibleColumns,
    toggleColumn,
    resetColumns,
    applyColumnChanges,
  };
};
\`\`\`

## 🧪 Testing

### Current Coverage
- Unit tests for hooks
- Edge case testing
- External dependency mocking
- React Testing Library implementation

### Planned Improvements
- E2E testing implementation
- Error boundary testing
- Performance monitoring
- Bundle size optimization

## 📚 Documentation

### Available
- Component API documentation
- State management patterns
- User workflows
- Setup instructions

### In Progress
- Performance guidelines
- Testing strategies
- Deployment procedures
- Maintenance guides

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
