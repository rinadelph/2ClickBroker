# 2Click Broker: Detailed Project Structure and Development Order

## 1. Project Setup and Configuration

### Order of Creation:
1. Initialize Next.js project
2. Set up TypeScript
3. Configure Tailwind CSS
4. Set up Prisma
5. Configure environment variables

### Files and Their Functionalities:

- `.env`: Stores environment variables
  - Interaction: Used across the entire application for configuration
- `.gitignore`: Specifies files to ignore in version control
- `package.json`: Manages project dependencies and scripts
- `tsconfig.json`: Configures TypeScript compiler options
- `next.config.js`: Configures Next.js settings
- `postcss.config.js`: Configures PostCSS for Tailwind
- `tailwind.config.js`: Configures Tailwind CSS
- `middleware.ts`: Handles authentication and routing middleware
  - Interaction: Runs before any route is processed

## 2. Database Setup

### Order of Creation:
1. Define Prisma schema
2. Generate Prisma client
3. Create initial migration

### Files and Their Functionalities:

- `prisma/schema.prisma`: Defines database schema
  - Interaction: Used by Prisma to generate the database and TypeScript types

## 3. Authentication

### Order of Creation:
1. Set up Clerk
2. Implement authentication pages
3. Create authentication hooks

### Files and Their Functionalities:

- `src/app/sign-in/[[...sign-in]]/page.tsx`: Handles user sign-in
  - Interaction: Communicates with Clerk for authentication
- `src/app/sign-up/[[...sign-up]]/page.tsx`: Handles user registration
  - Interaction: Communicates with Clerk for user creation
- `src/app/verify-access/page.tsx`: Handles access verification
  - Interaction: Verifies user access rights

## 4. API Routes

### Order of Creation:
1. Create base API structure
2. Implement listing routes
3. Implement analytics routes
4. Implement commission routes
5. Implement subscription routes
6. Implement webhook handlers

### Files and Their Functionalities:

- `src/app/api/listings/route.ts`: Handles CRUD operations for listings
  - Interaction: Communicates with database, used by listing pages
- `src/app/api/listings/[id]/route.ts`: Handles operations for a specific listing
  - Interaction: Used by individual listing pages
- `src/app/api/listings/area/route.ts`: Handles geographical listing queries
  - Interaction: Used by map and search components
- `src/app/api/analytics/route.ts`: Handles general analytics queries
  - Interaction: Used by dashboard and analytics pages
- `src/app/api/analytics/[id]/route.ts`: Handles analytics for a specific listing
  - Interaction: Used by individual listing analytics
- `src/app/api/commission/route.ts`: Handles commission information requests
  - Interaction: Used by the two-click access system
- `src/app/api/auth/verify/route.ts`: Handles user verification
  - Interaction: Used in the authentication process
- `src/app/api/auth/token/route.ts`: Handles token generation and verification
  - Interaction: Used in the two-click access system
- `src/app/api/subscriptions/route.ts`: Handles subscription management
  - Interaction: Used by account and subscription pages
- `src/app/api/webhooks/clerk/route.ts`: Handles Clerk authentication webhooks
  - Interaction: Processes Clerk events
- `src/app/api/webhooks/stripe/route.ts`: Handles Stripe payment webhooks
  - Interaction: Processes Stripe events for subscriptions

## 5. Components

### Order of Creation:
1. Create UI components
2. Create layout components
3. Create feature-specific components

### Files and Their Functionalities:

- `src/components/ui/`: Contains reusable UI components
  - Interaction: Used across the entire application
- `src/components/layout/`: Contains layout components
  - Interaction: Used to structure pages consistently
- `src/components/listings/`: Contains listing-related components
  - Interaction: Used in listing pages and search results
- `src/components/map/`: Contains map-related components
  - Interaction: Used in geographical search and listing display
- `src/components/analytics/`: Contains analytics components
  - Interaction: Used in dashboard and analytics pages
- `src/components/dashboard/`: Contains dashboard-specific components
  - Interaction: Used in the main dashboard page
- `src/components/admin/`: Contains admin-specific components
  - Interaction: Used in the admin section
- `src/components/subscription/`: Contains subscription-related components
  - Interaction: Used in account and subscription pages
- `src/components/crm/`: Contains CRM-related components
  - Interaction: Used in the CRM section
- `src/components/common/`: Contains common utility components
  - Interaction: Used across the entire application

## 6. Pages

### Order of Creation:
1. Create main application pages
2. Create authentication pages
3. Create admin pages

### Files and Their Functionalities:

- `src/app/page.tsx`: Main landing page
  - Interaction: Entry point for the application
- `src/app/dashboard/page.tsx`: User dashboard page
  - Interaction: Displays user-specific information and actions
- `src/app/listings/page.tsx`: Listings overview page
  - Interaction: Displays all listings, interacts with listing API
- `src/app/listings/create/page.tsx`: Create new listing page
  - Interaction: Allows users to create new listings
- `src/app/listings/[id]/page.tsx`: Individual listing page
  - Interaction: Displays detailed listing information
- `src/app/listings/[id]/edit/page.tsx`: Edit listing page
  - Interaction: Allows users to edit existing listings
- `src/app/listings/[id]/commission/page.tsx`: Commission information page
  - Interaction: Displays commission info (part of two-click system)
- `src/app/map/page.tsx`: Map view page
  - Interaction: Displays listings geographically
- `src/app/map/area-select/page.tsx`: Area selection page
  - Interaction: Allows users to select geographical areas for search
- `src/app/analytics/page.tsx`: General analytics page
  - Interaction: Displays platform-wide analytics
- `src/app/analytics/[id]/page.tsx`: Listing-specific analytics page
  - Interaction: Displays analytics for a specific listing
- `src/app/account/page.tsx`: User account page
  - Interaction: Allows users to manage their account
- `src/app/account/settings/page.tsx`: Account settings page
  - Interaction: Allows users to change account settings
- `src/app/account/subscription/page.tsx`: Subscription management page
  - Interaction: Allows users to manage their subscription
- `src/app/admin/page.tsx`: Admin dashboard page
  - Interaction: Provides overview for administrators
- `src/app/admin/users/page.tsx`: User management page
  - Interaction: Allows admins to manage users
- `src/app/admin/settings/page.tsx`: System settings page
  - Interaction: Allows admins to configure system settings
- `src/app/crm/page.tsx`: CRM overview page
  - Interaction: Displays CRM dashboard
- `src/app/crm/[id]/page.tsx`: Individual contact page in CRM
  - Interaction: Displays detailed information for a CRM contact

## 7. Hooks and Utilities

### Order of Creation:
1. Create utility functions
2. Create custom hooks

### Files and Their Functionalities:

- `src/hooks/use-commission-token.ts`: Manages commission access tokens
  - Interaction: Used in the two-click access system
- `src/hooks/use-listings.ts`: Manages listing data and operations
  - Interaction: Used in listing-related components and pages
- `src/hooks/use-analytics.ts`: Manages analytics data
  - Interaction: Used in analytics components and pages
- `src/hooks/use-map.ts`: Manages map-related functionality
  - Interaction: Used in map components
- `src/hooks/use-subscription.ts`: Manages subscription data and operations
  - Interaction: Used in subscription-related components and pages
- `src/hooks/use-access-verification.ts`: Manages access verification
  - Interaction: Used in protected routes and components
- `src/lib/prisma.ts`: Prisma client initialization
  - Interaction: Used for database operations across the application
- `src/lib/auth.ts`: Authentication utility functions
  - Interaction: Used in authentication-related operations
- `src/lib/api.ts`: API utility functions
  - Interaction: Used for making API requests
- `src/lib/utils.ts`: General utility functions
  - Interaction: Used across the entire application
- `src/lib/constants.ts`: Constant values used in the application
  - Interaction: Referenced across the entire application
- `src/lib/stripe.ts`: Stripe-related utility functions
  - Interaction: Used for handling payments and subscriptions
- `src/lib/geocoding.ts`: Geocoding utility functions
  - Interaction: Used in map-related features

## 8. Types and Configurations

### Order of Creation:
1. Define basic types
2. Create configuration files

### Files and Their Functionalities:

- `src/types/listing.ts`: Types related to listings
  - Interaction: Used in listing-related components and API routes
- `src/types/user.ts`: Types related to users
  - Interaction: Used in user-related components and API routes
- `src/types/analytics.ts`: Types related to analytics
  - Interaction: Used in analytics-related components and API routes
- `src/types/subscription.ts`: Types related to subscriptions
  - Interaction: Used in subscription-related components and API routes
- `src/config/site.ts`: Site-wide configuration
  - Interaction: Used across the entire application
- `src/config/dashboard.ts`: Dashboard-specific configuration
  - Interaction: Used in dashboard-related components and pages
- `src/config/subscription-tiers.ts`: Subscription tier definitions
  - Interaction: Used in subscription-related features

## 9. Styles

### Order of Creation:
1. Set up global styles

### Files and Their Functionalities:

- `src/styles/globals.css`: Global styles for the application
  - Interaction: Applied to all pages

## 10. Scripts

### Order of Creation:
1. Create database seeding script

### Files and Their Functionalities:

- `scripts/seed-database.ts`: Script to seed the database with initial data
  - Interaction: Used for development and testing purposes

This document provides a comprehensive overview of the 2Click Broker project structure, explaining the functionality of each file and its interactions with other parts of the system. Follow this order when developing your application to ensure a smooth and logical progression. Remember to adapt this structure as needed based on your specific requirements and any changes in project scope.
