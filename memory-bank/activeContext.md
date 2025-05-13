# Active Development Context

## Current Focus
- Family Office profile and table UX parity with Company section
- Sidebar navigation and menu item order/formatting
- Data parsing and display for news, transactions, and investment fields

## Recent Changes

### Family Office Profile (/familyoffices/:id)
- Implemented full-width profile container with correct sidebar padding (p-6)
- Added breadcrumb, header, and tabbed layout matching company/:id
- Tabs: Overview, Investment focus, Team, News, Transactions
- "Team" tab displays primary contact and team members as cards, with tags and avatars
- News tab parses and displays news as cards (title, date, publisher logo, content, link)
- Transactions tab parses and displays transactions as cards (logo or fallback, company, round, date, country, industry, deal size, press release)
- Allocation Preferences and Investor Profile parsed as arrays and displayed as lists; Investor Profile hidden if empty
- "Logo Filename" and "Favorited" fields removed from display
- All sections and fields distributed according to database and design reference

### Sidebar Navigation
- "Family Offices search" menu item uses whitespace-nowrap to prevent wrapping
- "People search" moved after "Investors search" and above the separator
- Extra separator above "People search" removed
- Sidebar order: Company search, Family Offices search, Investors search, People search, [separator], My Orders, Favorites, Saved Searches

### Table and UI Improvements
- Table column management, search, and filter improvements (see previous context)
- Consistent button placement and visual hierarchy
- Persistent user preferences and state

## Active Decisions

### Family Office Profile
- Reuse as much of the company/:id design and logic as possible
- Parse and display all structured data (news, transactions, preferences) as cards/lists, not raw JSON
- Hide empty or irrelevant fields
- Use fallback avatars/logos where needed

### Sidebar
- Main menu items (searches) grouped at top, no separator above "People search"
- Consistent menu item styling and layout

## Current Patterns
- State lifting for shared functionality
- Consistent button styling and placement
- Persistent user preferences
- Clear component responsibilities
- Type-based grouping for lists (Companies/Persons/Family Offices)
- Consistent navigation patterns based on content type
- Proper filter state propagation through component hierarchy
- URL synchronization with application state

## Next Steps
- Continue monitoring for UI/UX issues in Family Offices and Company sections
- Further unify component logic between company and family office profiles
- Plan for additional table and sidebar improvements as needed
- Continue to address user feedback for data parsing and display

## Known Issues
- None currently identified

## Recent Learnings
- Importance of design parity between sections for user experience
- Value of parsing and displaying structured data (news, transactions) as cards/lists
- Benefits of persistent and consistent sidebar navigation
- Effectiveness of type-based content organization and navigation
- Importance of hiding empty or irrelevant fields for clarity
